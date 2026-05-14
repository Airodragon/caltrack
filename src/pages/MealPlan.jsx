import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { MEAL_PLAN_7DAY } from '../utils/helpers'
import {
  ChevronDown, ChevronUp, CheckCircle2, PlusCircle,
  ShoppingCart, Shield, Flame, Dumbbell,
  Wheat, Droplets, AlertTriangle, Moon, Clock, TrendingUp,
} from 'lucide-react'

const TABS = ['Plan', 'Grocery', 'Prep', 'Rules']

// Uses existing CSS dim vars so it works in both light and dark mode
const SLOT_META = {
  morning:     { label: 'Morning',     color: 'var(--orange)', dim: 'var(--orange-dim)' },
  lunch:       { label: 'Lunch',       color: 'var(--green)',  dim: 'var(--green-dim)'  },
  pre_workout: { label: 'Pre-Workout', color: 'var(--blue)',   dim: 'var(--blue-dim)'   },
  dinner:      { label: 'Dinner',      color: 'var(--purple)', dim: 'var(--purple-dim)' },
  night:       { label: 'Night',       color: '#F472B6',       dim: 'rgba(244,114,182,0.12)' },
}

const RULE_ICONS = {
  droplets:        <Droplets size={18} />,
  'alert-triangle': <AlertTriangle size={18} />,
  'cup-soda':      <Droplets size={18} />,
  moon:            <Moon size={18} />,
  'check-circle':  <CheckCircle2 size={18} />,
}

// ── Macro pill ─────────────────────────────────────────────────
function MacroPill({ icon, value, unit, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '4px 9px', borderRadius: 20,
      background: 'var(--surface-3)',
      fontSize: 11, fontWeight: 700,
      color: color || 'var(--text-2)',
    }}>
      {icon && <span style={{ color, display: 'flex' }}>{icon}</span>}
      {value}{unit}
    </span>
  )
}

// ── Meal card ──────────────────────────────────────────────────
function MealCard({ meal, slotKey }) {
  const { logPlanMeal, isPlanMealLogged, showToast, today } = useApp()
  const [showIngredients, setShowIngredients] = useState(false)
  const [showRecipe, setShowRecipe] = useState(false)

  const logged = isPlanMealLogged(slotKey, today)
  const meta = SLOT_META[meal.slot] || SLOT_META.morning

  const handleLog = () => {
    logPlanMeal(meal, slotKey, today)
    if (!logged) showToast(`${meal.name} added to today's log`, 'success')
    else showToast('Removed from today\'s log', 'success')
  }

  return (
    <div style={{
      background: 'var(--surface-2)',
      borderRadius: 18,
      marginBottom: 12,
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
    }}>
      {/* Slot badge row */}
      <div style={{
        background: meta.dim,
        padding: '7px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 800, color: meta.color,
          textTransform: 'uppercase', letterSpacing: '0.7px',
        }}>
          {meta.label}
        </span>
        <span style={{
          fontSize: 11, color: 'var(--text-3)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <Clock size={11} />
          {meal.time}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '13px 14px' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--text-1)', lineHeight: 1.3 }}>
              {meal.name}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-3)' }}>
              {meal.type}
            </p>
          </div>
          <button
            onClick={handleLog}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '7px 14px', borderRadius: 20, border: 'none',
              background: logged ? 'var(--green)' : 'var(--blue)',
              color: '#fff', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'background 200ms, transform 100ms',
            }}
          >
            {logged ? <CheckCircle2 size={13} /> : <PlusCircle size={13} />}
            {logged ? 'Logged' : 'Log Meal'}
          </button>
        </div>

        {/* Macros */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          <MacroPill icon={<Flame size={10} />} value={meal.calories} unit=" kcal" color="var(--orange)" />
          <MacroPill icon={<Dumbbell size={10} />} value={meal.protein} unit="g P" color="var(--blue)" />
          <MacroPill icon={<Wheat size={10} />} value={meal.carbs} unit="g C" color="var(--orange)" />
          <MacroPill value={meal.fat} unit="g F" color="var(--text-3)" />
        </div>

        {/* Ingredients toggle */}
        {meal.ingredients?.length > 0 && (
          <div style={{ borderTop: '1px solid var(--sep)', paddingTop: 9, marginTop: 2 }}>
            <button
              onClick={() => setShowIngredients(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'none', border: 'none', padding: 0,
                cursor: 'pointer', fontSize: 12, fontWeight: 600,
                color: 'var(--text-2)', width: '100%', fontFamily: 'var(--font)',
              }}
            >
              {showIngredients ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              Ingredients ({meal.ingredients.length})
            </button>
            {showIngredients && (
              <ul style={{ margin: '7px 0 0 16px', padding: 0, listStyle: 'disc' }}>
                {meal.ingredients.map((ing, i) => (
                  <li key={i} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 3, lineHeight: 1.4 }}>{ing}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Steps toggle */}
        {meal.recipe?.length > 0 && (
          <div style={{ borderTop: '1px solid var(--sep)', paddingTop: 9, marginTop: 8 }}>
            <button
              onClick={() => setShowRecipe(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'none', border: 'none', padding: 0,
                cursor: 'pointer', fontSize: 12, fontWeight: 600,
                color: 'var(--text-2)', width: '100%', fontFamily: 'var(--font)',
              }}
            >
              {showRecipe ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              How to make
            </button>
            {showRecipe && (
              <ol style={{ margin: '7px 0 0 16px', padding: 0 }}>
                {meal.recipe.map((step, i) => (
                  <li key={i} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 4, lineHeight: 1.5 }}>{step}</li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Plan tab ───────────────────────────────────────────────────
function PlanTab({ selectedDayIndex, setSelectedDayIndex }) {
  const { days } = MEAL_PLAN_7DAY
  const selectedDay = days[selectedDayIndex]
  const todayWeekday = new Date().getDay()
  const todayIndex = (todayWeekday + 6) % 7

  return (
    <div>
      {/* Day pills */}
      <div style={{
        display: 'flex', gap: 8, overflowX: 'auto',
        padding: '4px 20px 14px',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        {days.map((d, i) => {
          const isActive = i === selectedDayIndex
          const isToday = i === todayIndex
          return (
            <button
              key={d.day}
              onClick={() => setSelectedDayIndex(i)}
              style={{
                flexShrink: 0,
                padding: '8px 16px',
                borderRadius: 20,
                border: isActive ? 'none' : `1.5px solid ${isToday ? 'var(--blue)' : 'var(--border)'}`,
                background: isActive ? 'var(--blue)' : 'var(--surface-2)',
                color: isActive ? '#fff' : isToday ? 'var(--blue)' : 'var(--text-2)',
                fontSize: 12,
                fontWeight: isActive || isToday ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'var(--font)',
              }}
            >
              {d.dayShort}
              {isToday && isActive && (
                <span style={{ marginLeft: 4, fontSize: 9, opacity: 0.8 }}>●</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Day summary banner */}
      <div style={{
        margin: '0 20px 16px',
        padding: '14px 18px',
        background: 'var(--surface-2)',
        borderRadius: 18,
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.4px' }}>
            {selectedDay.day}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: selectedDayIndex === todayIndex ? 'var(--blue)' : 'var(--text-3)', fontWeight: 600 }}>
            {selectedDayIndex === todayIndex ? 'Today' : `${selectedDay.meals.length} meals planned`}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--orange)', letterSpacing: '-0.5px' }}>
              {selectedDay.total.calories}
            </p>
            <p style={{ margin: 0, fontSize: 10, color: 'var(--text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>kcal</p>
          </div>
          <div style={{ width: 1, height: 32, background: 'var(--sep)' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--blue)', letterSpacing: '-0.5px' }}>
              {selectedDay.total.protein}g
            </p>
            <p style={{ margin: 0, fontSize: 10, color: 'var(--text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>protein</p>
          </div>
        </div>
      </div>

      {/* Meal cards */}
      <div style={{ padding: '0 20px' }}>
        {selectedDay.meals.map((meal) => (
          <MealCard
            key={`${selectedDay.day}_${meal.slot}`}
            meal={meal}
            slotKey={`${selectedDay.day}_${meal.slot}`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Grocery tab ────────────────────────────────────────────────
function GroceryTab() {
  const { grocery } = MEAL_PLAN_7DAY
  const sections = [
    { label: 'Protein', key: 'protein', color: 'var(--blue)' },
    { label: 'Carbs', key: 'carbs', color: 'var(--orange)' },
    { label: 'Vegetables', key: 'vegetables', color: 'var(--green)' },
    { label: 'Extras & Spices', key: 'extras', color: 'var(--purple)' },
  ]

  return (
    <div style={{ padding: '0 20px' }}>
      {/* Budget banner */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px',
        background: 'var(--green-dim)',
        borderRadius: 18, marginBottom: 22,
        border: '1px solid rgba(35,193,107,0.2)',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: 'var(--text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Weekly Budget</p>
          <p style={{ margin: '3px 0 0', fontSize: 26, fontWeight: 800, color: 'var(--green)', letterSpacing: '-0.8px' }}>₹1200–1400</p>
        </div>
        <ShoppingCart size={32} color="var(--green)" strokeWidth={1.8} />
      </div>

      {sections.map(sec => (
        <div key={sec.key} style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
            <div style={{ width: 3, height: 16, borderRadius: 2, background: sec.color }} />
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {sec.label}
            </p>
          </div>
          <div className="grouped-card">
            {grocery[sec.key].map((item, i) => (
              <div key={i} className="grouped-item" style={{ justifyContent: 'space-between' }}>
                <div className="grouped-item-body">
                  <p className="grouped-item-title" style={{ fontSize: 14 }}>{item.item}</p>
                  <p className="grouped-item-sub">{item.qty}</p>
                </div>
                {item.cost && (
                  <span style={{
                    fontSize: 12, fontWeight: 700, color: 'var(--green)',
                    background: 'var(--green-dim)',
                    padding: '3px 9px', borderRadius: 10, flexShrink: 0,
                  }}>
                    {item.cost}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Prep step card ─────────────────────────────────────────────
function PrepStepCard({ step }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      background: 'var(--surface-2)',
      borderRadius: 18, marginBottom: 12, overflow: 'hidden',
      border: '1px solid var(--border)',
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
          display: 'flex', alignItems: 'center', gap: 12,
          fontFamily: 'var(--font)',
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--blue)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>{step.step}</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{step.title}</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-3)' }}>{step.note}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <span style={{
            fontSize: 11, color: 'var(--blue)', fontWeight: 700,
            background: 'var(--blue-dim)', padding: '4px 9px', borderRadius: 10,
          }}>
            {step.duration}
          </span>
          {open ? <ChevronUp size={16} color="var(--text-3)" /> : <ChevronDown size={16} color="var(--text-3)" />}
        </div>
      </button>

      {open && step.substeps.length > 0 && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--sep)' }}>
          {step.substeps.map((sub, i) => (
            <div key={i} style={{ marginTop: 16, paddingTop: i > 0 ? 14 : 0, borderTop: i > 0 ? '1px solid var(--sep)' : 'none' }}>
              <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>{sub.label}</p>

              <p style={{ margin: '0 0 5px', fontSize: 10, fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Ingredients
              </p>
              <ul style={{ margin: '0 0 10px 16px', padding: 0, listStyle: 'disc' }}>
                {sub.ingredients.map((ing, j) => (
                  <li key={j} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 3 }}>{ing}</li>
                ))}
              </ul>

              <p style={{ margin: '0 0 5px', fontSize: 10, fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Method
              </p>
              <ol style={{ margin: '0 0 0 16px', padding: 0 }}>
                {sub.method.map((m, j) => (
                  <li key={j} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 3 }}>{m}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Prep tab ───────────────────────────────────────────────────
function PrepTab() {
  const { sundayPrep, sauces } = MEAL_PLAN_7DAY

  return (
    <div style={{ padding: '0 20px' }}>
      {/* Banner */}
      <div style={{
        padding: '14px 18px',
        background: 'var(--blue-dim)',
        borderRadius: 18, marginBottom: 20,
        border: '1px solid rgba(59,130,246,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>Sunday Prep Session</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-3)' }}>Batch cook once, eat well all week</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--blue)', borderRadius: 12, padding: '7px 11px' }}>
          <Clock size={13} color="#fff" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>2–2.5 hrs</span>
        </div>
      </div>

      {sundayPrep.map(step => <PrepStepCard key={step.step} step={step} />)}

      {/* Sauce section */}
      <div style={{ marginTop: 22, marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: '#F472B6' }} />
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Low-Calorie Sauces
          </p>
        </div>
        <div className="grouped-card">
          {sauces.map((sauce, i) => (
            <div key={i} className="grouped-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
              <p className="grouped-item-title" style={{ fontSize: 14 }}>{sauce.name}</p>
              <p className="grouped-item-sub">{sauce.ingredients.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Rules tab ──────────────────────────────────────────────────
function RulesTab() {
  const { rules, supplementTiming, expectedResults } = MEAL_PLAN_7DAY

  return (
    <div style={{ padding: '0 20px' }}>
      {/* Fat loss rules */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--red)' }} />
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Fat Loss Rules
          </p>
        </div>

        {rules.map((rule, i) => (
          <div key={i} style={{
            background: 'var(--surface-2)',
            borderRadius: 16, padding: '14px 16px', marginBottom: 10,
            border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: rule.avoid.length || rule.carry.length ? 12 : 0 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'var(--surface-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--blue)', flexShrink: 0,
              }}>
                {RULE_ICONS[rule.icon] || <Shield size={16} />}
              </div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{rule.title}</p>
            </div>

            {rule.avoid.length > 0 && (
              <div style={{ marginBottom: rule.carry.length ? 10 : 0 }}>
                <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Avoid
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {rule.avoid.map((item, j) => (
                    <span key={j} style={{
                      fontSize: 12, padding: '4px 10px', borderRadius: 20,
                      background: 'var(--red-dim)', color: 'var(--red)', fontWeight: 600,
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {rule.carry.length > 0 && (
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 800, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Carry Instead
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {rule.carry.map((item, j) => (
                    <span key={j} style={{
                      fontSize: 12, padding: '4px 10px', borderRadius: 20,
                      background: 'var(--green-dim)', color: 'var(--green)', fontWeight: 600,
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Supplements */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--blue)' }} />
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Supplement Timing
          </p>
        </div>
        <div className="grouped-card">
          {supplementTiming.map((row, i) => (
            <div key={i} className="grouped-item" style={{ justifyContent: 'space-between' }}>
              <div className="grouped-item-body">
                <p className="grouped-item-title" style={{ fontSize: 14 }}>{row.supplement}</p>
              </div>
              <span style={{
                fontSize: 12, fontWeight: 700, color: 'var(--blue)',
                background: 'var(--blue-dim)', padding: '4px 10px', borderRadius: 10,
              }}>
                {row.timing}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expected results timeline */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--green)' }} />
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Expected Results
          </p>
        </div>
        <div style={{ position: 'relative', paddingLeft: 4 }}>
          <div style={{
            position: 'absolute', left: 17, top: 18, bottom: 18,
            width: 2, background: 'var(--sep)', borderRadius: 1,
          }} />
          {expectedResults.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--green)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, zIndex: 1, position: 'relative',
              }}>
                <TrendingUp size={14} color="#fff" />
              </div>
              <div style={{
                background: 'var(--surface-2)', borderRadius: 14,
                padding: '10px 14px', flex: 1, border: '1px solid var(--border)',
              }}>
                <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 800, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {item.timeline}
                </p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
                  {item.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Golden rule banner */}
      <div style={{
        padding: '18px 20px',
        background: 'linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%)',
        borderRadius: 18, marginBottom: 24, textAlign: 'center',
      }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          Golden Rule
        </p>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.55 }}>
          Every meal = Protein + Controlled Carbs + Vegetables
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
          That consistency will transform your physique.
        </p>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────
export default function MealPlan() {
  const [activeTab, setActiveTab] = useState(0)
  const todayWeekday = new Date().getDay()
  const [selectedDayIndex, setSelectedDayIndex] = useState((todayWeekday + 6) % 7)

  const { meta } = MEAL_PLAN_7DAY

  return (
    <div className="page">
      {/* Header */}
      <div style={{ padding: 'calc(env(safe-area-inset-top,44px) + 8px) 20px 0' }}>
        <p className="page-subtitle">{meta.goal}</p>
        <h1 className="page-title shimmer-text" style={{ display: 'inline-block' }}>Meal Plan</h1>

        {/* Meta chips */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {[
            { label: meta.calories, color: 'var(--orange)', bg: 'var(--orange-dim)' },
            { label: meta.protein,  color: 'var(--blue)',   bg: 'var(--blue-dim)'   },
            { label: meta.budget,   color: 'var(--green)',  bg: 'var(--green-dim)'  },
          ].map((chip, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 700, padding: '5px 11px',
              borderRadius: 20, background: chip.bg, color: chip.color,
            }}>
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* Sticky tab bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'var(--bg)', borderBottom: '1px solid var(--sep)',
        marginTop: 18,
      }}>
        <div style={{ display: 'flex', padding: '0 20px' }}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                flex: 1, padding: '12px 0',
                background: 'none', border: 'none',
                cursor: 'pointer', fontSize: 13,
                fontWeight: activeTab === i ? 700 : 500,
                color: activeTab === i ? 'var(--blue)' : 'var(--text-3)',
                borderBottom: `2px solid ${activeTab === i ? 'var(--blue)' : 'transparent'}`,
                transition: 'color 150ms',
                fontFamily: 'var(--font)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: 16 }}>
        {activeTab === 0 && <PlanTab selectedDayIndex={selectedDayIndex} setSelectedDayIndex={setSelectedDayIndex} />}
        {activeTab === 1 && <GroceryTab />}
        {activeTab === 2 && <PrepTab />}
        {activeTab === 3 && <RulesTab />}
      </div>
    </div>
  )
}
