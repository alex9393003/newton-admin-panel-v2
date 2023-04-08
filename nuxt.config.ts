// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
        transpile: ['vuetify']
    },
    publicRuntimeConfig: {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    },
    privateRuntimeConfig: {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    },
    plugins: ['~/plugins/typeorm-plugin.ts'],
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
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
