import React, { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import { getLastNDays, getDayLabel, toLocalDateKey } from '../utils/helpers'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
  AreaChart, Area,
  CartesianGrid, ReferenceLine,
} from 'recharts'
import SkeletonBlock from '../components/SkeletonBlock'
import { CalendarDays, CheckCircle2, Flame, PieChart as PieChartIcon, Salad, BarChart3 } from 'lucide-react'
import { HabitIcon } from '../components/AppIcon'

const RANGES = [7, 14, 30]

export default function Stats() {
  const { meals, habits, habitLogs, profile } = useApp()
  const [range, setRange] = useState(7)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [])

  const goal = profile?.calorieGoal || 2000
  const days = getLastNDays(range)
  const today = days[days.length - 1]

  // ── Calorie Data ──────────────────────────────────────────
  const calData = days.map(date => {
    const ms = meals[date] || []
    return {
      day: getDayLabel(date),
      date,
      calories: ms.reduce((s, m) => s + (m.calories || 0), 0),
      protein: ms.reduce((s, m) => s + (m.protein || 0), 0),
      carbs: ms.reduce((s, m) => s + (m.carbs || 0), 0),
      fat: ms.reduce((s, m) => s + (m.fat || 0), 0),
    }
  })

  const daysWithData = calData.filter(d => d.calories > 0)
  const avgCal = daysWithData.length ? Math.round(daysWithData.reduce((s, d) => s + d.calories, 0) / daysWithData.length) : 0
  const underGoalDays = daysWithData.filter(d => d.calories <= goal).length
  const overGoalDays = daysWithData.filter(d => d.calories > goal).length

  // ── Habit Data ────────────────────────────────────────────
  const habitData = days.map(date => {
    const done = (habitLogs[date] || []).length
    return {
      day: getDayLabel(date),
      date,
      pct: habits.length > 0 ? Math.round((done / habits.length) * 100) : 0,
      done,
    }
  })

  const avgHabit = habitData.length ? Math.round(habitData.reduce((s, d) => s + d.pct, 0) / habitData.length) : 0

  // ── Today macros (donut) ──────────────────────────────────
  const todayMeals = meals[today] || []
  const protein = todayMeals.reduce((s, m) => s + (m.protein || 0), 0)
  const carbs = todayMeals.reduce((s, m) => s + (m.carbs || 0), 0)
  const fat = todayMeals.reduce((s, m) => s + (m.fat || 0), 0)
  const macroTotal = protein + carbs + fat
  const macroData = [
    { name: 'Protein', value: protein, color: '#0A84FF' },
    { name: 'Carbs', value: carbs, color: '#FF9F0A' },
    { name: 'Fat', value: fat, color: '#FF453A' },
  ]

  // ── Macros over time (stacked area) ──────────────────────
  const macroTrend = calData.map(d => ({ ...d, label: d.day }))

  // ── Per-habit streaks ─────────────────────────────────────
  const habitStreaks = habits.map(h => {
    let streak = 0
    const d = new Date()
    while (true) {
      const k = toLocalDateKey(d)
      if (!(habitLogs[k] || []).includes(h.id)) break
      streak++; d.setDate(d.getDate() - 1)
    }
    return { ...h, streak }
  }).sort((a, b) => b.streak - a.streak)

  // Tooltip
  const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 14px', fontSize: 13 }}>
        <p style={{ fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || p.stroke || 'var(--text-2)' }}>
            {p.name}: {p.value}{p.unit || ''}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="page">
      {/* Header */}
      <div style={{ padding: 'calc(env(safe-area-inset-top,44px) + 8px) 20px 16px' }}>
        <p className="page-subtitle">Health overview</p>
        <h1 className="page-title shimmer-text" style={{ display: 'inline-block' }}>Stats</h1>
      </div>

      {/* Range */}
      <div className="chips" style={{ marginBottom: 20 }}>
        {RANGES.map(n => (
          <button key={n} className={`chip ${range === n ? 'active' : ''}`} onClick={() => setRange(n)}>
            {n}d
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="section">
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <SkeletonBlock height={86} radius={16} />
            <SkeletonBlock height={86} radius={16} />
            <SkeletonBlock height={86} radius={16} />
          </div>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'Avg / day', value: avgCal ? avgCal.toLocaleString() : '—', sub: 'kcal', color: 'var(--green)' },
            { label: 'Under goal', value: underGoalDays, sub: `of ${daysWithData.length}d`, color: 'var(--blue)' },
            { label: 'Habit avg', value: avgHabit ? `${avgHabit}%` : '—', sub: `${range}d avg`, color: 'var(--purple)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, padding: '14px 12px', textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', color: s.color }}>{s.value}</p>
              <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: 2 }}>{s.label}</p>
              <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{s.sub}</p>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* ── Calorie Bar Chart ── */}
      <div className="section">
        <div style={S.chartHead}>
          <span style={S.chartTitle}><Flame size={12} /> Calories</span>
          {overGoalDays > 0 && <span style={{ fontSize: 11, color: 'var(--red)' }}>{overGoalDays}d over goal</span>}
        </div>
        <div className="card">
          {daysWithData.length === 0 ? (
            <div className="empty" style={{ padding: '20px 0' }}><p>Log meals to see your trend</p></div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={calData} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="day" tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <ReferenceLine y={goal} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" label={{ value: 'Goal', fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="calories" name="Calories" radius={[5, 5, 0, 0]} maxBarSize={28}>
                    {calData.map((d, i) => (
                      <Cell key={i} fill={
                        d.calories === 0 ? 'var(--surface-3)' :
                        d.calories > goal ? '#FF453A' : '#30D158'
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 10, color: 'var(--text-3)', textAlign: 'center', marginTop: 8 }}>
                Green = under goal · Red = over goal
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Macros Over Time (Stacked Area) ── */}
      <div className="section">
        <div style={S.chartHead}>
          <span style={S.chartTitle}><Salad size={12} /> Macros Trend</span>
        </div>
        <div className="card">
          {daysWithData.length === 0 ? (
            <div className="empty" style={{ padding: '20px 0' }}><p>No macro data yet</p></div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={macroTrend} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A84FF" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#0A84FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF9F0A" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#FF9F0A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF453A" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#FF453A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="protein" name="Protein" stroke="#0A84FF" fill="url(#gP)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="carbs" name="Carbs" stroke="#FF9F0A" fill="url(#gC)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="fat" name="Fat" stroke="#FF453A" fill="url(#gF)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Today Macro Donut ── */}
      <div className="section">
        <div style={S.chartHead}>
          <span style={S.chartTitle}><PieChartIcon size={12} /> Today's Macro Split</span>
        </div>
        <div className="card">
          {macroTotal === 0 ? (
            <div className="empty" style={{ padding: '20px 0' }}><p>Log meals to see breakdown</p></div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie data={macroData} cx="50%" cy="50%" innerRadius={38} outerRadius={58}
                      paddingAngle={3} dataKey="value" strokeWidth={0}>
                      {macroData.map((m, i) => <Cell key={i} fill={m.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <p style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px' }}>{macroTotal}g</p>
                  <p style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'uppercase' }}>total</p>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {macroData.map(m => {
                  const macroGoal = { Protein: profile?.proteinGoal, Carbs: profile?.carbsGoal, Fat: profile?.fatGoal }[m.name] || 0
                  const p = macroGoal > 0 ? Math.min((m.value / macroGoal) * 100, 100) : 0
                  return (
                    <div key={m.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: m.color }}>{m.name}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                          {m.value}g{macroGoal ? ` / ${macroGoal}g` : ''}
                          {macroTotal > 0 && <span style={{ color: 'var(--text-4)', marginLeft: 4 }}>({Math.round((m.value / macroTotal) * 100)}%)</span>}
                        </span>
                      </div>
                      <div className="progress-track" style={{ height: 4 }}>
                        <div className="progress-fill" style={{ width: macroGoal > 0 ? `${p}%` : '0%', background: m.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Habit Completion Line Chart ── */}
      <div className="section">
        <div style={S.chartHead}>
          <span style={S.chartTitle}><CheckCircle2 size={12} /> Routine Completion</span>
          {avgHabit > 0 && <span style={{ fontSize: 11, color: 'var(--purple)' }}>{avgHabit}% avg</span>}
        </div>
        <div className="card">
          {habits.length === 0 ? (
            <div className="empty" style={{ padding: '20px 0' }}><p>Add habits to track completion</p></div>
          ) : (
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={habitData} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="gH" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#BF5AF2" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#BF5AF2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 14px', fontSize: 13 }}>
                      <p style={{ fontWeight: 700, color: 'var(--text-1)', marginBottom: 2 }}>{label}</p>
                      <p style={{ color: '#BF5AF2' }}>Completion: {payload[0].value}%</p>
                      <p style={{ color: 'var(--text-3)', fontSize: 11 }}>{payload[0].payload.done}/{habits.length} habits</p>
                    </div>
                  )
                }} />
                <Area type="monotone" dataKey="pct" stroke="#BF5AF2" fill="url(#gH)" strokeWidth={2.5}
                  dot={{ fill: '#BF5AF2', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Per-Habit Streak ── */}
      {habitStreaks.length > 0 && (
        <div className="section">
          <div style={S.chartHead}>
            <span style={S.chartTitle}><BarChart3 size={12} /> Habit Streaks</span>
          </div>
          <div className="grouped-card">
            {habitStreaks.map((h, i) => (
              <div key={h.id} className="grouped-item">
                <div className="grouped-item-icon" style={{ background: `${h.color}22`, fontSize: 18 }}>
                  <HabitIcon name={h.icon} size={17} color={h.color} />
                </div>
                <div className="grouped-item-body">
                  <p className="grouped-item-title">{h.name}</p>
                  <p className="grouped-item-sub">{h.streak > 0 ? `${h.streak} day${h.streak > 1 ? 's' : ''} in a row` : 'No streak today'}</p>
                </div>
                {h.streak > 0 && (
                  <span style={{ fontSize: 18, fontWeight: 700, color: h.color }}>{h.streak}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Habit Heatmap ── */}
      {habits.length > 0 && (
        <div className="section">
          <div style={S.chartHead}>
            <span style={S.chartTitle}><CalendarDays size={12} /> 28-Day Heatmap</span>
          </div>
          <div className="card" style={{ overflowX: 'auto' }}>
            <HabitHeatmap habits={habits} habitLogs={habitLogs} />
          </div>
        </div>
      )}
    </div>
  )
}

function HabitHeatmap({ habits, habitLogs }) {
  const days = getLastNDays(28)
  const today = days[days.length - 1]

  return (
    <div style={{ overflowX: 'auto' }}>
      {habits.map(habit => (
        <div key={habit.id} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ display: 'inline-flex' }}><HabitIcon name={habit.icon} size={14} color={habit.color} /></span>
            <p style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {habit.name}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {days.map(date => {
              const done = (habitLogs[date] || []).includes(habit.id)
              const isToday = date === today
              return (
                <div key={date}
                  title={date}
                  style={{
                    width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                    background: done ? habit.color : 'var(--surface-3)',
                    opacity: done ? 1 : 0.3,
                    border: isToday ? `2px solid ${habit.color}` : 'none',
                    transition: 'all 200ms',
                  }}
                />
              )
            })}
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
        {days.map((date, i) => (
          <div key={date} style={{ width: 26, flexShrink: 0, textAlign: 'center' }}>
            {(i % 7 === 0) && <span style={{ fontSize: 8, color: 'var(--text-3)' }}>
              {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const S = {
  chartHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: '0 4px',
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: 'var(--text-3)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
  },
}
