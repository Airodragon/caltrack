// ============================================================
// CALTRACK — Firebase Config
//
// HOW TO SETUP (takes 5 minutes):
// 1. Go to https://console.firebase.google.com
// 2. Create project → "caltrack-personal" (disable Analytics)
// 3. Go to Firestore Database → Create database → Start in test mode
// 4. Go to Project Settings → "Your apps" → Add Web app
// 5. Copy the firebaseConfig values below
//
// MULTI-DEVICE: Set the same SYNC_KEY on all your devices.
// Your data lives at /users/{SYNC_KEY}/ in Firestore.
// ============================================================

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// ⬇️ Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDOGVQ347cfQlEsHYSqEvSaVS1_B5hi8JY",
  authDomain: "caltrack-personal.firebaseapp.com",
  projectId: "caltrack-personal",
  storageBucket: "caltrack-personal.firebasestorage.app",
  messagingSenderId: "246357751292",
  appId: "1:246357751292:web:268e7a8c7920d5e974ae79",
  measurementId: "G-J631430T4Y"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
