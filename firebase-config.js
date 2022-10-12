import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAQ_uzVLE7k4FWI3wo2xfcRCpDxn9AKls",
  authDomain: "gomotors-364001.firebaseapp.com",
  projectId: "gomotors-364001",
  storageBucket: "gomotors-364001.appspot.com",
  messagingSenderId: "401145415501",
  appId: "1:401145415501:web:ab2641b5fe73da0d551904",
  measurementId: "G-DQNM01K0M8",
};

const getDatabase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
};
export { getDatabase };

const getConnection = () => {
  const app = initializeApp(firebaseConfig);
  return app;
};
export { getConnection };
