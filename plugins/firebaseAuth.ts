import { initializeApp } from 'firebase/app';

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig();

    // Your web app's Firebase configuration
    // create below firebase config again but with config.public

const firebaseConfig = {
  apiKey: "AIzaSyC5rkN0RF93_q1uYgoGQF7ex5TFryaussA",
  authDomain: "lolt-bb9aa.firebaseapp.com",
  projectId: "lolt-bb9aa",
  storageBucket: "lolt-bb9aa.appspot.com",
  messagingSenderId: "632100441282",
  appId: "1:632100441282:web:4dc8d680f755e7d0baff5b"
};

    // const firebaseConfig = {
    //     apiKey: "AIzaSyAW9gqgxAIw7tUhc4vaTR72mI13E3HsxOg",
    //     authDomain: "nuxt3-firebase-newton.firebaseapp.com",
    //     projectId: "nuxt3-firebase-newton",
    //     storageBucket: "nuxt3-firebase-newton.appspot.com",
    //     messagingSenderId: "465500202689",
    //     appId: "1:465500202689:web:abaab7f190a9326ed51640",
    // };

    // Initialize Firebase
    initializeApp(firebaseConfig);
});
