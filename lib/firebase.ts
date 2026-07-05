import { initializeApp, type FirebaseApp } from "firebase/app"
import { getDatabase, Database } from "firebase/database"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean)

let app: FirebaseApp | null = null
let database: Database | null = null

const getFirebaseDatabase = (): Database | null => {
  if (typeof window === "undefined") return null
  if (!hasFirebaseConfig) return null

  if (!database) {
    app = initializeApp(firebaseConfig)
    database = getDatabase(app)
  }

  return database
}

export { getFirebaseDatabase }