import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const baseURL = config.API_BASE_URL;
  const api = axios.create({
    baseURL: baseURL,
    headers: {
      common: {},
    },
  });

  // make the global variable $api available in all components
  nuxtApp.vueApp.config.globalProperties.$api = api;
});