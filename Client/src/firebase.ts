import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD6uvna-H9ww7yInZHxLAGs13yFYpKGy_o",
  authDomain: "genai-a81e1.firebaseapp.com",
  projectId: "genai-a81e1",
  storageBucket: "genai-a81e1.firebasestorage.app",
  messagingSenderId: "887451361218",
  appId: "1:887451361218:web:d2dc44e6b6fca1f919405b",
  measurementId: "G-RHZ98ZDKZ3",
  databaseURL: "https://genai-a81e1-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app