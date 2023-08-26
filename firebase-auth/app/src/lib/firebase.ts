import { initializeApp } from "firebase/app";

import {
  connectAuthEmulator,
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export function auth(): Auth {
  const auth = getAuth(app);
  if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9099");
  }
  return auth;
}

export async function createUser(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth(), email, password);
  return cred.user;
}
