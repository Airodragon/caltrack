import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { greetingByTime, todayKey } from '../utils/helpers'
import QuickAddModal from '../components/QuickAddModal'

export default function Dashboard() {
  const {
    profile, todayMeals, todayCalories, todayProtein, todayCarbs, todayFat,
    habitsDoneCount, habitsTotal, deleteMeal, showToast,
  } = useApp()

  const [showAdd, setShowAdd] = useState(false)

  const goal = profile?.calorieGoal || 2000
  const remaining = goal - todayCalories
  const isOver = remaining < 0
  const pct = Math.min((todayCalories / goal) * 100, 100)

  // Activity ring params
  const R = 70
  const C = 2 * Math.PI * R
  const offset = C * (1 - pct / 100)

  const habitPct = habitsTotal > 0 ? (habitsDoneCount / habitsTotal) * 100 : 0
  const ROUT = 22
  const cout = 2 * Math.PI * ROUT

  const macros = [
    { label: 'Protein', val: todayProtein, goal: profile?.proteinGoal || 0, color: 'var(--blue)' },
    { label: 'Carbs', val: todayCarbs, goal: profile?.carbsGoal || 0, color: 'var(--orange)' },
    { label: 'Fat', val: todayFat, goal: profile?.fatGoal || 0, color: 'var(--red)' },
  ]

  const firstName = profile?.name?.split(' ')[0] || ''

  return (
    <div className="page">
      {/* ── Header ── */}
      <div style={{ padding: 'calc(env(safe-area-inset-top, 44px) + 8px) 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="shimmer-text" style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.6px', marginTop: 2, display: 'inline-block' }}>
            {greetingByTime()}, {firstName}
          </h1>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          style={{
            width: 36, height: 36, borderRadius: 18,
            background: 'var(--green)', border: 'none',
            color: '#000', fontSize: 20, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 'calc(env(safe-area-inset-top, 44px) + 8px - 4px)',
            flexShrink: 0,
          }}
        >+</button>
      </div>

      {/* ── Activity Ring Card ── */}
      <div className="section">
        <div className="card glow-card" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width={168} height={168} style={{ transform: 'rotate(-90deg)' }}>
              {/* Outer: Calories */}
              <circle cx={84} cy={84} r={R} fill="none" stroke="var(--surface-3)" strokeWidth={12} />
              <circle cx={84} cy={84} r={R} fill="none"
                stroke={isOver ? 'var(--red)' : 'var(--green)'}
                strokeWidth={12} strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 900ms var(--ease-out)' }}
              />
              {/* Inner: Habits */}
              <circle cx={84} cy={84} r={ROUT + 20} fill="none" stroke="var(--surface-3)" strokeWidth={8} />
              <circle cx={84} cy={84} r={ROUT + 20} fill="none"
                stroke="var(--purple)"
                strokeWidth={8} strokeLinecap="round"
                strokeDasharray={2 * Math.PI * (ROUT + 20)}
                strokeDashoffset={2 * Math.PI * (ROUT + 20) * (1 - habitPct / 100)}
                style={{ transition: 'stroke-dashoffset 900ms var(--ease-out)' }}
              />
            </svg>
            {/* Center */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: isOver ? 'var(--red)' : 'var(--text-1)', lineHeight: 1 }}>
                {todayCalories.toLocaleString()}
              </span>
              <span style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'uppercase', marginTop: 2 }}>
                kcal
              </span>
            </div>
          </div>

          {/* Legend */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: isOver ? 'var(--red)' : 'var(--green)' }} />
                <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase' }}>Calories</span>
              </div>
              <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', color: isOver ? 'var(--red)' : 'var(--text-1)', lineHeight: 1 }}>
                {isOver ? '+' : ''}{Math.abs(remaining).toLocaleString()}
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>
                {isOver ? 'over goal' : 'remaining'} · {goal.toLocaleString()} total
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: 'var(--purple)' }} />
                <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase' }}>Routine</span>
              </div>
              <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1 }}>
                {habitsDoneCount}<span style={{ fontSize: 14, color: 'var(--text-3)', fontWeight: 400 }}>/{habitsTotal}</span>
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>habits done today</p>
            </div>
          </div>
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
            <div className="empty-icon">🍽️</div>
            <p>Nothing logged yet.<br />Tap + to add a meal.</p>
          </div>
        ) : (
          <div className="grouped-card">
            {[...todayMeals].reverse().map((meal, i) => {
              const t = meal.time ? new Date(meal.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''
              return (
                <div key={meal.id} className="grouped-item">
                  <div className="grouped-item-icon" style={{ background: 'var(--surface-3)', fontSize: 18 }}>
                    {mealEmoji(meal.type)}
                  </div>
                  <div className="grouped-item-body">
                    <p className="grouped-item-title">{meal.name}</p>
                    <p className="grouped-item-sub">
                      {t && `${t} · `}{meal.type}
                      {meal.protein > 0 && ` · P ${meal.protein}g`}
                      {meal.carbs > 0 && ` C ${meal.carbs}g`}
                      {meal.fat > 0 && ` F ${meal.fat}g`}
                    </p>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', flexShrink: 0 }}>
                    {meal.calories}
                  </span>
                  <button className="btn-icon" style={{ marginLeft: 4 }}
                    onClick={() => { deleteMeal(meal.id); showToast('Removed', 'error') }}>
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* FAB */}
      <button onClick={() => setShowAdd(true)} style={S.fab}>+</button>

      {showAdd && <QuickAddModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}

const mealEmoji = (type) => ({ Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙', Snack: '🍎' })[type] || '🍴'

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
    bottom: 'calc(var(--nav-height) + env(safe-area-inset-bottom, 20px) + 16px)',
    width: 52, height: 52,
    borderRadius: 26,
    background: 'var(--green)',
    color: '#000', border: 'none',
    fontSize: 24, fontWeight: 700,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(48,209,88,0.35)',
    zIndex: 50,
    transition: 'transform 180ms',
  },
}
