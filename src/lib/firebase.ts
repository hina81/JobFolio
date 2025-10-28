import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  serverTimestamp as getServerTimeStamp,
} from "firebase/firestore";
import { getRemoteConfig } from "firebase/remote-config";
import type { RemoteConfig } from "firebase/remote-config";
import { getStorage } from "firebase/storage";
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp({ ...config });

const auth = getAuth(firebaseApp);
auth.languageCode = "ja";

const db = getFirestore(firebaseApp);
const serverTimestamp = getServerTimeStamp();

const storage = getStorage(firebaseApp);

let remoteConfig: RemoteConfig | null = null;
if (typeof window !== "undefined") {
  remoteConfig = getRemoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = 60 * 1000; // 1min
}

const analytics =
  process.env.NODE_ENV === "production" && typeof window !== "undefined"
    ? getAnalytics(firebaseApp)
    : undefined;

export { auth, db, serverTimestamp, storage, remoteConfig, analytics };
