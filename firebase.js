// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvtz_Dx2Gl_BGwJbfdFm_MNlLpW10O7Yg",
  authDomain: "push-notif-20217.firebaseapp.com",
  projectId: "push-notif-20217",
  storageBucket: "push-notif-20217.firebasestorage.app",
  messagingSenderId: "150012365894",
  appId: "1:150012365894:web:c08392b34dff2243834e47",
  measurementId: "G-3VKRBNH9G1",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
