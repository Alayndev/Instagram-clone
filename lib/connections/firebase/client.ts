// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import serviceAccount from "secret_client.json";

if (typeof window !== "undefined" && !getApps().length) {
  initializeApp(serviceAccount);
}

const getFirebase = () => {
  if (!getApps().length) {
    initializeApp(serviceAccount);
  }

  return getApps()[0];
};

const firebaseApp = getFirebase();

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { storage };
