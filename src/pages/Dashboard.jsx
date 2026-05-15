import React, { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import { greetingByTime, getLastNDays } from '../utils/helpers'
import QuickAddModal from '../components/QuickAddModal'
import SkeletonBlock from '../components/SkeletonBlock'
import { MealTypeIcon } from '../components/AppIcon'
import { Plus, Utensils, X, AlertTriangle, TrendingUp, CalendarCheck2, Flame, Droplets } from 'lucide-react'

export default function Dashboard() {
  const {
    profile, todayMeals, todayCalories, todayProtein, todayCarbs, todayFat,
    habitsDoneCount, habitsTotal, deleteMeal, showToast, addWeight,
    getRangeAnalytics, getRiskWindows, getWeightTrend,
    meals, habitLogs, weights, waterLogs, addWater, resetWater, today,
  } = useApp()

  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(true)
  const [weightInput, setWeightInput] = useState('')
  const [customWaterMl, setCustomWaterMl] = useState('')
  const [showCustomWater, setShowCustomWater] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [])

  const goal = profile?.calorieGoal || 2000
  const remaining = goal - todayCalories
  const isOver = remaining < 0
  const pct = Math.min((todayCalories / goal) * 100, 100)

  // Activity ring params
  const R = 62
  const C = 2 * Math.PI * R
  const offset = C * (1 - pct / 100)

  const habitPct = habitsTotal > 0 ? (habitsDoneCount / habitsTotal) * 100 : 0
  const ROUT = 20

  const macros = [
    { label: 'Protein', val: todayProtein, goal: profile?.proteinGoal || 0, color: 'var(--blue)' },
    { label: 'Carbs', val: todayCarbs, goal: profile?.carbsGoal || 0, color: 'var(--orange)' },
    { label: 'Fat', val: todayFat, goal: profile?.fatGoal || 0, color: 'var(--red)' },
  ]

  const firstName = profile?.name?.split(' ')[0] || ''
  const weekly = getRangeAnalytics(7)
  const risk = getRiskWindows(30)
  const trend = getWeightTrend(30)
  const weeklyStreak = weekly.adherence.daysUnderGoal
  const rescueCalories = isOver ? 0 : Math.round(Math.max(remaining, 0) * 0.55)
  const isSunday = new Date().getDay() === 0

  // Logging streak — consecutive days with at least 1 meal logged
  const loggingStreak = (() => {
    let s = 0
    const d = new Date()
    // Don't penalise today if not logged yet; start from yesterday
    d.setDate(d.getDate() - 1)
    while (s < 365) {
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      if (!((meals[k] || []).length > 0)) break
      s++
      d.setDate(d.getDate() - 1)
    }
    // If today has meals too, count it
    if ((meals[today] || []).length > 0) s++
    return s
  })()

  // Water tracking
  const waterGoal = profile?.waterGoal || 2000
  const waterToday = (waterLogs && waterLogs[today]) || 0
  const waterPct = Math.min((waterToday / waterGoal) * 100, 100)

  // Weight progress bar
  const latestWeight = (() => {
    const days = getLastNDays(90)
    for (let i = days.length - 1; i >= 0; i--) {
      if (weights[days[i]] != null) return weights[days[i]]
    }
    return profile?.currentWeight || null
  })()
  const startWeight = profile?.currentWeight || null
  const targetWeight = profile?.targetWeight || null
  const weightProgressPct = startWeight && targetWeight && startWeight !== targetWeight && latestWeight != null
    ? Math.max(0, Math.min(100, Math.abs((startWeight - latestWeight) / (startWeight - targetWeight)) * 100))
    : null

  return (
    <div className="page">
      {/* ── Header ── */}
      <div style={{ padding: 'calc(env(safe-area-inset-top, 44px) + 8px) 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="shimmer-text" style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.6px', marginTop: 2, display: 'inline-block' }}>
            {greetingByTime()}{firstName ? `, ${firstName}` : ''}
          </h1>
        </div>
        {loggingStreak >= 2 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'var(--orange-dim)', borderRadius: 20,
            padding: '6px 10px', marginTop: 4, flexShrink: 0,
          }}>
            <Flame size={13} color="var(--orange)" />
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--orange)' }}>
              {loggingStreak}d
            </span>
          </div>
        )}
      </div>

      {/* ── Activity Ring Card ── */}
      <div className="section">
        <div className="card glow-card" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {loading ? (
            <div style={{ width: '100%' }}>
              <SkeletonBlock height={170} radius={20} />
            </div>
          ) : (
            <>
          {/* Ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width={150} height={150} style={{ transform: 'rotate(-90deg)' }}>
              {/* Outer: Calories */}
              <circle cx={75} cy={75} r={R} fill="none" stroke="var(--surface-3)" strokeWidth={11} />
              <circle cx={75} cy={75} r={R} fill="none"
                stroke={isOver ? 'var(--red)' : 'var(--green)'}
                strokeWidth={11} strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 900ms var(--ease-out)' }}
              />
              {/* Inner: Habits */}
              <circle cx={75} cy={75} r={ROUT + 18} fill="none" stroke="var(--surface-3)" strokeWidth={7} />
              <circle cx={75} cy={75} r={ROUT + 18} fill="none"
                stroke="var(--purple)"
                strokeWidth={7} strokeLinecap="round"
                strokeDasharray={2 * Math.PI * (ROUT + 18)}
                strokeDashoffset={2 * Math.PI * (ROUT + 18) * (1 - habitPct / 100)}
                style={{ transition: 'stroke-dashoffset 900ms var(--ease-out)' }}
              />
            </svg>
            {/* Center */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-1px', color: isOver ? 'var(--red)' : 'var(--text-1)', lineHeight: 1 }}>
                {todayCalories.toLocaleString()}
              </span>
              <span style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'uppercase', marginTop: 2 }}>
                kcal
              </span>
            </div>
          </div>

          {/* Legend */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: isOver ? 'var(--red)' : 'var(--green)', flexShrink: 0 }} />
                <span style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase' }}>Calories</span>
              </div>
              <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', color: isOver ? 'var(--red)' : 'var(--text-1)', lineHeight: 1 }}>
                {isOver ? '+' : ''}{Math.abs(remaining).toLocaleString()}
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                {isOver ? 'over budget' : 'remaining'}
              </p>
              <p style={{ fontSize: 10, color: 'var(--text-4)', marginTop: 1 }}>
                of {goal.toLocaleString()} kcal
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--purple)', flexShrink: 0 }} />
                <span style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase' }}>Routine</span>
              </div>
              <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1 }}>
                {habitsDoneCount}<span style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>/{habitsTotal}</span>
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>habits done</p>
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      {/* ── Macros ── */}
      <div className="section">
        <div style={S.sectionHeader}>
          <span className="section-title">Macros</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {macros.map((m, i) => {
            const p = m.goal > 0 ? Math.min((m.val / m.goal) * 100, 100) : 0
            return (
              <div key={m.label} className={`macro-card macro-card-${m.label.toLowerCase()}`}>
                <p style={{ fontSize: 18, fontWeight: 700, color: m.color, letterSpacing: '-0.5px' }}>{m.val}g</p>
                <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase', marginTop: 1, marginBottom: 8 }}>
                  {m.label}
                </p>
                <div className="progress-track" style={{ height: 3 }}>
                  <div className="progress-fill" style={{ width: m.goal > 0 ? `${p}%` : '0%', background: m.color }} />
                </div>
                {m.goal > 0 && (
                  <p style={{ fontSize: 9, color: 'var(--text-3)', marginTop: 4 }}>
                    {m.goal}g goal
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Water ── */}
      <div className="section">
        <div style={S.sectionHeader}>
          <span className="section-title">Hydration</span>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{waterToday} / {waterGoal} ml</span>
        </div>
        <div className="card" style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div className="progress-track" style={{ height: 8, borderRadius: 6 }}>
                <div className="progress-fill" style={{
                  width: `${waterPct}%`,
                  background: waterPct >= 100 ? 'var(--green)' : 'linear-gradient(90deg, #64D2FF, var(--blue))',
                  borderRadius: 6,
                }} />
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                {[250, 500].map(ml => (
                  <button
                    key={ml}
                    onClick={() => addWater(ml)}
                    style={{
                      background: 'var(--surface-3)', border: '1px solid var(--border)',
                      borderRadius: 20, padding: '5px 12px',
                      fontSize: 12, fontWeight: 700, color: 'var(--blue)',
                      cursor: 'pointer', fontFamily: 'var(--font)',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}
                  >
                    <Droplets size={12} />+{ml}ml
                  </button>
                ))}
                <button
                  onClick={() => setShowCustomWater(v => !v)}
                  style={{
                    background: showCustomWater ? 'var(--blue-dim)' : 'var(--surface-3)',
                    border: showCustomWater ? '1px solid var(--blue)' : '1px solid var(--border)',
                    borderRadius: 20, padding: '5px 12px',
                    fontSize: 12, fontWeight: 700, color: 'var(--blue)',
                    cursor: 'pointer', fontFamily: 'var(--font)',
                  }}
                >
                  Custom
                </button>
                {waterToday > 0 && (
                  <button
                    onClick={() => resetWater()}
                    style={{
                      background: 'none', border: 'none', padding: '5px 8px',
                      fontSize: 11, color: 'var(--text-3)', cursor: 'pointer',
                      fontFamily: 'var(--font)',
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
              {showCustomWater && (
                <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
                  <input
                    type="number"
                    value={customWaterMl}
                    onChange={e => setCustomWaterMl(e.target.value)}
                    placeholder="Amount in ml"
                    style={{
                      flex: 1, border: '1px solid var(--border)', background: 'var(--surface-2)',
                      borderRadius: 12, padding: '8px 10px', color: 'var(--text-1)',
                      fontFamily: 'var(--font)', fontSize: 13,
                    }}
                  />
                  <button
                    onClick={() => {
                      const ml = Number(customWaterMl)
                      if (ml > 0) { addWater(ml); setCustomWaterMl(''); setShowCustomWater(false) }
                    }}
                    style={{
                      background: 'var(--blue)', border: 'none', borderRadius: 12,
                      padding: '8px 16px', fontSize: 12, fontWeight: 700,
                      color: '#fff', cursor: 'pointer', fontFamily: 'var(--font)',
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: waterPct >= 100 ? 'var(--green)' : 'var(--blue)', letterSpacing: '-0.5px', lineHeight: 1 }}>
                {Math.round(waterPct)}%
              </p>
              <p style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 600, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.3px' }}>goal</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Weight progress ── */}
      {weightProgressPct !== null && startWeight && targetWeight && (
        <div className="section">
          <div style={S.sectionHeader}>
            <span className="section-title">Weight Goal</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
              {latestWeight} → {targetWeight} kg
            </span>
          </div>
          <div className="card" style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-3)' }}>Start: {startWeight} kg</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: weightProgressPct >= 100 ? 'var(--green)' : 'var(--blue)' }}>
                {Math.round(weightProgressPct)}% there
              </span>
            </div>
            <div className="progress-track" style={{ height: 8, borderRadius: 6 }}>
              <div className="progress-fill" style={{
                width: `${weightProgressPct}%`,
                background: weightProgressPct >= 100
                  ? 'var(--green)'
                  : 'linear-gradient(90deg, var(--blue), var(--purple))',
                borderRadius: 6,
              }} />
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>
              {Math.abs(Number((latestWeight - targetWeight).toFixed(1)))} kg to go
            </p>
          </div>
        </div>
      )}

      {/* ── This week ── */}
      <div className="section">
        <div style={S.sectionHeader}>
          <span className="section-title">This week</span>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          <div className="card" style={{ padding: 14 }}>
            <p style={S.cardLabel}><TrendingUp size={12} /> Weekly adherence</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--blue)' }}>{weekly.adherence.avgScore}/100</p>
            <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
              {weeklyStreak}/{weekly.range} days under goal · Deficit {weekly.weeklyDeficit >= 0 ? '-' : '+'}{Math.abs(weekly.weeklyDeficit)} kcal
            </p>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <p style={S.cardLabel}><AlertTriangle size={12} /> Tip</p>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.45 }}>
              {isOver
                ? `Over budget — go lean for your last meal. Avoid liquid calories.`
                : `${rescueCalories} kcal left · need ${Math.max((profile?.proteinGoal || 120) - todayProtein, 0)}g more protein`}
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, textTransform: 'capitalize' }}>
              High-risk window: {risk.topWindow}
            </p>
          </div>
          {isSunday && (
            <div className="card" style={{ padding: 14 }}>
              <p style={S.cardLabel}><CalendarCheck2 size={12} /> Sunday check-in</p>
              <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Quick reset: log weight and set one focus for next week.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="Weight (kg)"
                  style={S.input}
                />
                <button className="btn btn-primary" onClick={() => {
                  if (!weightInput) return
                  addWeight(weightInput)
                  setWeightInput('')
                  showToast('Weight logged')
                }}>
                  Save
                </button>
              </div>
              {trend.delta !== null && (
                <p style={{ fontSize: 11, color: trend.delta <= 0 ? 'var(--green)' : 'var(--red)', marginTop: 6 }}>
                  30d trend: {trend.delta > 0 ? '+' : ''}{trend.delta} kg
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Today's Meals ── */}
      <div className="section">
        <div style={S.sectionHeader}>
          <span className="section-title">Today's Meals</span>
          {todayMeals.length > 0 && (
            <span style={{ fontSize: 13, color: 'var(--text-3)' }}>{todayCalories} kcal</span>
          )}
        </div>

        {todayMeals.length === 0 ? (
          <div className="empty">
            <div className="empty-icon"><Utensils size={24} /></div>
            <p>Nothing logged yet.<br />Tap + to add a meal.</p>
          </div>
        ) : (
          <div className="grouped-card">
            {[...todayMeals].reverse().map((meal, i) => {
              const t = meal.time ? new Date(meal.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''
              return (
                <div key={meal.id} className="grouped-item">
                  <div className="grouped-item-icon" style={{ background: 'var(--surface-3)', fontSize: 18 }}>
                    <MealTypeIcon type={meal.type} size={18} color="var(--text-2)" />
                  </div>
                  <div className="grouped-item-body">
                    <p className="grouped-item-title">{meal.name}</p>
                    <p className="grouped-item-sub">
                      {[t, meal.type, meal.protein > 0 && `P ${meal.protein}g`].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', flexShrink: 0 }}>
                    {meal.calories}
                  </span>
                  <button className="btn-icon" style={{ marginLeft: 4 }}
                    onClick={() => { deleteMeal(meal.id); showToast('Removed', 'error') }}>
                    <X size={14} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* FAB */}
      <button onClick={() => setShowAdd(true)} style={S.fab}>
        <Plus size={22} strokeWidth={2.6} />
      </button>

      {showAdd && <QuickAddModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}

const S = {
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: '0 4px',
  },
  fab: {
    position: 'fixed',
    right: 20,
    bottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 20px) + 14px)',
    width: 52, height: 52,
    borderRadius: 26,
    background: 'var(--green)',
    color: '#000', border: 'none',
    fontSize: 24, fontWeight: 700,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 10px 22px rgba(10,132,255,0.22)',
    zIndex: 50,
    transition: 'transform 180ms',
  },
  cardLabel: {
    fontSize: 10,
    color: 'var(--text-3)',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  input: {
    flex: 1,
    border: '1px solid var(--border)',
    background: 'var(--surface-2)',
    borderRadius: 12,
    padding: '9px 10px',
    color: 'var(--text-1)',
  },
}
