import { initializeApp } from 'firebase/app';

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig();

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: config.FIREBASE_API_KEY,
        // authDomain: "nuxt3-firebase-newton.firebaseapp.com",
        // projectId: "nuxt3-firebase-newton",
        // storageBucket: "nuxt3-firebase-newton.appspot.com",
        // messagingSenderId: "465500202689",
        // appId: "1:465500202689:web:abaab7f190a9326ed51640"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log(app);


});