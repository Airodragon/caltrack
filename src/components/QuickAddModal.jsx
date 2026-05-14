import React, { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { MEAL_TYPES } from '../utils/helpers'
import { MealTypeIcon } from './AppIcon'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'

export default function QuickAddModal({ onClose }) {
  const { addMeal, showToast, profile, getFoodCatalog, addCustomFood } = useApp()

  const [type, setType] = useState('Lunch')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [servings, setServings] = useState('1')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [showMacros, setShowMacros] = useState(false)
  const [showFoodList, setShowFoodList] = useState(false)
  const [selectedFoodId, setSelectedFoodId] = useState('')
  const [error, setError] = useState('')
  const nameRef = useRef()
  const foods = getFoodCatalog()

  useEffect(() => { setTimeout(() => nameRef.current?.focus(), 200) }, [])

  const submit = () => {
    if (!name.trim()) { setError('Enter a meal name'); return }
    if (!calories || isNaN(calories) || Number(calories) < 0) { setError('Enter valid calories'); return }
    addMeal({
      name: name.trim(),
      type,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      multiplier: Number(servings) > 0 ? Number(servings) : 1,
    })
    showToast(`${name.trim()} added`)
    onClose()
  }

  const useFoodPreset = (foodId) => {
    const food = foods.find(f => f.id === foodId)
    if (!food) return
    setSelectedFoodId(foodId)
    setName(food.name)
    setCalories(String(food.calories))
    setProtein(String(food.protein))
    setCarbs(String(food.carbs))
    setFat(String(food.fat))
    setShowMacros(true)
    setShowFoodList(false)
  }

  const saveCustomFood = () => {
    if (!name.trim()) return setError('Food name is required')
    if (!calories || Number(calories) < 0) return setError('Calories are required')
    addCustomFood({
      name: name.trim(),
      servingSize: 1,
      servingUnit: 'serving',
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    })
    showToast('Saved to food list')
  }

  const canSaveCustom = name.trim() && calories && Number(calories) > 0

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="sheet-handle" />
        <div className="sheet-title">Log Meal</div>

        {/* 1. Meal type */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {MEAL_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                flex: 1, padding: '10px 4px', borderRadius: 14,
                background: type === t ? 'var(--blue)' : 'var(--surface-3)',
                border: type === t ? 'none' : '1px solid var(--border)',
                color: type === t ? '#fff' : 'var(--text-2)',
                fontFamily: 'var(--font)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                transition: 'background 150ms',
              }}
            >
              <MealTypeIcon type={t} size={18} color={type === t ? '#fff' : 'var(--text-3)'} />
              {t}
            </button>
          ))}
        </div>

        {/* 2. Meal name */}
        <div className="input-group" style={{ marginBottom: 14 }}>
          <label className="input-label">Meal name</label>
          <input
            ref={nameRef}
            className="input"
            placeholder="e.g. Chicken rice bowl"
            value={name}
            onChange={e => { setName(e.target.value); setError('') }}
          />
        </div>

        {/* 3. Calories */}
        <div className="input-group" style={{ marginBottom: 14 }}>
          <label className="input-label" style={{ color: 'var(--green)' }}>Calories (kcal)</label>
          <input
            className="input"
            type="number"
            placeholder="350"
            value={calories}
            onChange={e => { setCalories(e.target.value); setError('') }}
            style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', letterSpacing: '-0.5px' }}
          />
        </div>

        {/* 4. Servings */}
        <div className="input-group" style={{ marginBottom: 18 }}>
          <label className="input-label">Servings</label>
          <input
            className="input"
            type="number"
            step="0.25"
            value={servings}
            onChange={e => setServings(e.target.value)}
            style={{ textAlign: 'center' }}
          />
        </div>

        {/* 5. Macros — collapsible */}
        <button
          onClick={() => setShowMacros(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', background: 'var(--surface-3)', border: 'none',
            borderRadius: 12, padding: '10px 14px', cursor: 'pointer',
            fontFamily: 'var(--font)', marginBottom: showMacros ? 12 : 18,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)' }}>
            Macros (optional)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {(protein || carbs || fat) && (
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
                {[protein && `P${protein}`, carbs && `C${carbs}`, fat && `F${fat}`].filter(Boolean).join(' ')}
              </span>
            )}
            {showMacros ? <ChevronUp size={14} color="var(--text-3)" /> : <ChevronDown size={14} color="var(--text-3)" />}
          </span>
        </button>

        {showMacros && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
            {[
              { key: 'protein', label: 'Protein', val: protein, set: setProtein, color: 'var(--blue)',   ph: profile?.proteinGoal ? `~${Math.round(profile.proteinGoal / 4)}` : '30' },
              { key: 'carbs',   label: 'Carbs',   val: carbs,   set: setCarbs,   color: 'var(--orange)', ph: '50' },
              { key: 'fat',     label: 'Fat',     val: fat,     set: setFat,     color: 'var(--red)',    ph: '12' },
            ].map(f => (
              <div className="input-group" key={f.key}>
                <label className="input-label" style={{ color: f.color }}>{f.label}</label>
                <input
                  className="input"
                  type="number"
                  placeholder={f.ph}
                  value={f.val}
                  onChange={e => f.set(e.target.value)}
                  style={{ textAlign: 'center', padding: '10px 6px' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 6. Fill from food list — secondary */}
        <button
          onClick={() => setShowFoodList(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', padding: '2px 0', cursor: 'pointer',
            fontSize: 12, fontWeight: 600, color: 'var(--blue)',
            fontFamily: 'var(--font)', marginBottom: showFoodList ? 10 : 18,
          }}
        >
          <BookOpen size={13} />
          Fill from food list
          {showFoodList ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {showFoodList && (
          <div className="input-group" style={{ marginBottom: 18 }}>
            <select
              className="input"
              value={selectedFoodId}
              onChange={e => useFoodPreset(e.target.value)}
            >
              <option value="">Choose a food…</option>
              {foods.map(food => (
                <option key={food.id} value={food.id}>
                  {food.name} — {food.calories} kcal
                </option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <p style={{ color: 'var(--red)', fontSize: 13, textAlign: 'center', marginBottom: 10 }}>
            {error}
          </p>
        )}

        {/* Action buttons */}
        <button className="btn btn-primary w-full" style={{ borderRadius: 'var(--r-xl)', marginBottom: 10 }} onClick={submit}>
          Add Meal
        </button>

        {canSaveCustom && (
          <button
            className="btn btn-ghost w-full"
            style={{ borderRadius: 'var(--r-xl)', marginBottom: 10, fontSize: 13 }}
            onClick={saveCustomFood}
          >
            Save to my food list
          </button>
        )}

        <button
          className="btn btn-ghost w-full"
          style={{ borderRadius: 'var(--r-xl)', padding: '12px' }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
