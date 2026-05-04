import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react'
import { storage, DEFAULT_HABITS, todayKey, genId } from '../utils/helpers'

const mergeByLatest = (localValue, remoteValue, updatedAtLocal, updatedAtRemote) => {
  if (!remoteValue) return localValue
  if (!localValue) return remoteValue
  if (!updatedAtLocal) return remoteValue
  if (!updatedAtRemote) return localValue
  return new Date(updatedAtRemote) >= new Date(updatedAtLocal) ? remoteValue : localValue
}

// ── Firestore sync (lazy import so app works without Firebase config) ──────
let firestoreModule = null
const getFirestore = async () => {
  if (firestoreModule) return firestoreModule
  try {
    const { db } = await import('../firebase.js')
    const { doc, setDoc, onSnapshot } = await import('firebase/firestore')
    firestoreModule = { db, doc, setDoc, onSnapshot }
    return firestoreModule
  } catch {
    return null
  }
}

// ── Initial State ─────────────────────────────────────────────
const getInitialState = () => ({
  profile: storage.get('caltrack_profile', null),
  habits: storage.get('caltrack_habits', DEFAULT_HABITS),
  habitLogs: storage.get('caltrack_habit_logs', {}),
  meals: storage.get('caltrack_meals', {}),
  toast: null,
  syncing: false,
  syncKey: storage.get('caltrack_sync_key', null),
  lastUpdatedAt: storage.get('caltrack_last_updated_at', null),
})

// ── Reducer ───────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload }
    case 'SET_SYNC_KEY':
      return { ...state, syncKey: action.payload }
    case 'SET_LAST_UPDATED_AT':
      return { ...state, lastUpdatedAt: action.payload }
    case 'HYDRATE':
      return { ...state, ...action.payload }

    case 'ADD_HABIT':
      return { ...state, habits: [...state.habits, action.payload] }
    case 'DELETE_HABIT':
      return { ...state, habits: state.habits.filter(h => h.id !== action.payload) }
    case 'TOGGLE_HABIT': {
      const { habitId, date } = action.payload
      const dayLogs = state.habitLogs[date] || []
      const exists = dayLogs.includes(habitId)
      const updated = exists ? dayLogs.filter(id => id !== habitId) : [...dayLogs, habitId]
      return { ...state, habitLogs: { ...state.habitLogs, [date]: updated } }
    }

    case 'ADD_MEAL': {
      const { date, meal } = action.payload
      const dayMeals = state.meals[date] || []
      return { ...state, meals: { ...state.meals, [date]: [...dayMeals, meal] } }
    }
    case 'DELETE_MEAL': {
      const { date, mealId } = action.payload
      return { ...state, meals: { ...state.meals, [date]: (state.meals[date] || []).filter(m => m.id !== mealId) } }
    }

    case 'SHOW_TOAST':
      return { ...state, toast: action.payload }
    case 'CLEAR_TOAST':
      return { ...state, toast: null }
    case 'SET_SYNCING':
      return { ...state, syncing: action.payload }

    default: return state
  }
}

// ── Context ───────────────────────────────────────────────────
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)
  const unsubscribeRef = useRef(null)
  const isSyncingFromCloud = useRef(false)

  const today = todayKey()

  // ── Persist to localStorage ──────────────────────────────
  useEffect(() => {
    storage.set('caltrack_profile', state.profile)
    storage.set('caltrack_habits', state.habits)
    storage.set('caltrack_habit_logs', state.habitLogs)
    storage.set('caltrack_meals', state.meals)
    storage.set('caltrack_sync_key', state.syncKey)
    storage.set('caltrack_last_updated_at', state.lastUpdatedAt)
  }, [state.profile, state.habits, state.habitLogs, state.meals, state.syncKey])

  // ── Firestore real-time sync ──────────────────────────────
  useEffect(() => {
    if (!state.syncKey) return

    let active = true

    const setupSync = async () => {
      const fs = await getFirestore()
      if (!fs || !active) return

      const { db, doc, onSnapshot } = fs
      const userDoc = doc(db, 'users', state.syncKey)

      // Subscribe to remote changes
      const unsub = onSnapshot(userDoc, (snap) => {
        if (!snap.exists()) return
        const data = snap.data()
        isSyncingFromCloud.current = true
        dispatch({
          type: 'HYDRATE',
          payload: {
            profile: mergeByLatest(state.profile, data.profile, state.lastUpdatedAt, data.updatedAt),
            habits: mergeByLatest(state.habits, data.habits, state.lastUpdatedAt, data.updatedAt),
            habitLogs: mergeByLatest(state.habitLogs, data.habitLogs, state.lastUpdatedAt, data.updatedAt),
            meals: mergeByLatest(state.meals, data.meals, state.lastUpdatedAt, data.updatedAt),
            lastUpdatedAt: data.updatedAt || state.lastUpdatedAt,
          }
        })
        setTimeout(() => { isSyncingFromCloud.current = false }, 100)
      }, () => { /* silent fail — offline */ })

      unsubscribeRef.current = unsub
    }

    setupSync()
    return () => {
      active = false
      unsubscribeRef.current?.()
    }
  }, [state.syncKey])

  // ── Push changes to Firestore ─────────────────────────────
  const pushTimeoutRef = useRef(null)
  useEffect(() => {
    if (!state.syncKey || isSyncingFromCloud.current) return

    clearTimeout(pushTimeoutRef.current)
    pushTimeoutRef.current = setTimeout(async () => {
      const fs = await getFirestore()
      if (!fs) return
      const { db, doc, setDoc } = fs
      const nowIso = new Date().toISOString()
      dispatch({ type: 'SET_SYNCING', payload: true })
      try {
        await setDoc(doc(db, 'users', state.syncKey), {
          profile: state.profile,
          habits: state.habits,
          habitLogs: state.habitLogs,
          meals: state.meals,
          updatedAt: nowIso,
        }, { merge: true })
        dispatch({ type: 'SET_LAST_UPDATED_AT', payload: nowIso })
      } catch { /* offline */ }
      finally {
        dispatch({ type: 'SET_SYNCING', payload: false })
      }
    }, 1500) // debounce 1.5s
  }, [state.profile, state.habits, state.habitLogs, state.meals, state.syncKey, state.lastUpdatedAt])

  // ── Toast auto-dismiss ────────────────────────────────────
  useEffect(() => {
    if (!state.toast) return
    const t = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 2000)
    return () => clearTimeout(t)
  }, [state.toast])

  // ── Derived values ────────────────────────────────────────
  const todayMeals = state.meals[today] || []
  const todayCalories = todayMeals.reduce((s, m) => s + (m.calories || 0), 0)
  const todayProtein = todayMeals.reduce((s, m) => s + (m.protein || 0), 0)
  const todayCarbs = todayMeals.reduce((s, m) => s + (m.carbs || 0), 0)
  const todayFat = todayMeals.reduce((s, m) => s + (m.fat || 0), 0)
  const todayHabits = state.habitLogs[today] || []
  const habitsDoneCount = todayHabits.length
  const habitsTotal = state.habits.length

  const actions = {
    setProfile: (p) => dispatch({ type: 'SET_PROFILE', payload: p }),
    setSyncKey: (k) => {
      storage.set('caltrack_sync_key', k)
      dispatch({ type: 'SET_SYNC_KEY', payload: k })
    },
    addHabit: (h) => dispatch({ type: 'ADD_HABIT', payload: { ...h, id: genId() } }),
    deleteHabit: (id) => dispatch({ type: 'DELETE_HABIT', payload: id }),
    toggleHabit: (habitId, date = today) => dispatch({ type: 'TOGGLE_HABIT', payload: { habitId, date } }),
    addMeal: (meal, date = today) => dispatch({ type: 'ADD_MEAL', payload: { date, meal: { ...meal, id: genId(), time: new Date().toISOString() } } }),
    deleteMeal: (mealId, date = today) => dispatch({ type: 'DELETE_MEAL', payload: { date, mealId } }),
    showToast: (msg, type = 'success') => dispatch({ type: 'SHOW_TOAST', payload: { msg, type } }),
    getMealsForDate: (date) => state.meals[date] || [],
    getHabitsForDate: (date) => state.habitLogs[date] || [],
  }

  return (
    <AppContext.Provider value={{
      ...state, today,
      todayMeals, todayCalories, todayProtein, todayCarbs, todayFat,
      habitsDoneCount, habitsTotal,
      ...actions,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
