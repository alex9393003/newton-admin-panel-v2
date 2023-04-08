import api from '@/services/api';

export const getPatients = async () => {
  const { data } = await api.get('/patient/patients');
  return data.data;
};

export const getPatient = async (payload) => {
  const { data } = await api.get('/patient/patient', payload);
  return data.data;
};

export const addPatient = async (payload) => {
  const { data } = await api.post('/patient/patient', payload);
  return data.data;
};

export const updatePatient = async (payload) => {
  const { data } = await api.post('/patient/update-patient', payload);
  return data.data;
};

export const deletePatient = async (payload) => {
  const { data } = await api.post('/patient/delete-patient', payload);
  return data.data;
};

