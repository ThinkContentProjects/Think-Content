import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDPM5QINEW8q3bvGbSa1b3DxSfESgX0N64",
    authDomain: "think-content-development.firebaseapp.com",
    projectId: "think-content-development",
    storageBucket: "think-content-development.appspot.com",
    messagingSenderId: "3353769567",
    appId: "1:3353769567:web:4be19ad3b04071a1cdcdea",
    measurementId: "G-YXMJNTB1R7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);

export { app, auth, db, storage };