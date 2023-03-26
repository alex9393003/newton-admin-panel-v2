import api from '@/services/api';

export const getPatients = async () => {
  const { data } = await api.get('/patients');
  console.log('data are ', data.data);
  return data.data;
};