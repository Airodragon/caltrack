import React, { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { MEAL_TYPES } from '../utils/helpers'
import { MealTypeIcon } from './AppIcon'

export default function QuickAddModal({ onClose }) {
  const { addMeal, showToast, profile } = useApp()
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [type, setType] = useState('Lunch')
  const [error, setError] = useState('')
  const nameRef = useRef()

  useEffect(() => { setTimeout(() => nameRef.current?.focus(), 200) }, [])

  const submit = () => {
    if (!name.trim()) { setError('Enter a meal name'); return }
    if (!calories || isNaN(calories) || Number(calories) < 0) { setError('Enter valid calories'); return }
    addMeal({ name: name.trim(), type, calories: Number(calories), protein: Number(protein) || 0, carbs: Number(carbs) || 0, fat: Number(fat) || 0 })
    showToast(`${name.trim()} added ✓`)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="sheet-handle" />
        <div className="sheet-title">Log Meal</div>

        {/* Meal type */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
          {MEAL_TYPES.map(t => (
            <button key={t} onClick={() => setType(t)}
              style={{
                flex: 1, padding: '10px 8px', borderRadius: 12,
                background: type === t ? 'var(--green)' : 'var(--surface-3)',
                border: type === t ? 'none' : '1px solid var(--border)',
                color: type === t ? '#000' : 'var(--text-2)',
                fontFamily: 'var(--font)', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
              <span style={{ display: 'inline-flex' }}>
                <MealTypeIcon type={t} size={18} color={type === t ? '#fff' : 'var(--text-2)'} />
              </span>
              <span>{t}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="input-group">
            <label className="input-label">Meal name</label>
            <input ref={nameRef} className="input" placeholder="e.g. Chicken rice bowl" value={name}
              onChange={e => setName(e.target.value)} />
          </div>

          <div className="input-group">
            <label className="input-label" style={{ color: 'var(--green)' }}>Calories (kcal)</label>
            <input className="input" type="number" placeholder="350" value={calories}
              onChange={e => setCalories(e.target.value)}
              style={{ fontSize: 22, fontWeight: 700, textAlign: 'center' }} />
          </div>

          {/* Macros row */}
          <div>
            <p className="input-label" style={{ marginBottom: 10 }}>Macros (g) — optional</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { key: 'protein', label: 'Protein', val: protein, set: setProtein, color: 'var(--blue)', ph: profile?.proteinGoal ? `~${Math.round(profile.proteinGoal / 4)}` : '30' },
                { key: 'carbs', label: 'Carbs', val: carbs, set: setCarbs, color: 'var(--orange)', ph: '50' },
                { key: 'fat', label: 'Fat', val: fat, set: setFat, color: 'var(--red)', ph: '12' },
              ].map(f => (
                <div className="input-group" key={f.key}>
                  <label className="input-label" style={{ color: f.color }}>{f.label}</label>
                  <input className="input" type="number" placeholder={f.ph} value={f.val}
                    onChange={e => f.set(e.target.value)}
                    style={{ textAlign: 'center', padding: '10px 6px' }} />
                </div>
              ))}
            </div>
          </div>

          {error && <p style={{ color: 'var(--red)', fontSize: 13, textAlign: 'center' }}>{error}</p>}

          <button className="btn btn-primary w-full" style={{ borderRadius: 'var(--r-xl)' }} onClick={submit}>
            Add Meal
          </button>
          <button className="btn btn-ghost w-full" style={{ borderRadius: 'var(--r-xl)', padding: '12px' }} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
