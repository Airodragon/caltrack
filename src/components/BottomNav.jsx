import React from 'react'
import { NavLink } from 'react-router-dom'
import { Ellipsis } from 'lucide-react'

const TABS = [
  { to: '/', end: true, label: 'Today', icon: TodayIcon },
  { to: '/calories', label: 'Calories', icon: CalIcon },
  { to: '/routine', label: 'Routine', icon: RoutineIcon },
  { to: '/more', label: 'More', icon: MoreIcon },
]

export default function BottomNav() {
  return (
    <nav className="nav-bar">
      <div style={S.inner}>
        {TABS.map(({ to, end, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={end} style={{ textDecoration: 'none', flex: 1 }}>
            {({ isActive }) => (
              <div style={S.tab}>
                <div style={{ ...S.iconWrap, color: isActive ? 'var(--blue)' : 'var(--text-3)' }}>
                  <Icon active={isActive} />
                </div>
                <span style={{ ...S.label, color: isActive ? 'var(--blue)' : 'var(--text-3)' }}>
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function TodayIcon({ active }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" fill={active ? 'var(--green)' : 'none'} stroke="none" />
    </svg>
  )
}

function CalIcon({ active }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 4-4 8-7 12C9 17 5 13 5 9a7 7 0 0 1 7-7z" />
      <circle cx="12" cy="9" r="2.5" fill={active ? 'var(--green)' : 'none'} stroke="none" />
    </svg>
  )
}

function MoreIcon() {
  return <Ellipsis size={21} />
}

function RoutineIcon({ active }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Left weights */}
      <path d="M3 9v6" />
      <path d="M6 7v10" />

      {/* Bar */}
      <path d="M6 12h12" />

      {/* Right weights */}
      <path d="M18 7v10" />
      <path d="M21 9v6" />

      {/* Active center accent */}
      {active && (
        <circle
          cx="12"
          cy="12"
          r="1.8"
          fill="var(--green)"
          stroke="none"
        />
      )}
    </svg>
  )
}

const S = {
  inner: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 'env(safe-area-inset-bottom, 10px)',
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    padding: '10px 0 6px',
    cursor: 'pointer',
  },
  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 180ms, transform 180ms',
  },
  label: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.2px',
    transition: 'color 180ms',
  },
}
