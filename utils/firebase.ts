import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY ?? "",
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? "",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID ?? "",
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.EXPO_PUBLIC_SENDER_ID ?? "",
  appId: process.env.EXPO_PUBLIC_APP_ID ?? "",
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID ?? "",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const firestore = getFirestore(app);
export const storage = getStorage(app);
