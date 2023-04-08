import api from '@/services/api';

export const signInUserWithAPI = async (email, password) => {
    try {
      const credentials = await signInUser(email, password);
      if (credentials && credentials.user) {
        const firebaseUid = credentials.user.uid;
  
        // Fetch user data from your PostgreSQL database
        const response= await api.post('/auth/uid', { firebaseUid });
  
        // Here, you can store the user data in a Vuex store or some other state management solution
        // to make it accessible throughout your app.
  
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };