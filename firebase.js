// ============================================================
// PERSONAL COURSE STUDIO
// FIREBASE CONNECTION
// Logo + Student Sync
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

// ------------------------------------------------------------
// Firebase Configuration
// ------------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyBUNXeCxRBk6b0_llJliCozY4h9birfEfk",
  authDomain: "mashalive-bd2ea.firebaseapp.com",
  projectId: "mashalive-bd2ea",
  storageBucket: "mashalive-bd2ea.firebasestorage.app",
  messagingSenderId: "941107536088",
  appId: "1:941107536088:web:e1c27f3c526c530eb577ad",
  measurementId: "G-QGYGD52L0Z"
};

// ------------------------------------------------------------
// Initialize Firebase
// ------------------------------------------------------------

const app = initializeApp(firebaseConfig);

// ------------------------------------------------------------
// Firestore
// ------------------------------------------------------------

const db = getFirestore(app);

// ------------------------------------------------------------
// Firebase Storage
// ------------------------------------------------------------

const storage = getStorage(app);

// ------------------------------------------------------------
// Export
// ------------------------------------------------------------

export {
  app,
  db,
  storage
};
