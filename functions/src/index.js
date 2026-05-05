import { onRequest } from 'firebase-functions/v2/https'
import { logger } from 'firebase-functions'
import { defineSecret } from 'firebase-functions/params'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { GoogleGenerativeAI } from '@google/generative-ai'

initializeApp()
const db = getFirestore()
const geminiApiKey = defineSecret('GEMINI_API_KEY')

const MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

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
  res.set('Access-Control-Allow-Headers', 'Content-Type,x-sync-key')
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

const validateSyncKey = (req) => {
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
  return { calorieGoal, perDay, total, avg, under }
}

const getModel = () => {
  const key = geminiApiKey.value()
  if (!key) return null
  const genAI = new GoogleGenerativeAI(key)
  return genAI.getGenerativeModel({ model: MODEL })
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
  const syncKey = validateSyncKey(req)
  if (!syncKey) return res.status(401).json({ error: 'Missing x-sync-key' })
  const userData = await readUserData(syncKey)
  const analytics = buildAnalytics(userData)

  const fallback = {
    weeklySummary: `Average ${analytics.avg} kcal/day across ${analytics.perDay.length || 0} logged days.`,
    topImprovements: ['Prioritize protein in first meal', 'Keep dinner portion stable', 'Pre-plan one low-cal snack'],
    nextAction: 'Log breakfast before 10 AM tomorrow.',
  }

  const insights = await generateJson({
    system: 'You are a nutrition coach. Return keys: weeklySummary, topImprovements(array of 3), nextAction.',
    payload: { analytics },
    fallback,
  })

  await db.collection('users').doc(syncKey).collection('aiSnapshots').add({
    type: 'insights',
    insights,
    createdAt: new Date().toISOString(),
  })
  await trackTelemetry(syncKey, { endpoint: 'aiInsights', status: 'ok', latencyMs: Date.now() - startedAt })
  return res.json(insights)
}))

export const aiRecommendations = onRequest({ secrets: [geminiApiKey], invoker: 'public' }, withCors(async (req, res) => {
  const startedAt = Date.now()
  const syncKey = validateSyncKey(req)
  if (!syncKey) return res.status(401).json({ error: 'Missing x-sync-key' })
  const userData = await readUserData(syncKey)
  const analytics = buildAnalytics(userData)
  const mealType = String(req.query.mealType || 'Dinner').slice(0, 24)
  const remainingCalories = Math.max(0, Math.min(Number(req.query.remainingCalories || 500), 2500))

  const fallback = {
    mealType,
    options: [
      `${mealType}: grilled paneer bowl with salad`,
      `${mealType}: egg scramble + sauteed veggies`,
      `${mealType}: dal, rice, cucumber salad`,
    ],
  }

  const recommendations = await generateJson({
    system: 'You are a meal planner. Return JSON with keys mealType and options(array of 3 short meal ideas).',
    payload: { analytics, mealType, remainingCalories },
    fallback,
  })
  await trackTelemetry(syncKey, { endpoint: 'aiRecommendations', status: 'ok', latencyMs: Date.now() - startedAt })
  return res.json(recommendations)
}))

export const aiChat = onRequest({ secrets: [geminiApiKey], invoker: 'public' }, withCors(async (req, res) => {
  const startedAt = Date.now()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' })
  const syncKey = validateSyncKey(req)
  if (!syncKey) return res.status(401).json({ error: 'Missing x-sync-key' })
  const userData = await readUserData(syncKey)
  const analytics = buildAnalytics(userData)

  const question = String(req.body?.question || '').trim().slice(0, 500)
  if (!question) return res.status(400).json({ error: 'Question required' })
  if (/(self-harm|violence|illegal)/i.test(question)) {
    await trackTelemetry(syncKey, { endpoint: 'aiChat', status: 'blocked' })
    return res.status(400).json({ error: 'Question is outside coach scope' })
  }

  const fallback = {
    answer: `Based on your recent logs, your average intake is ${analytics.avg} kcal/day. Try to stay close to your goal and keep protein high.`,
    confidence: 'low',
  }

  const response = await generateJson({
    system: 'You are a concise fat-loss assistant. Return JSON with keys answer and confidence.',
    payload: { question, analytics },
    fallback,
  })

  await db.collection('users').doc(syncKey).collection('aiSnapshots').add({
    type: 'chat',
    question,
    response,
    createdAt: new Date().toISOString(),
  })
  await trackTelemetry(syncKey, { endpoint: 'aiChat', status: 'ok', latencyMs: Date.now() - startedAt })
  return res.json(response)
}))

export const aiRecommendationHistory = onRequest({ secrets: [geminiApiKey], invoker: 'public' }, withCors(async (req, res) => {
  const startedAt = Date.now()
  const syncKey = validateSyncKey(req)
  if (!syncKey) return res.status(401).json({ error: 'Missing x-sync-key' })
  const snaps = await db.collection('users').doc(syncKey).collection('aiSnapshots')
    .orderBy('createdAt', 'desc').limit(20).get()
  const history = snaps.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  await trackTelemetry(syncKey, { endpoint: 'aiRecommendationHistory', status: 'ok', latencyMs: Date.now() - startedAt })
  return res.json({ history })
}))
