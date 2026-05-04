import React from 'react'
import { NavLink } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'

const TABS = [
  { to: '/', end: true, label: 'Today', icon: TodayIcon },
  { to: '/routine', label: 'Routine', icon: RoutineIcon },
  { to: '/calories', label: 'Calories', icon: CalIcon },
  { to: '/stats', label: 'Stats', icon: StatsIcon },
]

export default function BottomNav({ theme = 'light', onToggleTheme }) {
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
        <button
          type="button"
          style={S.themeBtn}
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
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

function RoutineIcon({ active }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
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

function StatsIcon({ active }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
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
  themeBtn: {
    marginRight: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text-2)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
  },
}
