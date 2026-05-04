import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Routine from './pages/Routine'
import Calories from './pages/Calories'
import Stats from './pages/Stats'
import BottomNav from './components/BottomNav'
import Toast from './components/Toast'

function AppRoutes() {
  const { profile } = useApp()

  if (!profile) return <Onboarding />

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Toast />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/calories" element={<Calories />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
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
