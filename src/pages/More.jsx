import React from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, Moon, Sun, LogOut, BarChart3,
  UtensilsCrossed, UserCircle, Target, Scale,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const GOAL_LABELS = { lose: 'Fat Loss', maintain: 'Maintain', gain: 'Gain Muscle' }

export default function More({ theme = 'light', onToggleTheme, onSignOut }) {
  const { profile } = useApp()

  const initial = (profile?.name || 'U').charAt(0).toUpperCase()
  const goalLabel = GOAL_LABELS[profile?.goalType] || 'Track Goals'
  const calGoal = profile?.calorieGoal

  const navItems = [
    {
      to: '/profile',
      label: 'Profile & Goals',
      sub: `${calGoal ? `${calGoal} kcal/day · ` : ''}${goalLabel}`,
      icon: <UserCircle size={17} />,
      iconBg: 'var(--blue-dim)',
      iconColor: 'var(--blue)',
    },
    {
      to: '/stats',
      label: 'Stats',
      sub: 'Calories, macros & trends',
      icon: <BarChart3 size={17} />,
      iconBg: 'var(--purple-dim)',
      iconColor: 'var(--purple)',
    },
    {
      to: '/meal-plan',
      label: 'Meal Plan',
      sub: '7-day high protein fat loss',
      icon: <UtensilsCrossed size={17} />,
      iconBg: 'var(--green-dim)',
      iconColor: 'var(--green)',
    },
  ]

  return (
    <div className="page">
      {/* Header */}
      <div style={{ padding: 'calc(env(safe-area-inset-top,44px) + 8px) 20px 16px' }}>
        <p className="page-subtitle">Settings and extras</p>
        <h1 className="page-title shimmer-text" style={{ display: 'inline-block' }}>More</h1>
      </div>

      {/* Profile card */}
      <div style={{ padding: '0 20px 20px' }}>
        <Link
          to="/profile"
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 20, padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--blue), var(--purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>{initial}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3 }}>
                {profile?.name || 'Set up your profile'}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-3)' }}>
                {[
                  profile?.age && `${profile.age} yrs`,
                  calGoal && `${calGoal} kcal/day`,
                  goalLabel,
                ].filter(Boolean).join(' · ')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {profile?.currentWeight && (
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--text-1)' }}>
                    {profile.currentWeight}
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)' }}> kg</span>
                  </p>
                  {profile?.targetWeight && (
                    <p style={{ margin: 0, fontSize: 11, color: 'var(--text-3)' }}>
                      → {profile.targetWeight} kg
                    </p>
                  )}
                </div>
              )}
              <ChevronRight size={16} color="var(--text-3)" />
            </div>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <div className="section">
        <div className="grouped-card">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="grouped-item"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="grouped-item-icon" style={{ background: item.iconBg, color: item.iconColor }}>
                {item.icon}
              </div>
              <div className="grouped-item-body">
                <p className="grouped-item-title">{item.label}</p>
                {item.sub && <p className="grouped-item-sub">{item.sub}</p>}
              </div>
              <ChevronRight size={14} color="var(--text-3)" />
            </Link>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="section">
        <div className="grouped-card">
          <button className="grouped-item" style={S.actionBtn} onClick={onToggleTheme}>
            <div className="grouped-item-icon">
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </div>
            <div className="grouped-item-body">
              <p className="grouped-item-title">{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</p>
            </div>
          </button>
          <button className="grouped-item" style={S.actionBtn} onClick={onSignOut}>
            <div className="grouped-item-icon"><LogOut size={16} color="var(--red)" /></div>
            <div className="grouped-item-body">
              <p className="grouped-item-title" style={{ color: 'var(--red)' }}>Sign Out</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

const S = {
  actionBtn: {
    width: '100%',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'var(--font)',
  },
}
