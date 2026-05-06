import { onRequest } from 'firebase-functions/v2/https'
import { logger } from 'firebase-functions'
import { defineSecret } from 'firebase-functions/params'
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { GoogleGenerativeAI } from '@google/generative-ai'

initializeApp()
const db = getFirestore()
const adminAuth = getAuth()
const geminiApiKey = defineSecret('GEMINI_API_KEY')

const MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash'
const requestBuckets = new Map()

const firstJson = (rawText) => {
  if (!rawText) return null
  const cleaned = rawText.replace(/```json|```/g, '').trim()
  const match = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)
  if (!match) return null
  try {
    return JSON.parse(match[1])
  } catch {
    return null
  }
}

const withCors = (handler) => async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type,x-sync-key,Authorization')
  if (req.method === 'OPTIONS') return res.status(204).send('')
  return handler(req, res)
}

const trackTelemetry = async (syncKey, payload) => {
  try {
    await db.collection('users').doc(syncKey).collection('aiTelemetry').add({
      ...payload,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    logger.warn('Telemetry write failed', error)
  }
}

const getUserIdFromRequest = async (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization || ''
  const token = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : null
  if (token) {
    try {
      const decoded = await adminAuth.verifyIdToken(token)
      if (decoded?.uid) return decoded.uid
    } catch (error) {
      logger.warn('Token verification failed', error)
    }
  }
  const key = req.headers['x-sync-key']
  return typeof key === 'string' && key.trim().length >= 4 ? key.trim() : null
}

const readUserData = async (syncKey) => {
  const snap = await db.collection('users').doc(syncKey).get()
  if (!snap.exists) return null
  return snap.data()
}

const buildAnalytics = (userData) => {
  const meals = userData?.meals || {}
  const profile = userData?.profile || {}
  const calorieGoal = profile.calorieGoal || 2000
  const days = Object.keys(meals).sort().slice(-14)
  const perDay = days.map((date) => {
    const dayMeals = meals[date] || []
    const calories = dayMeals.reduce((sum, m) => sum + (m.calories || 0), 0)
    const protein = dayMeals.reduce((sum, m) => sum + (m.protein || 0), 0)
    return { date, calories, protein }
  })
  const total = perDay.reduce((sum, d) => sum + d.calories, 0)
  const avg = perDay.length ? Math.round(total / perDay.length) : 0
  const under = perDay.filter(d => d.calories > 0 && d.calories <= calorieGoal).length
  const proteinGoal = profile.proteinGoal || 120
  const last7 = perDay.slice(-7)
  const avgProtein = last7.length
    ? Math.round(last7.reduce((sum, d) => sum + d.protein, 0) / last7.length)
    : 0
  return { calorieGoal, proteinGoal, perDay, total, avg, under, avgProtein, last7Count: last7.length }
}

const clamp = (value, min, max) => Math.max(min, Math.min(value, max))

const buildRuleRecommendations = ({ analytics, mealType, remainingCalories }) => {
  const result = { mode: 'rule_result', confidence: 'high', reasonCodes: [], warnings: [], mealType, options: [] }
  if (!analytics.last7Count || analytics.last7Count < 3) {
    return {
      mode: 'insufficient_data',
      confidence: 'low',
      reasonCodes: ['insufficient_data'],
      warnings: ['Log at least 3 days for more accurate recommendations.'],
      mealType,
      options: ['Keep portions stable and prioritize protein in your next meal.'],
    }
  }

  if (analytics.avg > analytics.calorieGoal * 1.15) {
    result.reasonCodes.push('over_calorie_budget')
    result.warnings.push('Recent intake is above your target range.')
  } else if (analytics.avg < analytics.calorieGoal * 0.75) {
    result.reasonCodes.push('too_low_calorie_intake')
    result.warnings.push('Recent intake is very low. Avoid aggressive deficits.')
  } else {
    result.reasonCodes.push('calorie_on_track')
  }

  if (analytics.avgProtein < analytics.proteinGoal * 0.75) {
    result.reasonCodes.push('protein_gap')
  }

  const budget = clamp(Math.round(remainingCalories), 150, 900)
  const proteinFocus = analytics.avgProtein < analytics.proteinGoal
  if (proteinFocus) {
    result.options = [
      `${mealType}: grilled chicken + salad + yogurt (~${Math.round(budget * 0.95)} kcal)`,
      `${mealType}: paneer stir fry with vegetables (~${Math.round(budget * 0.9)} kcal)`,
      `${mealType}: egg bhurji with roti and cucumber (~${Math.round(budget * 0.85)} kcal)`,
    ]
  } else {
    result.options = [
      `${mealType}: rice bowl with lean protein and veggies (~${Math.round(budget * 0.95)} kcal)`,
      `${mealType}: dal + roti + salad (~${Math.round(budget * 0.85)} kcal)`,
      `${mealType}: tofu wrap with side fruit (~${Math.round(budget * 0.8)} kcal)`,
    ]
  }
  return result
}

const getModel = () => {
  const key = geminiApiKey.value()
  if (!key) return null
  const genAI = new GoogleGenerativeAI(key)
  return genAI.getGenerativeModel({ model: MODEL })
}

const checkRateLimit = (userId) => {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 45
  const bucket = requestBuckets.get(userId) || []
  const recent = bucket.filter(ts => now - ts < windowMs)
  recent.push(now)
  requestBuckets.set(userId, recent)
  return recent.length <= maxRequests
}

const generateJson = async ({ system, payload, fallback }) => {
  try {
    const model = getModel()
    if (!model) return fallback
    const prompt = `${system}\nRespond only JSON.\nInput:\n${JSON.stringify(payload).slice(0, 12000)}`
    const result = await model.generateContent(prompt)
    const text = result.response?.text?.() || ''
    const parsed = firstJson(text)
    return parsed || fallback
  } catch (error) {
    logger.error('AI generation failed', error)
    return fallback
  }
}

export const aiInsights = onRequest({ secrets: [geminiApiKey], invoker: 'public' }, withCors(async (req, res) => {
  const startedAt = Date.now()
  const userId = await getUserIdFromRequest(req)
  if (!userId) return res.status(401).json({ error: 'Missing auth token' })
  const userData = await readUserData(userId)
  if (!checkRateLimit(userId)) return res.status(429).json({ error: 'Too many requests' })
  const analytics = buildAnalytics(userData)

  const insights = {
    mode: analytics.last7Count >= 3 ? 'rule_result' : 'insufficient_data',
    confidence: analytics.last7Count >= 3 ? 'high' : 'low',
    weeklySummary: `Average ${analytics.avg} kcal/day and ${analytics.avgProtein}g protein/day across ${analytics.perDay.length || 0} logged days.`,
    topImprovements: [
      analytics.avgProtein < analytics.proteinGoal ? 'Increase protein in your first two meals' : 'Keep protein consistency through the day',
      analytics.avg > analytics.calorieGoal ? 'Reduce calorie-dense snacks and sugary drinks' : 'Maintain consistent meal timing',
      'Pre-log your next meal to stay within budget',
    ],
    nextAction: analytics.avg > analytics.calorieGoal
      ? 'For your next meal, keep portions moderate and include one lean protein source.'
      : 'For your next meal, hit at least 30g protein and add vegetables.',
    reasonCodes: analytics.last7Count >= 3 ? ['deterministic_weekly_analysis'] : ['insufficient_data'],
  }

  await db.collection('users').doc(userId).collection('aiSnapshots').add({
    type: 'insights',
    insights,
    createdAt: new Date().toISOString(),
  })
  await trackTelemetry(userId, { endpoint: 'aiInsights', status: 'ok', latencyMs: Date.now() - startedAt })
  return res.json(insights)
}))

export const aiRecommendations = onRequest({ secrets: [geminiApiKey], invoker: 'public' }, withCors(async (req, res) => {
  const startedAt = Date.now()
  const userId = await getUserIdFromRequest(req)
  if (!userId) return res.status(401).json({ error: 'Missing auth token' })
  const userData = await readUserData(userId)
  if (!checkRateLimit(userId)) return res.status(429).json({ error: 'Too many requests' })
  const analytics = buildAnalytics(userData)
  const mealType = String(req.query.mealType || 'Dinner').slice(0, 24)
  const remainingCalories = Math.max(0, Math.min(Number(req.query.remainingCalories || 500), 2500))
  const recommendations = buildRuleRecommendations({ analytics, mealType, remainingCalories })
  await trackTelemetry(userId, { endpoint: 'aiRecommendations', status: 'ok', latencyMs: Date.now() - startedAt })
  return res.json(recommendations)
}))

export const aiChat = onRequest({ secrets: [geminiApiKey], invoker: 'public' }, withCors(async (req, res) => {
  const startedAt = Date.now()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' })
  const userId = await getUserIdFromRequest(req)
  if (!userId) return res.status(401).json({ error: 'Missing auth token' })
  const userData = await readUserData(userId)
  if (!checkRateLimit(userId)) return res.status(429).json({ error: 'Too many requests' })
  const analytics = buildAnalytics(userData)

  const question = String(req.body?.question || '').trim().slice(0, 500)
  if (!question) return res.status(400).json({ error: 'Question required' })
  if (/(self-harm|violence|illegal|diagnose|prescribe|steroids)/i.test(question)) {
    await trackTelemetry(userId, { endpoint: 'aiChat', status: 'blocked' })
    return res.status(400).json({ error: 'Question is outside coach scope' })
  }

  const rule = buildRuleRecommendations({ analytics, mealType: 'Next meal', remainingCalories: analytics.calorieGoal - analytics.avg })
  const response = {
    answer: `Based on your logs: ${rule.warnings[0] || 'stay close to your goal'} ${rule.reasonCodes.includes('protein_gap') ? 'Also prioritize protein in your next meal.' : 'Keep your current protein consistency.'}`,
    confidence: rule.confidence,
    mode: rule.mode,
    reasonCodes: rule.reasonCodes,
    safety: 'moderate_guardrails',
  }

  await db.collection('users').doc(userId).collection('aiSnapshots').add({
    type: 'chat',
    question,
    response,
    createdAt: new Date().toISOString(),
  })
  await trackTelemetry(userId, { endpoint: 'aiChat', status: 'ok', latencyMs: Date.now() - startedAt })
  return res.json(response)
}))

export const aiRecommendationHistory = onRequest({ secrets: [geminiApiKey], invoker: 'public' }, withCors(async (req, res) => {
  const startedAt = Date.now()
  const userId = await getUserIdFromRequest(req)
  if (!userId) return res.status(401).json({ error: 'Missing auth token' })
  const snaps = await db.collection('users').doc(userId).collection('aiSnapshots')
    .orderBy('createdAt', 'desc').limit(20).get()
  const history = snaps.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  await trackTelemetry(userId, { endpoint: 'aiRecommendationHistory', status: 'ok', latencyMs: Date.now() - startedAt })
  return res.json({ history })
}))
