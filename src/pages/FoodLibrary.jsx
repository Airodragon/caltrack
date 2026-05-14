import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { DEFAULT_FOOD_CATALOG } from '../utils/helpers'
import { ChevronLeft, Search, Plus, Pencil, Trash2, X, Check } from 'lucide-react'

// ── Food edit sheet ────────────────────────────────────────
function FoodSheet({ food, onSave, onClose }) {
  const [name, setName]       = useState(food?.name    || '')
  const [calories, setCalories] = useState(food?.calories != null ? String(food.calories) : '')
  const [protein, setProtein] = useState(food?.protein  != null ? String(food.protein)  : '')
  const [carbs, setCarbs]     = useState(food?.carbs    != null ? String(food.carbs)    : '')
  const [fat, setFat]         = useState(food?.fat      != null ? String(food.fat)      : '')
  const [error, setError]     = useState('')
  const nameRef = useRef()

  useEffect(() => { setTimeout(() => nameRef.current?.focus(), 150) }, [])

  const submit = () => {
    if (!name.trim())                          { setError('Food name is required'); return }
    if (!calories || isNaN(calories) || Number(calories) < 0) { setError('Enter valid calories'); return }
    onSave({
      name:     name.trim(),
      calories: Number(calories),
      protein:  Number(protein)  || 0,
      carbs:    Number(carbs)    || 0,
      fat:      Number(fat)      || 0,
    })
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="sheet-handle" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span className="sheet-title" style={{ margin: 0 }}>{food ? 'Edit Food' : 'Add Food'}</span>
          <button className="btn-icon" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="input-group" style={{ marginBottom: 14 }}>
          <label className="input-label">Food name</label>
          <input
            ref={nameRef}
            className="input"
            placeholder="e.g. Greek Yogurt"
            value={name}
            onChange={e => { setName(e.target.value); setError('') }}
          />
        </div>

        <div className="input-group" style={{ marginBottom: 14 }}>
          <label className="input-label" style={{ color: 'var(--green)' }}>Calories (kcal)</label>
          <input
            className="input"
            type="number"
            placeholder="120"
            value={calories}
            onChange={e => { setCalories(e.target.value); setError('') }}
            style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', letterSpacing: '-0.5px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Protein', val: protein, set: setProtein, color: 'var(--blue)',   ph: '10' },
            { label: 'Carbs',   val: carbs,   set: setCarbs,   color: 'var(--orange)', ph: '15' },
            { label: 'Fat',     val: fat,     set: setFat,     color: 'var(--red)',    ph: '5'  },
          ].map(f => (
            <div className="input-group" key={f.label}>
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

        {error && (
          <p style={{ color: 'var(--red)', fontSize: 13, textAlign: 'center', marginBottom: 10 }}>{error}</p>
        )}

        <button className="btn btn-primary w-full" style={{ borderRadius: 'var(--r-xl)', marginBottom: 10 }} onClick={submit}>
          {food ? 'Save Changes' : 'Add Food'}
        </button>
        <button className="btn btn-ghost w-full" style={{ borderRadius: 'var(--r-xl)' }} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// ── Macro badge row ────────────────────────────────────────
function MacroBadges({ protein, carbs, fat }) {
  const items = [
    { label: 'P', val: protein, color: 'var(--blue)'   },
    { label: 'C', val: carbs,   color: 'var(--orange)' },
    { label: 'F', val: fat,     color: 'var(--red)'    },
  ]
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 3 }}>
      {items.map(m => (
        <span key={m.label} style={{
          fontSize: 10, fontWeight: 700, color: m.color,
          background: 'var(--surface-3)', borderRadius: 6,
          padding: '2px 5px', letterSpacing: '0.2px',
        }}>
          {m.label} {m.val ?? 0}g
        </span>
      ))}
    </div>
  )
}

// ── Delete confirmation ────────────────────────────────────
function DeleteConfirm({ food, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal-sheet" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 16px)' }}>
        <div className="sheet-handle" />
        <p className="sheet-title">Remove food?</p>
        <p style={{ fontSize: 14, color: 'var(--text-2)', textAlign: 'center', marginBottom: 24 }}>
          "{food.name}" will be removed from your food library. Meals already logged are unaffected.
        </p>
        <button
          className="btn w-full"
          style={{ borderRadius: 'var(--r-xl)', background: 'var(--red)', color: '#fff', border: 'none', marginBottom: 10 }}
          onClick={onConfirm}
        >
          Remove
        </button>
        <button className="btn btn-ghost w-full" style={{ borderRadius: 'var(--r-xl)' }} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────
export default function FoodLibrary() {
  const navigate = useNavigate()
  const { customFoods, addCustomFood, deleteCustomFood, updateCustomFood, showToast } = useApp()

  const [query, setQuery] = useState('')
  const [editFood, setEditFood] = useState(null)   // null = closed, 'new' = add, object = edit
  const [deleteFood, setDeleteFood] = useState(null)
  const [tab, setTab] = useState('mine')  // 'mine' | 'builtin'

  const q = query.trim().toLowerCase()

  const myFoods = (customFoods || []).filter(f =>
    !q || f.name?.toLowerCase().includes(q)
  )
  const builtinFoods = DEFAULT_FOOD_CATALOG.filter(f =>
    !q || f.name?.toLowerCase().includes(q)
  )

  const handleSave = (data) => {
    if (editFood === 'new') {
      addCustomFood(data)
      showToast(`${data.name} added`)
    } else {
      updateCustomFood(editFood.id, data)
      showToast('Food updated')
    }
    setEditFood(null)
  }

  const handleDelete = () => {
    deleteCustomFood(deleteFood.id)
    showToast(`${deleteFood.name} removed`)
    setDeleteFood(null)
  }

  return (
    <div className="page">
      {/* Header */}
      <div style={{
        padding: 'calc(env(safe-area-inset-top, 44px) + 8px) 20px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        position: 'sticky', top: 0, zIndex: 10,
        background: 'var(--bg)', borderBottom: '1px solid var(--sep)',
      }}>
        <button className="btn-icon" onClick={() => navigate(-1)}>
          <ChevronLeft size={22} />
        </button>
        <h1 className="page-title" style={{ flex: 1 }}>Food Library</h1>
        <button
          className="btn btn-primary"
          style={{ borderRadius: 'var(--r-full)', padding: '8px 14px', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}
          onClick={() => { setTab('mine'); setEditFood('new') }}
        >
          <Plus size={14} strokeWidth={3} />
          Add
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 14, padding: '10px 14px',
        }}>
          <Search size={16} color="var(--text-3)" />
          <input
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 15, color: 'var(--text-1)', fontFamily: 'var(--font)' }}
            placeholder="Search foods…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="btn-icon" style={{ padding: 0 }} onClick={() => setQuery('')}>
              <X size={14} color="var(--text-3)" />
            </button>
          )}
        </div>
      </div>

      {/* Tab pills */}
      <div style={{ display: 'flex', gap: 8, padding: '14px 20px 0' }}>
        {[
          { key: 'mine',    label: `My Foods (${(customFoods || []).length})` },
          { key: 'builtin', label: `Built-in (${DEFAULT_FOOD_CATALOG.length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '7px 14px', borderRadius: 'var(--r-full)',
              background: tab === t.key ? 'var(--blue)' : 'var(--surface-3)',
              border: tab === t.key ? 'none' : '1px solid var(--border)',
              color: tab === t.key ? '#fff' : 'var(--text-2)',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)',
              transition: 'background 150ms',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '14px 20px', paddingBottom: 'calc(env(safe-area-inset-bottom, 24px) + 80px)' }}>

        {/* My Foods */}
        {tab === 'mine' && (
          <>
            {myFoods.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                {q ? (
                  <p style={{ color: 'var(--text-3)', fontSize: 14 }}>No custom foods match "{query}"</p>
                ) : (
                  <>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>🥗</div>
                    <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 6 }}>No saved foods yet</p>
                    <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 20 }}>
                      Add your frequently eaten foods here for one-tap logging.
                    </p>
                    <button
                      className="btn btn-primary"
                      style={{ borderRadius: 'var(--r-xl)', padding: '12px 24px' }}
                      onClick={() => setEditFood('new')}
                    >
                      Add your first food
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="grouped-card">
                {myFoods.map((food, i) => (
                  <div
                    key={food.id}
                    className="grouped-item"
                    style={{ position: 'relative' }}
                  >
                    <div className="grouped-item-body">
                      <p className="grouped-item-title">{food.name}</p>
                      <MacroBadges protein={food.protein} carbs={food.carbs} fat={food.fat} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--green)', flexShrink: 0 }}>
                      {food.calories} kcal
                    </span>
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                      <button
                        className="btn-icon"
                        style={{ color: 'var(--blue)' }}
                        onClick={() => setEditFood(food)}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="btn-icon"
                        style={{ color: 'var(--red)' }}
                        onClick={() => setDeleteFood(food)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Built-in Foods */}
        {tab === 'builtin' && (
          <>
            <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 10, fontWeight: 500 }}>
              These are read-only. To customise a food, add it to My Foods.
            </p>
            {builtinFoods.length === 0 ? (
              <p style={{ color: 'var(--text-3)', fontSize: 14, textAlign: 'center', padding: '30px 0' }}>
                No results for "{query}"
              </p>
            ) : (
              <div className="grouped-card">
                {builtinFoods.map(food => (
                  <div key={food.id} className="grouped-item">
                    <div className="grouped-item-body">
                      <p className="grouped-item-title">{food.name}</p>
                      <MacroBadges protein={food.protein} carbs={food.carbs} fat={food.fat} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-2)', flexShrink: 0 }}>
                      {food.calories} kcal
                    </span>
                    <button
                      className="btn-icon"
                      title="Copy to My Foods"
                      style={{ color: 'var(--blue)' }}
                      onClick={() => {
                        addCustomFood({
                          name: food.name, calories: food.calories,
                          protein: food.protein, carbs: food.carbs, fat: food.fat,
                        })
                        showToast(`${food.name} added to My Foods`)
                      }}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Food FAB (only on My Foods tab) */}
      {tab === 'mine' && myFoods.length > 0 && (
        <button
          onClick={() => setEditFood('new')}
          style={{
            position: 'fixed', right: 20,
            bottom: 'calc(env(safe-area-inset-bottom, 16px) + 76px)',
            width: 52, height: 52, borderRadius: 26,
            background: 'var(--blue)', border: 'none', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.18)', cursor: 'pointer',
            zIndex: 50,
          }}
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      )}

      {/* Edit / Add Sheet */}
      {editFood !== null && (
        <FoodSheet
          food={editFood === 'new' ? null : editFood}
          onSave={handleSave}
          onClose={() => setEditFood(null)}
        />
      )}

      {/* Delete Confirm */}
      {deleteFood && (
        <DeleteConfirm
          food={deleteFood}
          onConfirm={handleDelete}
          onCancel={() => setDeleteFood(null)}
        />
      )}
    </div>
  )
}
