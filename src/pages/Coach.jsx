import React, { useMemo, useState } from 'react'
import { Bot, Sparkles, Send, RefreshCcw, UtensilsCrossed } from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  getAiHistory, getAiInsights, getAiRecommendations, sendAiChat,
  getAiInsightsFallback, getAiRecommendationsFallback, sendAiChatFallback,
  isAiBackendConfigured,
} from '../services/aiClient'

const MEAL_QUICK_ACTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

export default function Coach() {
  const { syncKey, profile, todayCalories, addAiSnapshot, getAiSnapshots, showToast, getRangeAnalytics, getWeekComparison } = useApp()
  const [tab, setTab] = useState('chat')
  const [question, setQuestion] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [insights, setInsights] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const remaining = (profile?.calorieGoal || 2000) - todayCalories
  const localSnapshots = useMemo(() => getAiSnapshots(), [getAiSnapshots])
  const canUseAi = Boolean(syncKey) && isAiBackendConfigured()
  const thisWeekAnalytics = getRangeAnalytics(7)
  const past14Analytics = getRangeAnalytics(14)
  const monthAnalytics = getRangeAnalytics(30)
  const weekComparison = getWeekComparison()
  const thisWeekDays = thisWeekAnalytics.daily
  const lastWeekDays = past14Analytics.daily.slice(0, 7)
  const chatAnalytics = {
    thisWeek: {
      total: thisWeekAnalytics.totals.calories,
      protein: thisWeekAnalytics.totals.protein,
      avg: thisWeekAnalytics.avgPerDay.calories,
      daysWithLogs: thisWeekAnalytics.adherence.daysWithLogs,
      days: thisWeekDays.map(d => ({ date: d.date, calories: d.calories, protein: d.protein })),
    },
    lastWeek: {
      total: weekComparison.lastWeekCalories,
      protein: lastWeekDays.reduce((sum, d) => sum + (d.protein || 0), 0),
      avg: Math.round((weekComparison.lastWeekCalories || 0) / 7),
      daysWithLogs: lastWeekDays.filter(d => d.calories > 0).length,
      days: lastWeekDays.map(d => ({ date: d.date, calories: d.calories, protein: d.protein })),
    },
    compare: weekComparison,
    month: monthAnalytics.daily.map(d => ({ date: d.date, calories: d.calories, protein: d.protein })),
  }

  const withGuardrails = async (action) => {
    setLoading(true)
    try {
      await action()
    } catch (error) {
      showToast('AI request failed, switched to local analysis', 'error')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const askQuestion = () => withGuardrails(async () => {
    if (!question.trim()) return
    const prompt = question.trim().slice(0, 500)
    setQuestion('')
    setChatMessages(prev => [...prev, { role: 'user', text: prompt }])
    let res
    if (canUseAi) {
      try {
        res = await sendAiChat({ syncKey, question: prompt })
      } catch {
        res = await sendAiChatFallback({ question: prompt, profile, todayCalories, analytics: chatAnalytics })
      }
    } else {
      res = await sendAiChatFallback({ question: prompt, profile, todayCalories, analytics: chatAnalytics })
    }
    const answer = res?.answer || 'Try keeping dinner lighter and protein high.'
    setChatMessages(prev => [...prev, { role: 'assistant', text: answer }])
    addAiSnapshot({ type: 'chat', title: prompt, payload: res })
  })

  const loadInsights = () => withGuardrails(async () => {
    const res = canUseAi
      ? await getAiInsights({ syncKey })
      : await getAiInsightsFallback({ profile, todayCalories })
    setInsights(res)
    addAiSnapshot({ type: 'insights', title: 'Weekly brief', payload: res })
  })

  const loadHistory = () => withGuardrails(async () => {
    if (!canUseAi) {
      setHistory([])
      return
    }
    const res = await getAiHistory({ syncKey })
    setHistory(res.history || [])
  })

  const quickMealIdeas = (mealType) => withGuardrails(async () => {
    const res = canUseAi
      ? await getAiRecommendations({
        syncKey,
        mealType,
        remainingCalories: Math.max(remaining, 250),
      })
      : await getAiRecommendationsFallback({
        mealType,
        remainingCalories: Math.max(remaining, 250),
      })
    const line = `${res.mealType}: ${(res.options || []).join(' | ')}`
    setChatMessages(prev => [...prev, { role: 'assistant', text: line }])
    addAiSnapshot({ type: 'recommendation', title: mealType, payload: res })
    setTab('chat')
  })

  return (
    <div className="page">
      <div style={{ padding: 'calc(env(safe-area-inset-top,44px) + 8px) 20px 16px' }}>
        <p className="page-subtitle">AI nutrition companion</p>
        <h1 className="page-title shimmer-text" style={{ display: 'inline-block' }}>Coach</h1>
      </div>

      <div className="chips" style={{ marginBottom: 12 }}>
        <button className={`chip ${tab === 'chat' ? 'active' : ''}`} onClick={() => setTab('chat')}><Bot size={14} /> Chat</button>
        <button className={`chip ${tab === 'insights' ? 'active' : ''}`} onClick={() => setTab('insights')}><Sparkles size={14} /> Insights</button>
      </div>

      {tab === 'chat' && (
        <>
          <div className="section">
            <div className="card" style={{ display: 'grid', gap: 10 }}>
              <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Quick meal ideas based on your remaining calories ({remaining} kcal)</p>
              <div className="chips" style={{ marginBottom: 0 }}>
                {MEAL_QUICK_ACTIONS.map(type => (
                  <button key={type} className="chip" onClick={() => quickMealIdeas(type)} disabled={loading}>
                    <UtensilsCrossed size={14} /> {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="section">
            <div className="card" style={{ minHeight: 220 }}>
              {chatMessages.length === 0 ? (
                <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
                  Ask things like: "How much did I eat last week?" or "Suggest a 450 kcal dinner high in protein."
                </p>
              ) : (
                <div style={{ display: 'grid', gap: 8 }}>
                  {chatMessages.map((msg, idx) => (
                    <div key={`${msg.role}-${idx}`} style={{
                      padding: '10px 12px',
                      borderRadius: 12,
                      background: msg.role === 'user' ? 'var(--surface-3)' : 'rgba(10,132,255,0.12)',
                      marginLeft: msg.role === 'user' ? '16%' : 0,
                      marginRight: msg.role === 'assistant' ? '16%' : 0,
                    }}>
                      <p style={{ fontSize: 13 }}>{msg.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !loading) askQuestion() }}
                placeholder="Ask AI coach..."
                style={S.input}
                maxLength={500}
              />
              <button className="btn btn-primary" onClick={askQuestion} disabled={loading}>
                <Send size={15} />
              </button>
            </div>
          </div>
        </>
      )}

      {tab === 'insights' && (
        <>
          <div className="section">
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" onClick={loadInsights} disabled={loading}><RefreshCcw size={14} /> Refresh Brief</button>
              <button className="btn" onClick={loadHistory} disabled={loading}>Load History</button>
            </div>
          </div>

          {insights && (
            <div className="section">
              <div className="card">
                <p style={S.miniLabel}>Weekly summary</p>
                <p>{insights.weeklySummary}</p>
                <p style={{ ...S.miniLabel, marginTop: 10 }}>Top improvements</p>
                <ul style={{ margin: '6px 0 0 16px', color: 'var(--text-2)' }}>
                  {(insights.topImprovements || []).map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
                <p style={{ ...S.miniLabel, marginTop: 10 }}>Next action</p>
                <p>{insights.nextAction}</p>
              </div>
            </div>
          )}

          <div className="section">
            <div className="grouped-card">
              {[...history, ...localSnapshots].slice(0, 20).map((item, idx) => (
                <div key={item.id || idx} className="grouped-item">
                  <div className="grouped-item-body">
                    <p className="grouped-item-title">{item.title || item.type || 'Snapshot'}</p>
                    <p className="grouped-item-sub">{new Date(item.createdAt || Date.now()).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {history.length === 0 && localSnapshots.length === 0 && (
                <div className="grouped-item"><p className="grouped-item-sub">No snapshots yet</p></div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const S = {
  input: {
    flex: 1,
    border: '1px solid var(--border)',
    background: 'var(--surface-2)',
    borderRadius: 12,
    padding: '10px 12px',
    color: 'var(--text-1)',
    outline: 'none',
  },
  miniLabel: {
    fontSize: 10,
    color: 'var(--text-3)',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    fontWeight: 600,
  },
}
