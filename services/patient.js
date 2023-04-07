import api from '@/services/api';

export const getPatients = async () => {
  const { data } = await api.get('/patient/all-patients');
  return data.data;
};

export const addPatient = async (payload) => {
  const { data } = await api.post('/patient/add-patient', payload);
  return data.data;
};

