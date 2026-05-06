import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Moon, Sun, LogOut, BarChart3, CheckCircle2, Bot } from 'lucide-react'

export default function More({ theme = 'light', onToggleTheme, onSignOut }) {
  const items = [
    { to: '/stats', label: 'Stats', icon: <BarChart3 size={16} /> },
    { to: '/coach', label: 'Coach', icon: <Bot size={16} /> },
  ]

  return (
    <div className="page">
      <div style={{ padding: 'calc(env(safe-area-inset-top,44px) + 8px) 20px 16px' }}>
        <p className="page-subtitle">Settings and extras</p>
        <h1 className="page-title shimmer-text" style={{ display: 'inline-block' }}>More</h1>
      </div>

      <div className="section">
        <div className="grouped-card">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="grouped-item"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="grouped-item-icon">{item.icon}</div>
              <div className="grouped-item-body">
                <p className="grouped-item-title">{item.label}</p>
              </div>
              <ChevronRight size={14} color="var(--text-3)" />
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="grouped-card">
          <button className="grouped-item" style={S.actionBtn} onClick={onToggleTheme}>
            <div className="grouped-item-icon">{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}</div>
            <div className="grouped-item-body">
              <p className="grouped-item-title">{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</p>
            </div>
          </button>
          <button className="grouped-item" style={S.actionBtn} onClick={onSignOut}>
            <div className="grouped-item-icon"><LogOut size={16} /></div>
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
