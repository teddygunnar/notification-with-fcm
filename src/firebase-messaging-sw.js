// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAvtz_Dx2Gl_BGwJbfdFm_MNlLpW10O7Yg",
  authDomain: "push-notif-20217.firebaseapp.com",
  projectId: "push-notif-20217",
  storageBucket: "push-notif-20217.firebasestorage.app",
  messagingSenderId: "150012365894",
  appId: "1:150012365894:web:c08392b34dff2243834e47",
  measurementId: "G-3VKRBNH9G1",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

export const onBackgroundMessaging = (callback) => {
  onBackgroundMessage(messaging, (payload) => {
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
    };
    callback(payload);

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
};

// onBackgroundMessage(messaging, (payload) => {
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
