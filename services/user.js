import api from '@/services/api';

export const getUsers = async () => {
  const { data } = await api.get('/user/users');
  return data.data;
};

export const getUser = async (payload) => {
  const { data } = await api.get('/user/user', payload);
  return data.data;
};

export const addUser = async (payload) => {
  const { data } = await api.post('/user/user', payload);
  return data.data;
};

export const updateUser = async (payload) => {
  const { data } = await api.post('/user/update-user', payload);
  return data.data;
};

export const deleteUser = async (payload) => {
  const { data } = await api.post('/user/delete-user', payload);
  return data.data;
};
