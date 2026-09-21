const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const COLLECTION = import.meta.env.VITE_FIREBASE_COLLECTION || 'dateResponses'

export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

// Firebase is loaded lazily, only when an answer is saved, so the first page loads fast.
let firestore = null
async function getFirestoreApi() {
  if (!firebaseReady) return null
  if (!firestore) {
    const [{ initializeApp, getApps }, api] = await Promise.all([
      import('firebase/app'),
      import('firebase/firestore'),
    ])
    const app = getApps()[0] ?? initializeApp(firebaseConfig)
    firestore = { db: api.getFirestore(app), ...api }
  }
  return firestore
}

/** Saves the final answer. Always keeps a local copy too, so nothing is lost. */
export async function saveDateResponse(answers) {
  const record = {
    ...answers,
    userAgent: navigator.userAgent,
    createdAtLocal: new Date().toISOString(),
  }

  try {
    const prev = JSON.parse(localStorage.getItem('lovely-date-responses') || '[]')
    localStorage.setItem('lovely-date-responses', JSON.stringify([...prev, record]))
  } catch {
    // storage unavailable (private mode etc.) — fine
  }

  if (!firebaseReady) {
    console.warn('[lovely-date] Firebase keys missing — response kept locally only:', record)
    return { ok: false, reason: 'not-configured' }
  }

  try {
    const fs = await getFirestoreApi()
    const ref = await fs.addDoc(fs.collection(fs.db, COLLECTION), {
      ...record,
      createdAt: fs.serverTimestamp(),
    })
    return { ok: true, id: ref.id }
  } catch (err) {
    console.error('[lovely-date] Failed to save to Firestore:', err)
    return { ok: false, reason: 'error', error: err }
  }
}
