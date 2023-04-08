// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
        transpile: ['vuetify']
    },
    plugins: ['~/plugins/typeorm-plugin.ts', '~/plugins/firebaseAuth.ts'],
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        }
    },
    
    modules: [
        // pinia plugin
        '@pinia/nuxt',
    ],
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },

})
