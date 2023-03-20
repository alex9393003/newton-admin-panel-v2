import axios from "axios";
import { baseURL } from "nuxt/dist/core/runtime/nitro/paths";
export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = "<https://localhost:3000>"

  let api = axios.create({
    url: baseURL,
    headers: {
      common: {},
    },
  });
return {
    provide: {
      api: api,
    },
  };
});