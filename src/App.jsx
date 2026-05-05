import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Routine from './pages/Routine'
import Calories from './pages/Calories'
import Stats from './pages/Stats'
import Coach from './pages/Coach'
import BottomNav from './components/BottomNav'
import Toast from './components/Toast'
import LoadingScreen from './components/LoadingScreen'

function AppRoutes() {
  const { profile, syncing, setSyncKey } = useApp()
  const [booting, setBooting] = useState(true)
  const [theme, setTheme] = useState(() => localStorage.getItem('caltrack_theme') || 'light')
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user || null)
      if (user?.uid) setSyncKey(user.uid)
    })
    return () => unsub()
  }, [setSyncKey])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('caltrack_theme', theme)
  }, [theme])

  if (booting) return <LoadingScreen />

  if (!authUser) return <Auth />

  if (!profile) return <Onboarding />

  return (
    <BrowserRouter>
      <div className="app-shell">
        {syncing && <div className="sync-pill">Syncing...</div>}
        <Toast />
        <div className="route-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/routine" element={<Routine />} />
            <Route path="/calories" element={<Calories />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/coach" element={<Coach />} />
          </Routes>
        </div>
        <BottomNav
          theme={theme}
          onToggleTheme={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
          onSignOut={() => signOut(auth)}
        />
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
