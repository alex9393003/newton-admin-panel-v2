import api from '@/services/api';

export const getPatients = async () => {
  const { data } = await api.get('/patients');
  return data.data;
};

export const addPatient = async (payload) => {
  const { data } = await api.post('/patient', payload);
  return data.data;
};

