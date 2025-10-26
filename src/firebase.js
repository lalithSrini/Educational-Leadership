import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCrBXHjH6vjUzv_TlqDoZRu3cuXjg2ofMk",
  authDomain: "nptel-28406.firebaseapp.com",
  databaseURL: "https://nptel-28406-default-rtdb.firebaseio.com",
  projectId: "nptel-28406",
  storageBucket: "nptel-28406.firebasestorage.app",
  messagingSenderId: "46807035613",
  appId: "1:46807035613:web:9361dd60b67fa03961f534",
  measurementId: "G-99HJQ4N6D3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
