import { AxiosInstance } from 'axios';

export function getApiInstance(): AxiosInstance | null {
  const instance = getCurrentInstance();
  if (!instance) return null;
  return instance.appContext.config.globalProperties.$api as AxiosInstance;
}