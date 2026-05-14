import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Routine from './pages/Routine'
import Calories from './pages/Calories'
import Stats from './pages/Stats'
import More from './pages/More'
import MealPlan from './pages/MealPlan'
import BottomNav from './components/BottomNav'
import Toast from './components/Toast'
import LoadingScreen from './components/LoadingScreen'

function AppRoutes() {
  const { profile, syncing, setSyncKey } = useApp()
  const [theme, setTheme] = useState(() => localStorage.getItem('caltrack_theme') || 'light')
  const [authUser, setAuthUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user || null)
      if (user?.uid) setSyncKey(user.uid)
      setAuthReady(true)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('caltrack_theme', theme)
  }, [theme])

  if (!authReady) return <LoadingScreen label="Restoring your session..." />

  if (!authUser) return <Auth />

  if (!profile) return <Onboarding />

  return (
    <BrowserRouter>
      <div className="app-shell">
        {syncing && <div className="sync-pill">Syncing...</div>}
        {isOffline && <div className="offline-pill">Offline mode - data will sync once online</div>}
        <Toast />
        <div className="route-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/routine" element={<Routine />} />
            <Route path="/calories" element={<Calories />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/coach" element={<Navigate to="/" replace />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route
              path="/more"
              element={
                <More
                  theme={theme}
                  onToggleTheme={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
                  onSignOut={() => signOut(auth)}
                />
              }
            />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
