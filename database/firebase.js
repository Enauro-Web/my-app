import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCyO9I24D7dSlbCp3OeJFXdZhbu0L38wzg",
  authDomain: "react-native-firebase-4ba5d.firebaseapp.com",
  projectId: "react-native-firebase-4ba5d",
  storageBucket: "react-native-firebase-4ba5d.appspot.com",
  messagingSenderId: "108514116898",
  appId: "1:108514116898:web:3d3193e5a5615a3f3b117b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
