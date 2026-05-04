import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import QuickAddModal from '../components/QuickAddModal'
import { MEAL_TYPES, todayKey } from '../utils/helpers'

const MEAL_EMOJI = { Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙', Snack: '🍎' }

export default function Calories() {
  const { profile, todayMeals, todayCalories, todayProtein, todayCarbs, todayFat, deleteMeal, showToast } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [filter, setFilter] = useState('All')

  const goal = profile?.calorieGoal || 2000
  const remaining = goal - todayCalories
  const isOver = remaining < 0
  const pct = Math.min((todayCalories / goal) * 100, 100)

  const visible = filter === 'All' ? todayMeals : todayMeals.filter(m => m.type === filter)
  const byType = MEAL_TYPES.reduce((acc, t) => ({ ...acc, [t]: todayMeals.filter(m => m.type === t) }), {})

  const macros = [
    { label: 'Protein', val: todayProtein, goal: profile?.proteinGoal || 0, color: 'var(--blue)' },
    { label: 'Carbs', val: todayCarbs, goal: profile?.carbsGoal || 0, color: 'var(--orange)' },
    { label: 'Fat', val: todayFat, goal: profile?.fatGoal || 0, color: 'var(--red)' },
  ]

  return (
    <div className="page">
      {/* Header */}
      <div style={{ padding: 'calc(env(safe-area-inset-top,44px) + 8px) 20px 16px' }}>
        <p className="page-subtitle">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        <h1 className="page-title shimmer-text" style={{ display: 'inline-block' }}>Calories</h1>
      </div>

      {/* Main summary */}
      <div className="section">
        <div className="card glow-card">
          {/* Big number */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-2px', lineHeight: 1, color: isOver ? 'var(--red)' : 'var(--text-1)' }}>
                {todayCalories.toLocaleString()}
              </span>
              <span style={{ fontSize: 16, color: 'var(--text-3)', marginLeft: 4 }}>kcal</span>
            </div>
            <div style={{ textAlign: 'right', paddingBottom: 4 }}>
              <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Goal</p>
              <p style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.5px' }}>{goal.toLocaleString()}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="progress-track" style={{ height: 6, marginBottom: 10 }}>
            <div className="progress-fill" style={{
              width: `${pct}%`,
              background: isOver
                ? 'linear-gradient(90deg, var(--orange), var(--red))'
                : 'linear-gradient(90deg, var(--green), #78FFD6)',
            }} />
          </div>

          <p style={{ fontSize: 13, fontWeight: 600, color: isOver ? 'var(--red)' : 'var(--green)', textAlign: 'center' }}>
            {isOver
              ? `${Math.abs(remaining).toLocaleString()} kcal over budget`
              : `${remaining.toLocaleString()} kcal to go`}
          </p>

          {/* Macros row */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {macros.map(m => {
              const p = m.goal > 0 ? Math.min((m.val / m.goal) * 100, 100) : 0
              return (
                <div key={m.label} style={{ flex: 1, background: 'var(--surface-3)', borderRadius: 12, padding: '12px 10px' }}>
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
      </div>

      {/* Filter chips */}
      <div className="chips" style={{ marginBottom: 16 }}>
        {['All', ...MEAL_TYPES].map(t => (
          <button key={t} className={`chip ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
            {t !== 'All' && MEAL_EMOJI[t] + ' '}{t}
          </button>
        ))}
      </div>

      {/* Meals */}
      <div className="section">
        {todayMeals.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🍽️</div>
            <p>Nothing logged today.<br />Tap the button below to add a meal.</p>
          </div>
        ) : filter === 'All' ? (
          MEAL_TYPES.map(type => {
            const meals = byType[type]
            if (!meals.length) return null
            const typeTotal = meals.reduce((s, m) => s + m.calories, 0)
            return (
              <div key={type} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 4px' }}>
                  <span className="section-title">{MEAL_EMOJI[type]} {type}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{typeTotal} kcal</span>
                </div>
                <div className="grouped-card">
                  {meals.map(meal => <MealRow key={meal.id} meal={meal} onDelete={() => { deleteMeal(meal.id); showToast('Removed', 'error') }} />)}
                </div>
              </div>
            )
          })
        ) : (
          <div className="grouped-card">
            {visible.length === 0
              ? <div className="empty"><p>No {filter} logged yet</p></div>
              : visible.map(m => <MealRow key={m.id} meal={m} onDelete={() => { deleteMeal(m.id); showToast('Removed', 'error') }} />)
            }
          </div>
        )}

        <button className="btn btn-primary w-full" style={{ marginTop: 16, borderRadius: 'var(--r-xl)' }}
          onClick={() => setShowAdd(true)}>
          + Log Meal
        </button>
      </div>

      {showAdd && <QuickAddModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}

function MealRow({ meal, onDelete }) {
  const time = meal.time ? new Date(meal.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''
  return (
    <div className="grouped-item">
      <div className="grouped-item-body">
        <p className="grouped-item-title">{meal.name}</p>
        <p className="grouped-item-sub">
          {time && `${time}`}
          {meal.protein > 0 && ` · P ${meal.protein}g`}
          {meal.carbs > 0 && ` C ${meal.carbs}g`}
          {meal.fat > 0 && ` F ${meal.fat}g`}
        </p>
      </div>
      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', flexShrink: 0 }}>{meal.calories}</span>
      <button className="btn-icon" onClick={onDelete}>×</button>
    </div>
  )
}
