import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.PROJECT_POST_API_KEY,
  authDomain: process.env.PROJECT_POST_AUTH_DOMAIN,
  projectId: process.env.PROJECT_POST_PROJECT_ID,
  storageBucket: process.env.PROJECT_POST_STORAGE_BUCKET,
  messagingSenderId: process.env.PROJECT_POST_MESSAGING_SENDER_ID,
  appId: process.env.PROJECT_POST_APP_ID,
  measurementId: process.env.PROJECT_POST_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
// export const functions = getFunctions(app)
