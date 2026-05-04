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

// ⬇️ Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
