// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import analytics conditionally only in browser environment
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdEYncokD_8fNUzrCYdfEiS4RkWEVWAwg",
  authDomain: "hopefund-2ae46.firebaseapp.com",
  projectId: "hopefund-2ae46",
  storageBucket: "hopefund-2ae46.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "1047237880211",
  appId: "1:1047237880211:web:e95fdc7563c4f0315de066",
  measurementId: "G-NH3S6DSSKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize auth
const auth = getAuth(app);

// Export the necessary instances
export { app, auth, analytics };
export default app;