import React, { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import QuickAddModal from '../components/QuickAddModal'
import { MEAL_TYPES } from '../utils/helpers'
import SkeletonBlock from '../components/SkeletonBlock'
import { Plus, Utensils, X } from 'lucide-react'
import { MealTypeIcon } from '../components/AppIcon'

export default function Calories() {
  const { profile, todayMeals, todayCalories, todayProtein, todayCarbs, todayFat, deleteMeal, showToast } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [])

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
          {loading ? (
            <div style={{ display: 'grid', gap: 10 }}>
              <SkeletonBlock height={46} />
              <SkeletonBlock height={12} />
              <SkeletonBlock height={92} />
            </div>
          ) : (
            <>
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

          {/* Macros row — arc rings */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {macros.map(m => {
              const pct = m.goal > 0 ? Math.min((m.val / m.goal) * 100, 100) : 0
              const R = 26, STROKE = 4
              const circ = 2 * Math.PI * R
              const dashOffset = circ * (1 - pct / 100)
              return (
                <div key={m.label} style={{ flex: 1, background: 'var(--surface-3)', borderRadius: 14, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ position: 'relative', width: 62, height: 62 }}>
                    <svg width={62} height={62} style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx={31} cy={31} r={R} fill="none" stroke="var(--surface-2)" strokeWidth={STROKE} />
                      <circle cx={31} cy={31} r={R} fill="none"
                        stroke={m.color} strokeWidth={STROKE} strokeLinecap="round"
                        strokeDasharray={circ} strokeDashoffset={dashOffset}
                        style={{ transition: 'stroke-dashoffset 700ms ease-out' }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: m.color, lineHeight: 1, letterSpacing: '-0.3px' }}>{m.val}</span>
                      <span style={{ fontSize: 8, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.2px' }}>g</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                    {m.label}
                  </p>
                  {m.goal > 0 && (
                    <p style={{ fontSize: 9, color: 'var(--text-4)' }}>{Math.round(pct)}% of {m.goal}g</p>
                  )}
                </div>
              )
            })}
          </div>
            </>
          )}
        </div>
      </div>

      {/* Filter chips */}
      <div className="chips" style={{ marginBottom: 16 }}>
        {['All', ...MEAL_TYPES].map(t => (
          <button key={t} className={`chip ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
            {t !== 'All' && (
              <span style={{ display: 'inline-flex', marginRight: 6, verticalAlign: 'middle' }}>
                <MealTypeIcon type={t} size={14} />
              </span>
            )}
            {t}
          </button>
        ))}
      </div>

      {/* Meals */}
      <div className="section">
        {todayMeals.length === 0 ? (
          <div className="empty">
            <div className="empty-icon"><Utensils size={24} /></div>
            <p>Nothing logged today.<br />Tap the button below to add a meal.</p>
          </div>
        ) : filter === 'All' ? (
          MEAL_TYPES.map(type => {
            const meals = byType[type]
            if (!meals.length) return null
            const typeTotal = meals.reduce((s, m) => s + (m.calories || 0) * (m.multiplier || 1), 0)
            return (
              <div key={type} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 4px' }}>
                  <span className="section-title" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                    <MealTypeIcon type={type} size={13} />
                    {type}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{Math.round(typeTotal)} kcal</span>
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
          <Plus size={16} />
          Log Meal
        </button>
      </div>

      {showAdd && <QuickAddModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}

function MealRow({ meal, onDelete }) {
  const time = meal.time ? new Date(meal.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''
  const multiplier = Number(meal.multiplier) > 0 ? Number(meal.multiplier) : 1
  const totalCalories = Math.round((meal.calories || 0) * multiplier)
  const subParts = [
    time,
    multiplier > 1 && `×${multiplier}`,
    meal.protein > 0 && `P ${meal.protein}g`,
    meal.carbs > 0 && `C ${meal.carbs}g`,
    meal.fat > 0 && `F ${meal.fat}g`,
  ].filter(Boolean)

  return (
    <div className="grouped-item">
      <div className="grouped-item-icon" style={{ background: 'var(--surface-3)' }}>
        <MealTypeIcon type={meal.type} size={16} color="var(--text-3)" />
      </div>
      <div className="grouped-item-body">
        <p className="grouped-item-title">{meal.name}</p>
        <p className="grouped-item-sub">{subParts.join(' · ')}</p>
      </div>
      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', flexShrink: 0 }}>{totalCalories}</span>
      <button className="btn-icon" onClick={onDelete}><X size={14} /></button>
    </div>
  )
}
