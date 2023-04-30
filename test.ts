//https://firebase.google.com/docs/auth/web/start

import { AxiosInstance } from "axios";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createAuthService } from "~/services/auth";
import { createUserService } from "~/services/user";
import { userStore } from '~/store/user';
import { User } from '~/server/typeorm/entity/User';
import { getApiInstance } from "~/utils/apiInstance";


export const createUser = async (email : string, password : string) => {
    const auth = getAuth();

    const credentials = await createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        
        return credentials;
}

export const signInUser = async (email: string, password: string) => {
    const api = getApiInstance();
    const auth = getAuth();
    const authService = createAuthService(api as AxiosInstance);
    const store = userStore();

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        if (credentials) {
            const res = await authService.signInUserWithAPI(credentials.user.uid);
            // console.log('res is ', res);
            // console.log(typeof(res));
            if (res instanceof Error) {
                // console.log('is this calling');
                console.log('error ', res.message);
                return {
                    error: res.message
                }
            } else if (credentials && res) {
                // console.log('WOOOOO')
                store.setUser(res);
                store.setIsLoggedIn(true);
                // console.log('user is ', store.getUser instanceof User)
                return { success: true, credentials };
            } else {
                return { success: false, error: 'Error signing user in.' };
            }
        } else {
            const res = { success: false, error: 'Error signing user in. Not receiving credentials from Firebase' }
            return res
        }
    } catch (error : any) {
        console.log('Error signing user in:', error);
        return { success: false, error: error.message };
    }
  };

  export const initUser = async () => {
    const api = getApiInstance();
    // console.log('getting past api');
    const auth = getAuth();
    // console.log('getting past auth');
    const store = userStore();
    // console.log('getting past store');
    const userService = createUserService(api as AxiosInstance);
    // console.log('getting past userService');
  
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If the user is logged in, fetch their data from your PostgreSQL database
        try {
          const response = await userService.getUserByFirebaseUID(user.uid);
          if (response instanceof User) {
            // Update the store with the user data
            store.setUser(response);
            store.setIsLoggedIn(true);
          } else {
            // console.log("Invalid response from getUserByFirebaseUID");
          }
        } catch (err) {
          console.error(err);
        }
      }
      store.setAuthInitialized(true); // Set authInitialized to true when onAuthStateChanged is called
    });
  };

export const signOutUser = async () => {
    const store = userStore();
    const auth = getAuth();
    const result = await auth.signOut();
    store.setIsLoggedIn(false);
    store.setUser({} as User);
    return result;
}