import api from '@/services/api';

export const getUsers = async () => {
  const { data } = await api.get('/user/users');
  return data.data;
};

export const getUser = async (payload) => {
  const { data } = await api.get('/user/user', payload);
  return data.data;
};

export const getUserByFirebaseUID = async (payload) => {
  const { data } = await api.post('/user/user-uid', payload);
  return data.data;
};

export const addUser = async (payload) => {
  try {

    const credentials = await createUser(payload.email, payload.password);
    if (credentials && credentials.user) {
      const firebaseUid = credentials.user.uid;

      // Save user data in your PostgreSQL database
      const response = await api.post('/user/user', {
        payload,
        firebaseUid
      });

      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (payload) => {
  const { data } = await api.post('/user/update-user', payload);
  return data.data;
};

export const deleteUser = async (payload) => {
  const { data } = await api.post('/user/delete-user', payload);
  return data.data;
};
