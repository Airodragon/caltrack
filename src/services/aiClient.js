const BASE_URL = import.meta.env.VITE_AI_BASE_URL || ''
let authModule = null

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
export const isAiBackendConfigured = () => Boolean(BASE_URL)

const getAuthToken = async () => {
  try {
    if (!authModule) {
      const firebase = await import('../firebase')
      authModule = firebase.auth
    }
    const user = authModule?.currentUser
    if (!user) return null
    return user.getIdToken()
  } catch {
    return null
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
  const idToken = await getAuthToken()
  while (attempt < 2) {
    try {
      const res = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-sync-key': syncKey || '',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
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
