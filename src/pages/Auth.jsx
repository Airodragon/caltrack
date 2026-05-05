import React, { useState } from 'react'
import { Mail, Lock, Globe, LogIn } from 'lucide-react'
import { auth, googleProvider } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Enter email and password')
      return
    }
    setLoading(true)
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email.trim(), password)
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password)
      }
    } catch (e) {
      setError((e && e.message) ? e.message.replace('Firebase: ', '') : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (e) {
      setError((e && e.message) ? e.message.replace('Firebase: ', '') : 'Google sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card anim-pop">
        <p className="page-subtitle">Welcome to CalTrack</p>
        <h1 className="page-title" style={{ fontSize: 30 }}>Train smarter, eat cleaner</h1>

        <div className="chips" style={{ padding: 0, marginTop: 16 }}>
          <button className={`chip ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Login</button>
          <button className={`chip ${mode === 'signup' ? 'active' : ''}`} onClick={() => setMode('signup')}>Create account</button>
        </div>

        <div className="input-group" style={{ marginTop: 16 }}>
          <label className="input-label"><Mail size={12} /> Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="input-group" style={{ marginTop: 12 }}>
          <label className="input-label"><Lock size={12} /> Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>

        {error ? <p style={{ color: 'var(--red)', marginTop: 10, fontSize: 13 }}>{error}</p> : null}

        <button className="btn btn-primary w-full" style={{ marginTop: 14 }} onClick={submit} disabled={loading}>
          <LogIn size={16} /> {mode === 'signup' ? 'Create account' : 'Login'}
        </button>
        <button className="btn btn-ghost w-full" style={{ marginTop: 10 }} onClick={googleLogin} disabled={loading}>
          <Globe size={16} /> Continue with Google
        </button>
      </div>
    </div>
  )
}
