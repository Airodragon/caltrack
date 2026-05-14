import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  ChevronLeft, User, Target, Activity, Scale,
  CheckCircle2, Edit3, Wand2,
} from 'lucide-react'

const ACTIVITY_LABELS = { low: 'Low', moderate: 'Moderate', high: 'High' }
const GOAL_LABELS = { lose: 'Lose Weight', maintain: 'Maintain', gain: 'Gain Muscle' }
const SEX_LABELS = { male: 'Male', female: 'Female', prefer_not_to_say: 'Prefer not to say' }

// ── Read-only stat chip ────────────────────────────────────────
function StatChip({ label, value, color }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: 14, padding: '12px 10px', textAlign: 'center',
    }}>
      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: color || 'var(--text-1)', letterSpacing: '-0.4px' }}>
        {value ?? '—'}
      </p>
      <p style={{ margin: '2px 0 0', fontSize: 10, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </p>
    </div>
  )
}

// ── Section header ─────────────────────────────────────────────
function SectionHeader({ icon, label, color = 'var(--blue)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        background: color === 'var(--blue)' ? 'var(--blue-dim)'
          : color === 'var(--green)' ? 'var(--green-dim)'
          : color === 'var(--orange)' ? 'var(--orange-dim)'
          : 'var(--purple-dim)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0,
      }}>
        {icon}
      </div>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{label}</p>
    </div>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const { profile, setProfile, showToast } = useApp()

  // Editable fields
  const [name, setName] = useState(profile?.name || '')
  const [calorieGoal, setCalorieGoal] = useState(String(profile?.calorieGoal || ''))
  const [proteinGoal, setProteinGoal] = useState(String(profile?.proteinGoal || ''))
  const [carbsGoal, setCarbsGoal] = useState(String(profile?.carbsGoal || ''))
  const [fatGoal, setFatGoal] = useState(String(profile?.fatGoal || ''))
  const [height, setHeight] = useState(String(profile?.height || ''))
  const [currentWeight, setCurrentWeight] = useState(String(profile?.currentWeight || ''))
  const [targetWeight, setTargetWeight] = useState(String(profile?.targetWeight || ''))
  const [age, setAge] = useState(String(profile?.age || ''))
  const [sex, setSex] = useState(profile?.sex || 'prefer_not_to_say')
  const [activityLevel, setActivityLevel] = useState(profile?.activityLevel || 'moderate')
  const [goalType, setGoalType] = useState(profile?.goalType || 'maintain')
  const [saved, setSaved] = useState(false)

  // Derived BMI
  const bmi = height && currentWeight
    ? (Number(currentWeight) / Math.pow(Number(height) / 100, 2)).toFixed(1)
    : null
  const bmiLabel = bmi
    ? bmi < 18.5 ? 'Underweight'
      : bmi < 25 ? 'Normal'
      : bmi < 30 ? 'Overweight'
      : 'Obese'
    : null
  const bmiColor = bmi
    ? bmi < 18.5 ? 'var(--blue)'
      : bmi < 25 ? 'var(--green)'
      : bmi < 30 ? 'var(--orange)'
      : 'var(--red)'
    : 'var(--text-3)'

  // Weight to lose/gain
  const weightDelta = currentWeight && targetWeight
    ? (Number(targetWeight) - Number(currentWeight)).toFixed(1)
    : null

  const handleSave = () => {
    if (!name.trim()) { showToast('Name is required', 'error'); return }
    if (!calorieGoal || Number(calorieGoal) < 500) { showToast('Enter a valid calorie goal', 'error'); return }

    setProfile({
      ...profile,
      name: name.trim(),
      calorieGoal: Number(calorieGoal),
      proteinGoal: Number(proteinGoal) || 0,
      carbsGoal: Number(carbsGoal) || 0,
      fatGoal: Number(fatGoal) || 0,
      height: Number(height) || null,
      currentWeight: Number(currentWeight) || null,
      targetWeight: Number(targetWeight) || null,
      age: Number(age) || null,
      sex,
      activityLevel,
      goalType,
    })

    setSaved(true)
    showToast('Profile updated', 'success')
    setTimeout(() => setSaved(false), 2000)
  }

  // Mifflin-St Jeor auto-calculate
  const canAutoCalc = height && currentWeight && age && sex !== 'prefer_not_to_say'
  const autoCalcGoals = () => {
    const w = Number(currentWeight), h = Number(height), a = Number(age)
    if (!w || !h || !a) return
    const bmr = sex === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161
    const actMultiplier = { low: 1.375, moderate: 1.55, high: 1.725 }[activityLevel] || 1.55
    let tdee = Math.round(bmr * actMultiplier)
    const calTarget = goalType === 'lose'
      ? Math.max(1200, tdee - 500)
      : goalType === 'gain'
        ? tdee + 300
        : tdee
    // Standard macro split: P 30%, C 40%, F 30%
    const protTarget = Math.round((calTarget * 0.30) / 4)
    const carbTarget = Math.round((calTarget * 0.40) / 4)
    const fatTarget  = Math.round((calTarget * 0.30) / 9)
    setCalorieGoal(String(calTarget))
    setProteinGoal(String(protTarget))
    setCarbsGoal(String(carbTarget))
    setFatGoal(String(fatTarget))
    showToast('Goals recalculated from your body data')
  }

  const initial = (profile?.name || 'U').charAt(0).toUpperCase()

  return (
    <div className="page">
      {/* Header */}
      <div style={{ padding: 'calc(env(safe-area-inset-top,44px) + 8px) 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--surface-3)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-2)', flexShrink: 0,
            }}
          >
            <ChevronLeft size={18} />
          </button>
        </div>
        <p className="page-subtitle">Your data, your goals</p>
        <h1 className="page-title shimmer-text" style={{ display: 'inline-block' }}>Profile</h1>
      </div>

      {/* Avatar + summary */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 20, padding: '18px 18px',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--blue), var(--purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>{initial}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
              {profile?.name || 'Your Name'}
            </p>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--text-3)' }}>
              {[profile?.age && `${profile.age} yrs`, profile?.sex !== 'prefer_not_to_say' && SEX_LABELS[profile?.sex], GOAL_LABELS[profile?.goalType]].filter(Boolean).join(' · ')}
            </p>
          </div>
          <div style={{
            background: goalType === 'lose' ? 'var(--blue-dim)' : goalType === 'gain' ? 'var(--green-dim)' : 'var(--orange-dim)',
            color: goalType === 'lose' ? 'var(--blue)' : goalType === 'gain' ? 'var(--green)' : 'var(--orange)',
            fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 10,
          }}>
            {GOAL_LABELS[goalType]}
          </div>
        </div>

        {/* Quick stats row */}
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <StatChip label="Height" value={profile?.height ? `${profile.height} cm` : null} color="var(--text-1)" />
          <StatChip label="Weight" value={profile?.currentWeight ? `${profile.currentWeight} kg` : null} color="var(--text-1)" />
          {bmi && <StatChip label="BMI" value={bmi} color={bmiColor} />}
        </div>

        {bmi && (
          <div style={{ marginTop: 10, padding: '10px 14px', background: bmiColor === 'var(--green)' ? 'var(--green-dim)' : 'var(--orange-dim)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>BMI Category</p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: bmiColor }}>{bmiLabel}</p>
          </div>
        )}

        {weightDelta !== null && (
          <div style={{ marginTop: 8, padding: '10px 14px', background: 'var(--surface-3)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>
              {Number(weightDelta) < 0 ? 'Weight to lose' : Number(weightDelta) > 0 ? 'Weight to gain' : 'At target weight'}
            </p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: Number(weightDelta) < 0 ? 'var(--blue)' : 'var(--green)' }}>
              {Math.abs(Number(weightDelta))} kg
            </p>
          </div>
        )}
      </div>

      {/* ── Edit sections ── */}
      <div style={{ padding: '24px 20px 0' }}>

        {/* Name */}
        <div style={{ marginBottom: 22 }}>
          <SectionHeader icon={<User size={14} />} label="Personal Info" color="var(--blue)" />
          <div className="grouped-card">
            <div style={{ padding: '14px 16px' }}>
              <label className="input-label">Your Name</label>
              <input
                className="input"
                style={{ marginTop: 6 }}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Mihir"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderTop: '1px solid var(--sep)' }}>
              <div style={{ padding: '14px 16px', borderRight: '1px solid var(--sep)' }}>
                <label className="input-label">Age</label>
                <input className="input" style={{ marginTop: 6 }} type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="24" />
              </div>
              <div style={{ padding: '14px 16px' }}>
                <label className="input-label">Sex</label>
                <select className="input" style={{ marginTop: 6 }} value={sex} onChange={e => setSex(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Daily goals */}
        <div style={{ marginBottom: 22 }}>
          <SectionHeader icon={<Target size={14} />} label="Daily Goals" color="var(--orange)" />
          <div className="grouped-card">
            <div style={{ padding: '14px 16px' }}>
              <label className="input-label" style={{ color: 'var(--orange)' }}>Calorie Goal (kcal) *</label>
              <input
                className="input"
                style={{ marginTop: 6, fontSize: 22, fontWeight: 700, textAlign: 'center' }}
                type="number"
                value={calorieGoal}
                onChange={e => setCalorieGoal(e.target.value)}
                placeholder="1600"
              />
            </div>
            <div style={{ borderTop: '1px solid var(--sep)', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <label className="input-label">Macro Targets (optional)</label>
                {canAutoCalc && (
                  <button
                    onClick={autoCalcGoals}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      background: 'var(--purple-dim)', border: 'none',
                      borderRadius: 20, padding: '5px 10px',
                      fontSize: 11, fontWeight: 700, color: 'var(--purple)',
                      cursor: 'pointer', fontFamily: 'var(--font)',
                    }}
                  >
                    <Wand2 size={11} />
                    Auto-calc
                  </button>
                )}
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 10 }}>
                Uses Mifflin-St Jeor formula with your body data above.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Protein (g)', value: proteinGoal, set: setProteinGoal, color: 'var(--blue)',   ph: '120' },
                  { label: 'Carbs (g)',   value: carbsGoal,   set: setCarbsGoal,   color: 'var(--orange)', ph: '150' },
                  { label: 'Fat (g)',     value: fatGoal,     set: setFatGoal,     color: 'var(--red)',    ph: '55'  },
                ].map(f => (
                  <div className="input-group" key={f.label}>
                    <label className="input-label" style={{ color: f.color }}>{f.label}</label>
                    <input
                      className="input"
                      type="number"
                      placeholder={f.ph}
                      value={f.value}
                      onChange={e => f.set(e.target.value)}
                      style={{ textAlign: 'center', padding: '11px 6px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Body metrics */}
        <div style={{ marginBottom: 22 }}>
          <SectionHeader icon={<Scale size={14} />} label="Body Metrics" color="var(--green)" />
          <div className="grouped-card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--sep)' }}>
              <div style={{ padding: '14px 16px', borderRight: '1px solid var(--sep)' }}>
                <label className="input-label">Height (cm)</label>
                <input className="input" style={{ marginTop: 6 }} type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="177" />
              </div>
              <div style={{ padding: '14px 16px' }}>
                <label className="input-label">Current Weight (kg)</label>
                <input className="input" style={{ marginTop: 6 }} type="number" value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} placeholder="84" />
              </div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <label className="input-label">Target Weight (kg)</label>
              <input className="input" style={{ marginTop: 6 }} type="number" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} placeholder="75" />
            </div>
          </div>
        </div>

        {/* Activity & Goal */}
        <div style={{ marginBottom: 22 }}>
          <SectionHeader icon={<Activity size={14} />} label="Activity & Goal" color="var(--purple)" />
          <div className="grouped-card">
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--sep)' }}>
              <label className="input-label" style={{ marginBottom: 10, display: 'block' }}>Activity Level</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['low', 'moderate', 'high']).map(level => (
                  <button
                    key={level}
                    onClick={() => setActivityLevel(level)}
                    style={{
                      flex: 1, padding: '10px 6px', borderRadius: 12,
                      border: activityLevel === level ? 'none' : '1.5px solid var(--border)',
                      background: activityLevel === level ? 'var(--purple)' : 'var(--surface-3)',
                      color: activityLevel === level ? '#fff' : 'var(--text-2)',
                      fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)',
                    }}
                  >
                    {ACTIVITY_LABELS[level]}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <label className="input-label" style={{ marginBottom: 10, display: 'block' }}>Goal Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {([
                  { key: 'lose',     label: 'Lose Fat',    color: 'var(--blue)'   },
                  { key: 'maintain', label: 'Maintain',    color: 'var(--orange)' },
                  { key: 'gain',     label: 'Gain Muscle', color: 'var(--green)'  },
                ]).map(g => (
                  <button
                    key={g.key}
                    onClick={() => setGoalType(g.key)}
                    style={{
                      flex: 1, padding: '10px 6px', borderRadius: 12,
                      border: goalType === g.key ? 'none' : '1.5px solid var(--border)',
                      background: goalType === g.key ? g.color : 'var(--surface-3)',
                      color: goalType === g.key ? '#fff' : 'var(--text-2)',
                      fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)',
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <button
          className="btn btn-primary w-full"
          onClick={handleSave}
          style={{
            marginBottom: 12,
            background: saved
              ? 'linear-gradient(135deg, #16a34a, var(--green))'
              : undefined,
          }}
        >
          {saved ? <><CheckCircle2 size={16} /> Saved!</> : <><Edit3 size={16} /> Save Changes</>}
        </button>
      </div>
    </div>
  )
}
