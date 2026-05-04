// ── Storage Utilities ──────────────────────────────────────────

const KEYS = {
  PROFILE: 'caltrack_profile',
  HABITS: 'caltrack_habits',
  HABIT_LOGS: 'caltrack_habit_logs',
  MEALS: 'caltrack_meals',
}

export const storage = {
  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch { return fallback }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
}

// ── Default Data ───────────────────────────────────────────────

export const DEFAULT_HABITS = [
  { id: 'h1', name: 'Drink 8 glasses of water', icon: 'droplets', color: '#60A5FA' },
  { id: 'h2', name: 'Morning walk', icon: 'footprints', color: '#7CFC8C' },
  { id: 'h3', name: 'Sleep 8 hours', icon: 'bed', color: '#A78BFA' },
  { id: 'h4', name: 'Meditate 10 min', icon: 'brain', color: '#F472B6' },
  { id: 'h5', name: 'No phone after 10pm', icon: 'smartphone', color: '#FBBF24' },
]

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

export const MACRO_COLORS = {
  protein: '#60A5FA',
  carbs: '#FBBF24',
  fat: '#F472B6',
}

// ── Date Utilities ─────────────────────────────────────────────

const pad = (value) => String(value).padStart(2, '0')

export const toLocalDateKey = (dateInput = new Date()) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export const parseDateKey = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return new Date()
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, (month || 1) - 1, day || 1)
}

export const todayKey = () => toLocalDateKey()

export const formatDate = (dateStr) => {
  const d = parseDateKey(dateStr)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export const getLastNDays = (n) => {
  const days = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(toLocalDateKey(d))
  }
  return days
}

export const getDayLabel = (dateStr) => {
  const d = parseDateKey(dateStr)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[d.getDay()]
}

export const greetingByTime = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

// ── ID Generator ───────────────────────────────────────────────

export const genId = () => Math.random().toString(36).slice(2, 10)
