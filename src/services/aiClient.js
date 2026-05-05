const BASE_URL = import.meta.env.VITE_AI_BASE_URL || ''
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
export const isAiBackendConfigured = () => Boolean(BASE_URL)

const getGeminiResponse = async (prompt, fallback) => {
  if (!GEMINI_KEY) return fallback
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${prompt}\nRespond as strict JSON only.` }] }],
      }),
    })
    if (!res.ok) return fallback
    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const cleaned = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)?.[1] || '{}')
    return Object.keys(parsed).length ? parsed : fallback
  } catch {
    return fallback
  }
}

const callAi = async (path, { method = 'GET', syncKey, body, query } = {}) => {
  if (!BASE_URL) {
    throw new Error('VITE_AI_BASE_URL is not configured')
  }
  const url = new URL(`${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`)
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value))
    })
  }
  let attempt = 0
  let lastError = null
  while (attempt < 2) {
    try {
      const res = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-sync-key': syncKey || '',
        },
        body: body ? JSON.stringify(body) : undefined,
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'AI request failed')
      }
      return res.json()
    } catch (error) {
      lastError = error
      attempt += 1
      if (attempt < 2) await sleep(250 * attempt)
    }
  }
  throw lastError || new Error('AI request failed')
}

export const getAiInsights = ({ syncKey }) => callAi('/aiInsights', { syncKey })
export const getAiRecommendations = ({ syncKey, mealType, remainingCalories }) => callAi('/aiRecommendations', {
  syncKey,
  query: { mealType, remainingCalories },
})
export const sendAiChat = ({ syncKey, question }) => callAi('/aiChat', {
  method: 'POST',
  syncKey,
  body: { question },
})
export const getAiHistory = ({ syncKey }) => callAi('/aiRecommendationHistory', { syncKey })

const formatDelta = (value) => `${value > 0 ? '+' : ''}${value.toLocaleString()}`

export const buildDeterministicChatAnswer = ({ question, analytics, profile, todayCalories }) => {
  const q = (question || '').toLowerCase()
  const thisWeek = analytics?.thisWeek || { total: 0, avg: 0, daysWithLogs: 0 }
  const lastWeek = analytics?.lastWeek || { total: 0, avg: 0, daysWithLogs: 0 }
  const compare = analytics?.compare || { deltaCalories: 0, deltaPct: 0 }
  const goal = profile?.calorieGoal || 2000
  const thisWeekDays = analytics?.thisWeek?.days || []
  const lastWeekDays = analytics?.lastWeek?.days || []

  if (q.includes('last week') || q.includes('previous week')) {
    return {
      answer: `Last week you logged ${lastWeek.total.toLocaleString()} kcal across ${lastWeek.daysWithLogs} days (avg ${lastWeek.avg.toLocaleString()} kcal/day). This week so far is ${thisWeek.total.toLocaleString()} kcal (${thisWeek.avg.toLocaleString()} kcal/day), ${formatDelta(compare.deltaCalories)} kcal vs last week (${formatDelta(compare.deltaPct)}%).`,
      confidence: 'high',
    }
  }

  if (q.includes('this week') || q.includes('week so far')) {
    return {
      answer: `This week you logged ${thisWeek.total.toLocaleString()} kcal over ${thisWeek.daysWithLogs} days, averaging ${thisWeek.avg.toLocaleString()} kcal/day. Your daily goal is ${goal.toLocaleString()} kcal.`,
      confidence: 'high',
    }
  }

  if (q.includes('today')) {
    const remaining = goal - (todayCalories || 0)
    return {
      answer: `Today you are at ${(todayCalories || 0).toLocaleString()} kcal vs goal ${goal.toLocaleString()} kcal. ${remaining >= 0 ? `${remaining.toLocaleString()} kcal remaining.` : `${Math.abs(remaining).toLocaleString()} kcal over goal.`}`,
      confidence: 'high',
    }
  }

  if (q.includes('highest') || q.includes('max')) {
    const combined = [...thisWeekDays, ...lastWeekDays]
    const top = combined.sort((a, b) => b.calories - a.calories)[0]
    if (top) {
      return {
        answer: `Your highest logged day recently was ${top.date} with ${top.calories.toLocaleString()} kcal.`,
        confidence: 'high',
      }
    }
  }

  if (q.includes('protein')) {
    const weekProtein = analytics?.thisWeek?.protein || 0
    return {
      answer: `This week protein total is ${weekProtein.toLocaleString()}g, averaging ${Math.round(weekProtein / 7).toLocaleString()}g/day.`,
      confidence: 'high',
    }
  }

  if (q.includes('over goal')) {
    const overDays = (thisWeekDays || []).filter(d => d.calories > goal).length
    return {
      answer: `This week you were over your ${goal.toLocaleString()} kcal goal on ${overDays} day${overDays === 1 ? '' : 's'}.`,
      confidence: 'high',
    }
  }

  return null
}

export const getAiInsightsFallback = async ({ profile, todayCalories }) => getGeminiResponse(
  `You are a nutrition coach. Return JSON with keys weeklySummary, topImprovements (array of 3), nextAction.
User profile goal calories: ${profile?.calorieGoal || 2000}. Today's calories: ${todayCalories || 0}.`,
  {
    weeklySummary: 'Keep intake stable and prioritize protein across meals this week.',
    topImprovements: ['Start day with protein', 'Pre-plan dinner', 'Limit late-night snacks'],
    nextAction: 'Prepare tomorrow breakfast tonight.',
  },
)

export const getAiRecommendationsFallback = async ({ mealType, remainingCalories }) => getGeminiResponse(
  `Return JSON with keys mealType and options (3 items). Meal type: ${mealType}. Remaining calories: ${remainingCalories}.`,
  {
    mealType,
    options: [
      `${mealType}: grilled paneer + salad`,
      `${mealType}: egg bhurji + sauteed veggies`,
      `${mealType}: dal + small rice + cucumber`,
    ],
  },
)

export const sendAiChatFallback = async ({ question, profile, todayCalories, analytics }) => {
  const deterministic = buildDeterministicChatAnswer({ question, analytics, profile, todayCalories })
  if (deterministic) return deterministic
  return getGeminiResponse(
    `Return JSON with keys answer and confidence.
Question: ${question}
Goal calories: ${profile?.calorieGoal || 2000}
Today calories: ${todayCalories || 0}
This week calories: ${analytics?.thisWeek?.total || 0}
Last week calories: ${analytics?.lastWeek?.total || 0}
Week delta calories: ${analytics?.compare?.deltaCalories || 0}
This week daily calories: ${JSON.stringify(analytics?.thisWeek?.days || []).slice(0, 3000)}
Last week daily calories: ${JSON.stringify(analytics?.lastWeek?.days || []).slice(0, 3000)}
This week protein total: ${analytics?.thisWeek?.protein || 0}
Last 30 days snapshot: ${JSON.stringify(analytics?.month || []).slice(0, 3000)}
Be specific and reference these numbers directly.`,
  {
    answer: 'Stay near your calorie goal and keep protein high for better fat-loss adherence.',
    confidence: 'low',
  },
)
}
