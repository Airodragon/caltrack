import React, { createContext, useContext, useReducer, useEffect, useRef, useMemo } from 'react'
import {
  storage, DEFAULT_HABITS, DEFAULT_FOOD_CATALOG, todayKey, genId,
  getLastNDays, sumMealNutrients, calculateAdherenceScore, rollingAverage,
} from '../utils/helpers'

// Winner-takes-all merge: if remote is newer, use remote; otherwise keep local.
const mergeByLatest = (localValue, remoteValue, updatedAtLocal, updatedAtRemote) => {
  if (!remoteValue) return localValue
  if (!localValue) return remoteValue
  if (!updatedAtLocal) return remoteValue
  if (!updatedAtRemote) return localValue
  return new Date(updatedAtRemote) >= new Date(updatedAtLocal) ? remoteValue : localValue
}

const defaultProfile = {
  name: '',
  calorieGoal: 2000,
  proteinGoal: 120,
  carbsGoal: 200,
  fatGoal: 60,
  height: null,
  heightUnit: 'cm',
  currentWeight: null,
  targetWeight: null,
  weightUnit: 'kg',
  age: null,
  sex: 'prefer_not_to_say',
  activityLevel: 'moderate',
  goalType: 'maintain',
}

// Empty user-data shape used when clearing between accounts
const emptyUserData = () => ({
  profile: null,
  habits: DEFAULT_HABITS,
  habitLogs: {},
  meals: {},
  weights: {},
  checkins: {},
  customFoods: [],
  mealPlanLogs: {},
  waterLogs: {},
  lastUpdatedAt: null,
})

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
const getInitialState = () => {
  ;(() => {
    const schemaVersion = 'caltrack_schema_v2_auth'
    const current = storage.get('caltrack_schema_version', null)
    if (current !== schemaVersion) {
      Object.keys(localStorage)
        .filter(key => key.startsWith('caltrack_'))
        .forEach(key => localStorage.removeItem(key))
      storage.set('caltrack_schema_version', schemaVersion)
    }
  })()
  try {
    localStorage.removeItem('caltrack_ai_snapshots')
  } catch { /* noop */ }

  return {
    profile: storage.get('caltrack_profile', null),
    habits: storage.get('caltrack_habits', DEFAULT_HABITS),
    habitLogs: storage.get('caltrack_habit_logs', {}),
    meals: storage.get('caltrack_meals', {}),
    weights: storage.get('caltrack_weights', {}),
    checkins: storage.get('caltrack_checkins', {}),
    customFoods: storage.get('caltrack_custom_foods', []),
    mealPlanLogs: storage.get('caltrack_meal_plan_logs', {}),
    waterLogs: storage.get('caltrack_water_logs', {}),
    toast: null,
    syncing: false,
    syncKey: storage.get('caltrack_sync_key', null),
    lastUpdatedAt: storage.get('caltrack_last_updated_at', null),
  }
}

// ── Reducer ───────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: { ...defaultProfile, ...action.payload } }
    case 'SET_SYNC_KEY':
      return { ...state, syncKey: action.payload }
    case 'SET_LAST_UPDATED_AT':
      return { ...state, lastUpdatedAt: action.payload }
    case 'HYDRATE':
      return { ...state, ...action.payload }

    // Bug 3 fix: clear all user data when switching accounts
    case 'CLEAR_USER_DATA':
      return { ...state, ...emptyUserData() }

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
    case 'ADD_CUSTOM_FOOD':
      return { ...state, customFoods: [action.payload, ...state.customFoods] }
    case 'DELETE_CUSTOM_FOOD':
      return { ...state, customFoods: state.customFoods.filter(f => f.id !== action.payload) }
    case 'UPDATE_CUSTOM_FOOD':
      return {
        ...state,
        customFoods: state.customFoods.map(f =>
          f.id === action.payload.id ? { ...f, ...action.payload.updates } : f
        ),
      }
    case 'ADD_WEIGHT': {
      const { date, weight } = action.payload
      return { ...state, weights: { ...state.weights, [date]: weight } }
    }
    case 'ADD_CHECKIN': {
      const { weekKey, payload } = action.payload
      return { ...state, checkins: { ...state.checkins, [weekKey]: payload } }
    }
    case 'DELETE_MEAL': {
      const { date, mealId } = action.payload
      return { ...state, meals: { ...state.meals, [date]: (state.meals[date] || []).filter(m => m.id !== mealId) } }
    }

    case 'ADD_WATER': {
      const { date, ml } = action.payload
      return { ...state, waterLogs: { ...state.waterLogs, [date]: (state.waterLogs[date] || 0) + ml } }
    }
    case 'RESET_WATER': {
      const dateKey = action.payload
      return { ...state, waterLogs: { ...state.waterLogs, [dateKey]: 0 } }
    }
    case 'REORDER_HABIT': {
      const { fromIndex, toIndex } = action.payload
      const arr = [...state.habits]
      const [item] = arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, item)
      return { ...state, habits: arr }
    }
    case 'LOG_PLAN_MEAL': {
      const { date, slotKey } = action.payload
      const existing = state.mealPlanLogs[date] || []
      const already = existing.includes(slotKey)
      return {
        ...state,
        mealPlanLogs: {
          ...state.mealPlanLogs,
          [date]: already ? existing.filter(k => k !== slotKey) : [...existing, slotKey],
        },
      }
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

  // Bug 2 fix: always-current ref so the onSnapshot closure is never stale
  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state })

  // Bug 1 fix: block push until the initial snapshot has been attempted
  const hasAttemptedInitialSync = useRef(false)

  // Track the previous syncKey so we can detect account switches
  const prevSyncKeyRef = useRef(state.syncKey)

  const today = todayKey()

  // ── Persist to localStorage ──────────────────────────────
  useEffect(() => {
    storage.set('caltrack_profile', state.profile)
    storage.set('caltrack_habits', state.habits)
    storage.set('caltrack_habit_logs', state.habitLogs)
    storage.set('caltrack_meals', state.meals)
    storage.set('caltrack_weights', state.weights)
    storage.set('caltrack_checkins', state.checkins)
    storage.set('caltrack_custom_foods', state.customFoods)
    storage.set('caltrack_meal_plan_logs', state.mealPlanLogs)
    storage.set('caltrack_water_logs', state.waterLogs)
    storage.set('caltrack_sync_key', state.syncKey)
    storage.set('caltrack_last_updated_at', state.lastUpdatedAt)
  }, [state.profile, state.habits, state.habitLogs, state.meals, state.weights, state.checkins, state.customFoods, state.mealPlanLogs, state.waterLogs, state.syncKey])

  // ── Firestore real-time sync ──────────────────────────────
  useEffect(() => {
    if (!state.syncKey) return

    // Bug 3 fix: if the syncKey changed (account switch), clear previous user's data first
    if (prevSyncKeyRef.current && prevSyncKeyRef.current !== state.syncKey) {
      dispatch({ type: 'CLEAR_USER_DATA' })
    }
    prevSyncKeyRef.current = state.syncKey

    // Reset the initial-sync guard for this account
    hasAttemptedInitialSync.current = false

    let active = true

    const setupSync = async () => {
      const fs = await getFirestore()
      if (!fs || !active) return

      const { db, doc, onSnapshot } = fs
      const userDoc = doc(db, 'users', state.syncKey)

      const unsub = onSnapshot(userDoc, (snap) => {
        // Mark that we've received the first response (even if doc doesn't exist yet)
        hasAttemptedInitialSync.current = true

        if (!snap.exists()) return

        const data = snap.data()
        const s = stateRef.current  // Bug 2 fix: use ref, not stale closure

        isSyncingFromCloud.current = true
        dispatch({
          type: 'HYDRATE',
          payload: {
            profile:      mergeByLatest(s.profile,      data.profile,      s.lastUpdatedAt, data.updatedAt),
            habits:       mergeByLatest(s.habits,       data.habits,       s.lastUpdatedAt, data.updatedAt),
            habitLogs:    mergeByLatest(s.habitLogs,    data.habitLogs,    s.lastUpdatedAt, data.updatedAt),
            meals:        mergeByLatest(s.meals,        data.meals,        s.lastUpdatedAt, data.updatedAt),
            weights:      mergeByLatest(s.weights,      data.weights,      s.lastUpdatedAt, data.updatedAt),
            checkins:     mergeByLatest(s.checkins,     data.checkins,     s.lastUpdatedAt, data.updatedAt),
            customFoods:  mergeByLatest(s.customFoods,  data.customFoods,  s.lastUpdatedAt, data.updatedAt),
            mealPlanLogs: mergeByLatest(s.mealPlanLogs, data.mealPlanLogs, s.lastUpdatedAt, data.updatedAt),
            waterLogs:    mergeByLatest(s.waterLogs,    data.waterLogs,    s.lastUpdatedAt, data.updatedAt),
            lastUpdatedAt: data.updatedAt || s.lastUpdatedAt,
          },
        })
        setTimeout(() => { isSyncingFromCloud.current = false }, 150)
      }, () => {
        // On permission error or offline: unblock push so local writes still proceed
        hasAttemptedInitialSync.current = true
      })

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
    // Bug 1 fix: never push before the first snapshot response
    if (!state.syncKey || isSyncingFromCloud.current || !hasAttemptedInitialSync.current) return

    clearTimeout(pushTimeoutRef.current)
    pushTimeoutRef.current = setTimeout(async () => {
      if (isSyncingFromCloud.current) return  // guard again after debounce delay

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
          weights: state.weights,
          checkins: state.checkins,
          customFoods: state.customFoods,
          mealPlanLogs: state.mealPlanLogs,
          waterLogs: state.waterLogs,
          updatedAt: nowIso,
        }, { merge: true })
        dispatch({ type: 'SET_LAST_UPDATED_AT', payload: nowIso })
      } catch { /* offline — will retry on next change */ }
      finally {
        dispatch({ type: 'SET_SYNCING', payload: false })
      }
    }, 1500)
  }, [state.profile, state.habits, state.habitLogs, state.meals, state.weights, state.checkins, state.customFoods, state.mealPlanLogs, state.waterLogs, state.syncKey, state.lastUpdatedAt])

  // ── Toast auto-dismiss ────────────────────────────────────
  useEffect(() => {
    if (!state.toast) return
    const t = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 2000)
    return () => clearTimeout(t)
  }, [state.toast])

  // Ensure legacy profiles are upgraded to current schema.
  useEffect(() => {
    if (!state.profile) return
    const merged = { ...defaultProfile, ...state.profile }
    const changed = JSON.stringify(merged) !== JSON.stringify(state.profile)
    if (changed) {
      dispatch({ type: 'SET_PROFILE', payload: merged })
    }
  }, [state.profile])

  // ── Derived values ────────────────────────────────────────
  const todayMeals = state.meals[today] || []
  const todayCalories = Math.round(todayMeals.reduce((s, m) => s + (m.calories || 0) * (m.multiplier || 1), 0))
  const todayProtein = Math.round(todayMeals.reduce((s, m) => s + (m.protein || 0) * (m.multiplier || 1), 0))
  const todayCarbs = Math.round(todayMeals.reduce((s, m) => s + (m.carbs || 0) * (m.multiplier || 1), 0))
  const todayFat = Math.round(todayMeals.reduce((s, m) => s + (m.fat || 0) * (m.multiplier || 1), 0))
  const todayHabits = state.habitLogs[today] || []
  const habitsDoneCount = todayHabits.length
  const habitsTotal = state.habits.length

  const selectors = useMemo(() => {
    const calorieGoal = state.profile?.calorieGoal || defaultProfile.calorieGoal
    const proteinGoal = state.profile?.proteinGoal || 0

    const getDailySummary = (date) => {
      const nutrients = sumMealNutrients(state.meals[date] || [])
      const mealTypeTotals = (state.meals[date] || []).reduce((acc, meal) => {
        const type = meal.type || 'Snack'
        acc[type] = (acc[type] || 0) + (meal.calories || 0)
        return acc
      }, {})
      return {
        date,
        ...nutrients,
        mealTypeTotals,
        adherenceScore: calculateAdherenceScore({
          calories: nutrients.calories,
          protein: nutrients.protein,
          calorieGoal,
          proteinGoal,
        }),
      }
    }

    const getRangeAnalytics = (range = 7) => {
      const days = getLastNDays(range)
      const daily = days.map(getDailySummary)
      const totals = daily.reduce((acc, day) => ({
        calories: acc.calories + day.calories,
        protein: acc.protein + day.protein,
        carbs: acc.carbs + day.carbs,
        fat: acc.fat + day.fat,
      }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
      const nonZeroDays = daily.filter(d => d.calories > 0)
      const avgAdherenceScore = daily.length ? Math.round(daily.reduce((sum, d) => sum + d.adherenceScore, 0) / daily.length) : 0
      const weeklyDeficit = (calorieGoal * range) - totals.calories
      return {
        range,
        days,
        daily,
        totals,
        avgPerDay: {
          calories: Math.round(totals.calories / range),
          protein: Math.round(totals.protein / range),
          carbs: Math.round(totals.carbs / range),
          fat: Math.round(totals.fat / range),
        },
        adherence: {
          avgScore: avgAdherenceScore,
          daysUnderGoal: daily.filter(d => d.calories > 0 && d.calories <= calorieGoal).length,
          daysOverGoal: daily.filter(d => d.calories > calorieGoal).length,
          daysWithLogs: nonZeroDays.length,
        },
        weeklyDeficit,
      }
    }

    const getWeekComparison = () => {
      const thisWeek = getRangeAnalytics(7)
      const past14 = getLastNDays(14)
      const lastWeekDays = past14.slice(0, 7)
      const lastWeekDaily = lastWeekDays.map(getDailySummary)
      const lastWeekCalories = lastWeekDaily.reduce((sum, d) => sum + d.calories, 0)
      const thisWeekCalories = thisWeek.totals.calories
      const change = thisWeekCalories - lastWeekCalories
      return {
        thisWeekCalories,
        lastWeekCalories,
        deltaCalories: change,
        deltaPct: lastWeekCalories > 0 ? Math.round((change / lastWeekCalories) * 100) : 0,
      }
    }

    const getRiskWindows = (range = 30) => {
      const days = getLastNDays(range)
      const slots = { morning: 0, afternoon: 0, evening: 0, lateNight: 0 }
      days.forEach((date) => {
        (state.meals[date] || []).forEach((meal) => {
          const mealDate = meal.time ? new Date(meal.time) : null
          const hour = mealDate ? mealDate.getHours() : null
          if (hour === null) return
          if (hour < 11) slots.morning += meal.calories || 0
          else if (hour < 16) slots.afternoon += meal.calories || 0
          else if (hour < 21) slots.evening += meal.calories || 0
          else slots.lateNight += meal.calories || 0
        })
      })
      const top = Object.entries(slots).sort((a, b) => b[1] - a[1])[0] || ['evening', 0]
      return { slots, topWindow: top[0], topCalories: top[1] }
    }

    const getWeightTrend = (range = 30) => {
      const days = getLastNDays(range)
      const values = days.map(d => state.weights[d] ?? null)
      const smooth = rollingAverage(values, 7)
      const valid = values.filter(v => typeof v === 'number')
      return {
        days,
        values,
        smooth,
        start: valid.length ? valid[0] : null,
        latest: valid.length ? valid[valid.length - 1] : null,
        delta: valid.length > 1 ? Number((valid[valid.length - 1] - valid[0]).toFixed(2)) : null,
      }
    }

    return { getDailySummary, getRangeAnalytics, getWeekComparison, getRiskWindows, getWeightTrend }
  }, [state.meals, state.profile, state.weights])

  const actions = {
    setProfile: (p) => dispatch({ type: 'SET_PROFILE', payload: { ...defaultProfile, ...(p || {}) } }),
    setSyncKey: (k) => {
      storage.set('caltrack_sync_key', k)
      dispatch({ type: 'SET_SYNC_KEY', payload: k })
    },
    addHabit: (h) => dispatch({ type: 'ADD_HABIT', payload: { ...h, id: genId() } }),
    deleteHabit: (id) => dispatch({ type: 'DELETE_HABIT', payload: id }),
    toggleHabit: (habitId, date = today) => dispatch({ type: 'TOGGLE_HABIT', payload: { habitId, date } }),
    addMeal: (meal, date = today) => dispatch({
      type: 'ADD_MEAL',
      payload: {
        date,
        meal: {
          ...meal,
          multiplier: Number(meal.multiplier) > 0 ? Number(meal.multiplier) : 1,
          id: genId(),
          time: new Date().toISOString(),
        },
      },
    }),
    deleteMeal: (mealId, date = today) => dispatch({ type: 'DELETE_MEAL', payload: { date, mealId } }),
    addWeight: (weight, date = today) => dispatch({ type: 'ADD_WEIGHT', payload: { date, weight: Number(weight) } }),
    addCheckin: (payload, weekKey = today) => dispatch({ type: 'ADD_CHECKIN', payload: { weekKey, payload: { ...payload, createdAt: new Date().toISOString() } } }),
    showToast: (msg, type = 'success') => dispatch({ type: 'SHOW_TOAST', payload: { msg, type } }),
    getMealsForDate: (date) => state.meals[date] || [],
    getHabitsForDate: (date) => state.habitLogs[date] || [],
    getWeightsForRange: (days) => days.map(d => ({ date: d, weight: state.weights[d] ?? null })),
    getCheckinByWeek: (weekKey) => state.checkins[weekKey] || null,
    addCustomFood: (food) => dispatch({ type: 'ADD_CUSTOM_FOOD', payload: { ...food, id: genId(), createdAt: new Date().toISOString() } }),
    deleteCustomFood: (id) => dispatch({ type: 'DELETE_CUSTOM_FOOD', payload: id }),
    updateCustomFood: (id, updates) => dispatch({ type: 'UPDATE_CUSTOM_FOOD', payload: { id, updates } }),
    getFoodCatalog: () => [...DEFAULT_FOOD_CATALOG, ...(state.customFoods || [])],
    addWater: (ml = 250, date = today) => dispatch({ type: 'ADD_WATER', payload: { date, ml } }),
    resetWater: (date = today) => dispatch({ type: 'RESET_WATER', payload: date }),
    getWaterForDate: (date) => state.waterLogs[date] || 0,
    reorderHabit: (fromIndex, toIndex) => dispatch({ type: 'REORDER_HABIT', payload: { fromIndex, toIndex } }),
    logPlanMeal: (meal, slotKey, date = today) => {
      const already = (state.mealPlanLogs[date] || []).includes(slotKey)
      if (!already) {
        dispatch({
          type: 'ADD_MEAL',
          payload: {
            date,
            meal: {
              name: meal.name,
              type: meal.type,
              calories: meal.calories,
              protein: meal.protein,
              carbs: meal.carbs,
              fat: meal.fat,
              multiplier: 1,
              id: genId(),
              time: new Date().toISOString(),
              fromPlan: true,
            },
          },
        })
      }
      dispatch({ type: 'LOG_PLAN_MEAL', payload: { date, slotKey } })
    },
    isPlanMealLogged: (slotKey, date = today) => (state.mealPlanLogs[date] || []).includes(slotKey),
    ...selectors,
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
