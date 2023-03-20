import api from '@/services/api';

export const getUsers = async () => {
  const { data } = await api.get('/example');
  return data;
};
