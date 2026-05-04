import React from 'react'

// Animated calorie ring (SVG arc)
export default function CalorieRing({ consumed, goal, size = 180 }) {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(consumed / Math.max(goal, 1), 1)
  const offset = circumference * (1 - pct)
  const isOver = consumed > goal
  const remaining = goal - consumed

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--surface-2)"
            strokeWidth={10}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isOver ? '#FF6B6B' : 'url(#ringGrad)'}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 800ms cubic-bezier(0.4,0,0.2,1)' }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7CFC8C" />
              <stop offset="100%" stopColor="#78FFD6" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontSize: 30,
            fontWeight: 700,
            color: isOver ? 'var(--danger)' : 'var(--text-1)',
            letterSpacing: '-1px',
            lineHeight: 1,
          }}>
            {consumed.toLocaleString()}
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, fontWeight: 500 }}>
            kcal eaten
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: isOver ? 'var(--danger)' : 'var(--accent)',
        }}>
          {isOver
            ? `${(consumed - goal).toLocaleString()} over`
            : `${remaining.toLocaleString()} left`}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>of {goal.toLocaleString()} goal</span>
      </div>
    </div>
  )
}
