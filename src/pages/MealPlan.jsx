import React, { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { MEAL_PLAN_7DAY } from '../utils/helpers'
import {
  ChevronDown, ChevronUp, CheckCircle2, PlusCircle,
  ShoppingCart, ClipboardList, Shield, Flame, Dumbbell,
  Wheat, Droplets, AlertTriangle, Moon, Clock, TrendingUp,
  ChevronRight, Utensils,
} from 'lucide-react'

const TABS = ['Plan', 'Grocery', 'Prep', 'Rules']

const SLOT_META = {
  morning:     { label: 'Morning',     color: '#FBBF24', bg: '#FFF9E6' },
  lunch:       { label: 'Lunch',       color: '#34D399', bg: '#E6FAF4' },
  pre_workout: { label: 'Pre-Workout', color: '#60A5FA', bg: '#E8F3FF' },
  dinner:      { label: 'Dinner',      color: '#A78BFA', bg: '#F0EBFF' },
  night:       { label: 'Night',       color: '#F472B6', bg: '#FFF0F7' },
}

const RULE_ICONS = {
  droplets: <Droplets size={18} />,
  'alert-triangle': <AlertTriangle size={18} />,
  'cup-soda': <Droplets size={18} />,
  moon: <Moon size={18} />,
  'check-circle': <CheckCircle2 size={18} />,
}

function MacroPill({ icon, value, unit, color }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '3px 8px', borderRadius: 20, background: 'var(--bg-2)', fontSize: 11, fontWeight: 600, color: color || 'var(--text-2)' }}>
      {icon && <span style={{ color }}>{icon}</span>}
      {value}{unit}
    </span>
  )
}

function MealCard({ meal, slotKey, date }) {
  const { logPlanMeal, isPlanMealLogged, showToast, today } = useApp()
  const [showIngredients, setShowIngredients] = useState(false)
  const [showRecipe, setShowRecipe] = useState(false)

  const isToday = date === today
  const logged = isPlanMealLogged(slotKey, date)
  const meta = SLOT_META[meal.slot] || SLOT_META.morning

  const handleLog = () => {
    if (!isToday) {
      showToast('You can only log meals for today', 'error')
      return
    }
    logPlanMeal(meal, slotKey, date)
    if (!logged) showToast(`${meal.name} added to today's log`, 'success')
    else showToast(`Removed from today's log`, 'success')
  }

  return (
    <div style={{ background: 'var(--bg-1)', borderRadius: 16, marginBottom: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Slot label bar */}
      <div style={{ background: meta.bg, padding: '6px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {meta.label}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={11} />
          {meal.time}
        </span>
      </div>

      {/* Main content */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--text-1)', lineHeight: 1.3 }}>{meal.name}</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-3)' }}>{meal.type}</p>
          </div>
          <button
            onClick={handleLog}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 12px', borderRadius: 20, border: 'none',
              background: logged ? 'var(--green)' : 'var(--blue)',
              color: '#fff', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              opacity: isToday ? 1 : 0.45,
            }}
          >
            {logged ? <CheckCircle2 size={13} /> : <PlusCircle size={13} />}
            {logged ? 'Logged' : 'Log'}
          </button>
        </div>

        {/* Macro pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          <MacroPill icon={<Flame size={10} />} value={meal.calories} unit=" kcal" color="#F97316" />
          <MacroPill icon={<Dumbbell size={10} />} value={meal.protein} unit="g P" color="#60A5FA" />
          <MacroPill icon={<Wheat size={10} />} value={meal.carbs} unit="g C" color="#FBBF24" />
          <MacroPill value={meal.fat} unit="g F" color="var(--text-3)" />
        </div>

        {/* Collapsible sections */}
        {meal.ingredients && meal.ingredients.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 4 }}>
            <button
              onClick={() => setShowIngredients(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', width: '100%' }}
            >
              {showIngredients ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              Ingredients
            </button>
            {showIngredients && (
              <ul style={{ margin: '6px 0 0 16px', padding: 0, listStyle: 'disc' }}>
                {meal.ingredients.map((ing, i) => (
                  <li key={i} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 2 }}>{ing}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {meal.recipe && meal.recipe.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 8 }}>
            <button
              onClick={() => setShowRecipe(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', width: '100%' }}
            >
              {showRecipe ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              How to make
            </button>
            {showRecipe && (
              <ol style={{ margin: '6px 0 0 16px', padding: 0 }}>
                {meal.recipe.map((step, i) => (
                  <li key={i} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 4 }}>{step}</li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function PlanTab({ selectedDayIndex, setSelectedDayIndex }) {
  const { today } = useApp()
  const { days } = MEAL_PLAN_7DAY

  const selectedDay = days[selectedDayIndex]
  const todayWeekday = new Date().getDay()
  // 0=Sun, convert to Mon=0 index
  const todayIndex = (todayWeekday + 6) % 7

  return (
    <div>
      {/* Day selector pills */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 20px 12px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {days.map((d, i) => {
          const isActive = i === selectedDayIndex
          const isToday = i === todayIndex
          return (
            <button
              key={d.day}
              onClick={() => setSelectedDayIndex(i)}
              style={{
                flexShrink: 0,
                padding: '8px 14px',
                borderRadius: 20,
                border: isActive ? 'none' : '1px solid var(--border)',
                background: isActive ? 'var(--blue)' : 'var(--bg-1)',
                color: isActive ? '#fff' : isToday ? 'var(--blue)' : 'var(--text-2)',
                fontSize: 12,
                fontWeight: isActive || isToday ? 700 : 500,
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {d.dayShort}
              {isToday && !isActive && (
                <span style={{ position: 'absolute', top: 4, right: 4, width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)' }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Day summary */}
      <div style={{ margin: '0 20px 16px', padding: '12px 16px', background: 'var(--bg-2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--text-1)' }}>{selectedDay.day}</p>
          {selectedDayIndex === todayIndex && (
            <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--blue)', fontWeight: 600 }}>Today</p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#F97316' }}>{selectedDay.total.calories}</p>
            <p style={{ margin: 0, fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>kcal</p>
          </div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#60A5FA' }}>{selectedDay.total.protein}g</p>
            <p style={{ margin: 0, fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>protein</p>
          </div>
        </div>
      </div>

      {/* Meal cards */}
      <div style={{ padding: '0 20px' }}>
        {selectedDay.meals.map((meal) => {
          const slotKey = `${selectedDay.day}_${meal.slot}`
          return (
            <MealCard
              key={slotKey}
              meal={meal}
              slotKey={slotKey}
              date={today}
            />
          )
        })}
      </div>
    </div>
  )
}

function GroceryTab() {
  const { grocery } = MEAL_PLAN_7DAY
  const sections = [
    { label: 'Protein', key: 'protein', color: '#60A5FA' },
    { label: 'Carbs', key: 'carbs', color: '#FBBF24' },
    { label: 'Vegetables', key: 'vegetables', color: '#34D399' },
    { label: 'Extras & Spices', key: 'extras', color: '#F472B6' },
  ]

  const totalCost = '₹1200–₹1400'

  return (
    <div style={{ padding: '0 20px' }}>
      {/* Budget chip */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-2)', borderRadius: 14, marginBottom: 20 }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>Weekly Budget</p>
          <p style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 800, color: 'var(--green)' }}>{totalCost}</p>
        </div>
        <ShoppingCart size={28} color="var(--green)" />
      </div>

      {sections.map(sec => (
        <div key={sec.key} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 4, height: 18, borderRadius: 2, background: sec.color }} />
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{sec.label}</p>
          </div>
          <div className="grouped-card">
            {grocery[sec.key].map((item, i) => (
              <div key={i} className="grouped-item" style={{ justifyContent: 'space-between' }}>
                <div className="grouped-item-body">
                  <p className="grouped-item-title">{item.item}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--text-3)' }}>{item.qty}</p>
                </div>
                {item.cost && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', flexShrink: 0 }}>{item.cost}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function PrepStep({ step }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ background: 'var(--bg-1)', borderRadius: 16, marginBottom: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: '100%', background: 'none', border: 'none', padding: '14px 16px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}
      >
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>{step.step}</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{step.title}</p>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-3)' }}>{step.note}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 600, background: 'var(--bg-2)', padding: '3px 8px', borderRadius: 10 }}>
            {step.duration}
          </span>
          {open ? <ChevronUp size={16} color="var(--text-3)" /> : <ChevronDown size={16} color="var(--text-3)" />}
        </div>
      </button>

      {open && step.substeps.length > 0 && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border)' }}>
          {step.substeps.map((sub, i) => (
            <div key={i} style={{ marginTop: 14 }}>
              <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>{sub.label}</p>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Ingredients</p>
              <ul style={{ margin: '0 0 8px 16px', padding: 0, listStyle: 'disc' }}>
                {sub.ingredients.map((ing, j) => (
                  <li key={j} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 2 }}>{ing}</li>
                ))}
              </ul>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Method</p>
              <ol style={{ margin: '0 0 0 16px', padding: 0 }}>
                {sub.method.map((step, j) => (
                  <li key={j} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 2 }}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PrepTab() {
  const { sundayPrep } = MEAL_PLAN_7DAY
  const totalTime = '2–2.5 hours'

  return (
    <div style={{ padding: '0 20px' }}>
      {/* Header chip */}
      <div style={{ padding: '12px 16px', background: 'var(--bg-2)', borderRadius: 14, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>Sunday Prep Session</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-3)' }}>Batch cook for the full week</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--blue)', borderRadius: 10, padding: '6px 10px' }}>
          <Clock size={13} color="#fff" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{totalTime}</span>
        </div>
      </div>

      {sundayPrep.map(step => (
        <PrepStep key={step.step} step={step} />
      ))}

      {/* Sauce recipes */}
      <div style={{ marginTop: 20, marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 4, height: 18, borderRadius: 2, background: '#F472B6' }} />
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>Low-Calorie Sauces</p>
        </div>
        <div className="grouped-card">
          {MEAL_PLAN_7DAY.sauces.map((sauce, i) => (
            <div key={i} className="grouped-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: 'var(--text-1)' }}>{sauce.name}</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-3)' }}>{sauce.ingredients.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RulesTab() {
  const { rules, supplementTiming, expectedResults } = MEAL_PLAN_7DAY

  return (
    <div style={{ padding: '0 20px' }}>
      {/* Fat loss rules */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 4, height: 18, borderRadius: 2, background: 'var(--red)' }} />
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>Fat Loss Rules</p>
        </div>

        {rules.map((rule, i) => (
          <div key={i} style={{ background: 'var(--bg-1)', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: rule.avoid.length || rule.carry.length ? 10 : 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', flexShrink: 0 }}>
                {RULE_ICONS[rule.icon] || <Shield size={16} />}
              </div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{rule.title}</p>
            </div>

            {rule.avoid.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Avoid</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {rule.avoid.map((item, j) => (
                    <span key={j} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: '#FEE2E2', color: 'var(--red)', fontWeight: 500 }}>{item}</span>
                  ))}
                </div>
              </div>
            )}

            {rule.carry.length > 0 && (
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Carry Instead</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {rule.carry.map((item, j) => (
                    <span key={j} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: '#D1FAE5', color: 'var(--green)', fontWeight: 500 }}>{item}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Supplement timing */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 4, height: 18, borderRadius: 2, background: 'var(--blue)' }} />
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>Supplement Timing</p>
        </div>
        <div className="grouped-card">
          {supplementTiming.map((row, i) => (
            <div key={i} className="grouped-item" style={{ justifyContent: 'space-between' }}>
              <div className="grouped-item-body">
                <p className="grouped-item-title">{row.supplement}</p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)' }}>{row.timing}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expected results timeline */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 4, height: 18, borderRadius: 2, background: 'var(--green)' }} />
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>Expected Results</p>
        </div>
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 15, top: 16, bottom: 16, width: 2, background: 'var(--border)', borderRadius: 1 }} />
          {expectedResults.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, position: 'relative' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                <TrendingUp size={14} color="#fff" />
              </div>
              <div style={{ background: 'var(--bg-1)', borderRadius: 12, padding: '10px 14px', flex: 1, border: '1px solid var(--border)' }}>
                <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{item.timeline}</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{item.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational rule */}
      <div style={{ padding: '16px', background: 'linear-gradient(135deg, var(--blue) 0%, #8B5CF6 100%)', borderRadius: 16, marginBottom: 24, textAlign: 'center' }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Golden Rule</p>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.5 }}>Every meal = Protein + Controlled Carbs + Vegetables</p>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>That consistency is what will transform your physique.</p>
      </div>
    </div>
  )
}

export default function MealPlan() {
  const [activeTab, setActiveTab] = useState(0)
  const todayWeekday = new Date().getDay()
  const defaultDayIndex = (todayWeekday + 6) % 7
  const [selectedDayIndex, setSelectedDayIndex] = useState(defaultDayIndex)

  const { meta } = MEAL_PLAN_7DAY

  return (
    <div className="page" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: 'calc(env(safe-area-inset-top,44px) + 8px) 20px 0' }}>
        <p className="page-subtitle">{meta.goal}</p>
        <h1 className="page-title shimmer-text" style={{ display: 'inline-block' }}>Meal Plan</h1>

        {/* Plan meta chips */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {[
            { label: meta.calories, color: '#F97316' },
            { label: meta.protein, color: '#60A5FA' },
            { label: meta.budget, color: '#34D399' },
          ].map((chip, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: 'var(--bg-2)', color: chip.color }}>
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* Sticky tab bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg-0)', borderBottom: '1px solid var(--border)', marginTop: 16 }}>
        <div style={{ display: 'flex', padding: '0 20px' }}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                flex: 1,
                padding: '12px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: activeTab === i ? 700 : 500,
                color: activeTab === i ? 'var(--blue)' : 'var(--text-3)',
                borderBottom: activeTab === i ? '2px solid var(--blue)' : '2px solid transparent',
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
