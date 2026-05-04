import React from 'react'

export default function LoadingScreen({ label = 'Loading your dashboard...' }) {
  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label={label}>
      <div className="loading-screen-card">
        <div className="loading-spinner" />
        <p className="loading-label">{label}</p>
      </div>
    </div>
  )
}
