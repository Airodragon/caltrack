import React, { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import { todayKey, toLocalDateKey } from '../utils/helpers'
import SkeletonBlock from '../components/SkeletonBlock'

const DAYS_BACK = 7
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const HABIT_ICONS = ['💧', '🚶', '😴', '🧘', '📵', '🏋️', '📚', '🥗', '🏃', '🎯', '💊', '🫁', '🪥', '☀️', '🛁']
const HABIT_COLORS = ['#30D158', '#0A84FF', '#BF5AF2', '#FF375F', '#FF9F0A', '#64D2FF', '#FFD60A']

function buildWeekDays() {
  const days = []
  for (let i = DAYS_BACK - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({
      date: toLocalDateKey(d),
      dayNum: d.getDate(),
      dayName: SHORT_DAYS[d.getDay()],
    })
  }
  return days
}

export default function Routine() {
  const { habits, habitLogs, toggleHabit, addHabit, deleteHabit, showToast } = useApp()
  const [selectedDate, setSelectedDate] = useState(todayKey())
  const [showForm, setShowForm] = useState(false)
  const [habitName, setHabitName] = useState('')
  const [icon, setIcon] = useState('🎯')
  const [color, setColor] = useState('#30D158')
  const [confirmDel, setConfirmDel] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [])

  const weekDays = buildWeekDays()
  const doneDates = habitLogs[selectedDate] || []
  const isToday = selectedDate === todayKey()

  const addHabitSubmit = () => {
    if (!habitName.trim()) return
    addHabit({ name: habitName.trim(), icon, color })
    setHabitName(''); setShowForm(false)
    showToast('Habit added ✓')
  }

  const getStreak = (habitId) => {
    let s = 0
    const d = new Date()
    while (true) {
      const k = toLocalDateKey(d)
      if (!(habitLogs[k] || []).includes(habitId)) break
      s++; d.setDate(d.getDate() - 1)
    }
    return s
  }

  const doneCount = doneDates.length
  const totalHabits = habits.length
  const pct = totalHabits > 0 ? Math.round((doneCount / totalHabits) * 100) : 0
  const allDone = totalHabits > 0 && doneCount === totalHabits

  return (
    <div className="page">
      {/* Header */}
      <div style={{ padding: 'calc(env(safe-area-inset-top,44px) + 8px) 20px 16px' }}>
        <p className="page-subtitle">
          {isToday ? "Today's" : weekDays.find(d => d.date === selectedDate)?.dayName} Checklist
        </p>
        <h1 className="page-title shimmer-text" style={{ display: 'inline-block' }}>Routine</h1>
      </div>

      {/* Week Strip */}
      <div className="week-strip">
        {weekDays.map(({ date, dayNum, dayName }) => {
          const done = (habitLogs[date] || []).length
          const hasData = done > 0
          const isSelected = date === selectedDate
          return (
            <button key={date} className={`day-pill ${isSelected ? 'active' : ''}`}
              onClick={() => setSelectedDate(date)} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font)' }}>
              <span className="day-pill-name">{dayName}</span>
              <span className="day-pill-num">{dayNum}</span>
              <span className={`day-pill-dot ${hasData ? 'has-data' : ''}`} />
            </button>
          )
        })}
      </div>

      {/* Progress bar */}
      {totalHabits > 0 && (
        <div className="section" style={{ marginBottom: 16 }}>
          <div className="card glow-card" style={{ padding: '16px 20px' }}>
            {loading ? <SkeletonBlock height={78} /> : (
              <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <p style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>
                  {isToday ? "Today's progress" : 'Day progress'}
                </p>
                <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', marginTop: 2 }}>
                  {doneCount}
                  <span style={{ fontSize: 14, color: 'var(--text-3)', fontWeight: 400 }}>/{totalHabits} done</span>
                </p>
              </div>
              {allDone ? (
                <span style={{ fontSize: 24 }}>🎉</span>
              ) : (
                <span style={{ fontSize: 24, fontWeight: 800, color: pct === 100 ? 'var(--green)' : 'var(--text-2)' }}>
                  {pct}%
                </span>
              )}
            </div>
            <div className="progress-track" style={{ height: 6 }}>
              <div className="progress-fill" style={{
                width: `${pct}%`,
                background: pct === 100
                  ? 'linear-gradient(90deg, var(--green), #78FFD6)'
                  : 'var(--green)',
              }} />
            </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Habit list */}
      <div className="section">
        {habits.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">✨</div>
            <p>No habits yet.<br />Add your first below.</p>
          </div>
        ) : (
          <div className="grouped-card">
            {habits.map((habit) => {
              const done = doneDates.includes(habit.id)
              const streak = getStreak(habit.id)

              return (
                <div key={habit.id} className="habit-row"
                  onClick={() => {
                    toggleHabit(habit.id, selectedDate)
                    if (!done && isToday) showToast(`${habit.name.split(' ').slice(1).join(' ') || habit.name} ✓`)
                  }}
                >
                  {/* Check circle */}
                  <div className={`habit-check ${done ? 'done' : ''}`}
                    style={{ background: done ? habit.color : 'transparent', borderColor: done ? habit.color : 'var(--surface-4)' }}>
                    <svg viewBox="0 0 14 14">
                      <polyline points="2 7 6 11 12 3" />
                    </svg>
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: done ? `${habit.color}22` : 'var(--surface-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                    transition: 'background 200ms',
                  }}>
                    {habit.icon}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 15, fontWeight: 500,
                      color: done ? 'var(--text-3)' : 'var(--text-1)',
                      textDecoration: done ? 'line-through' : 'none',
                      transition: 'all 200ms',
                    }}>
                      {habit.name}
                    </p>
                    {streak > 1 && (
                      <p style={{ fontSize: 11, color: habit.color, fontWeight: 600, marginTop: 1 }}>
                        🔥 {streak} day streak
                      </p>
                    )}
                  </div>

                  {/* Delete */}
                  {confirmDel === habit.id ? (
                    <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                      <button style={S.delBtn} onClick={() => { deleteHabit(habit.id); setConfirmDel(null); showToast('Removed', 'error') }}>
                        Remove
                      </button>
                      <button style={S.keepBtn} onClick={() => setConfirmDel(null)}>Keep</button>
                    </div>
                  ) : (
                    <button className="btn-icon" style={{ fontSize: 14 }}
                      onClick={e => { e.stopPropagation(); setConfirmDel(habit.id) }}>
                      ···
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add habit */}
      <div className="section">
        {showForm ? (
          <div className="card anim-fade">
            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>New Habit</p>

            <div className="input-group" style={{ marginBottom: 14 }}>
              <label className="input-label">Name</label>
              <input className="input" placeholder="e.g. Morning walk"
                value={habitName} onChange={e => setHabitName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addHabitSubmit()} autoFocus />
            </div>

            <div style={{ marginBottom: 14 }}>
              <p className="input-label" style={{ marginBottom: 8 }}>Icon</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {HABIT_ICONS.map(ic => (
                  <button key={ic} onClick={() => setIcon(ic)}
                    style={{ width: 38, height: 38, borderRadius: 10, fontSize: 19, cursor: 'pointer',
                      background: icon === ic ? 'var(--green-dim)' : 'var(--surface-3)',
                      border: icon === ic ? '2px solid var(--green)' : '1px solid transparent',
                      transition: 'all 150ms', }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <p className="input-label" style={{ marginBottom: 8 }}>Color</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {HABIT_COLORS.map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    style={{ width: 28, height: 28, borderRadius: 14, background: c, border: 'none', cursor: 'pointer',
                      outline: color === c ? `3px solid ${c}` : 'none', outlineOffset: 2,
                      transform: color === c ? 'scale(1.15)' : 'scale(1)', transition: 'all 150ms', }} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary flex-1" onClick={addHabitSubmit}>Add Habit</button>
              <button className="btn btn-ghost" style={{ padding: '0 20px' }} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="btn btn-ghost w-full"
            style={{ borderRadius: 'var(--r-xl)', borderStyle: 'dashed', height: 48, fontSize: 14 }}
            onClick={() => setShowForm(true)}>
            + Add Habit
          </button>
        )}
      </div>
    </div>
  )
}

const S = {
  delBtn: {
    fontSize: 12, padding: '5px 10px', borderRadius: 8,
    background: 'var(--red-dim)', color: 'var(--red)', border: 'none', cursor: 'pointer', fontWeight: 600,
    fontFamily: 'var(--font)',
  },
  keepBtn: {
    fontSize: 12, padding: '5px 10px', borderRadius: 8,
    background: 'var(--surface-3)', color: 'var(--text-3)', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font)',
  },
}
