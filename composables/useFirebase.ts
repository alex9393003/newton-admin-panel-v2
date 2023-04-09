import { AxiosInstance } from "axios";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createAuthService } from "~/services/auth";
import { createUserService } from "~/services/user";
import { userStore } from '~/store/user';
import { User } from '~/typeorm/entity/User';
import { getApiInstance } from '~/utils/getApiInstance';

const api = getApiInstance();
const { signInUserWithAPI } = createAuthService(api as AxiosInstance);
const { getUserByFirebaseUID } = createUserService(api as AxiosInstance);

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
    const auth = getAuth();
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const res = await signInUserWithAPI(email, password);

        if (credentials && res) {
            return { success: true, credentials };
        } else {
            return { success: false, error: 'Error signing user in.' };
        }
    } catch (error : unknown) {
        if (error instanceof Error) {
            console.log('Error signing user in:', error);
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Unknown error.' };
    }
};

export const initUser = async () => {
    const auth = getAuth();
    const store = userStore();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const response = await getUserByFirebaseUID(user.uid);
                if (response) {
                    store.setUser(response);
                    store.setIsLoggedIn(true);
                } else {
                    console.log("Invalid response from getUserByFirebaseUID");
                }
            } catch (error) {
                console.error("Error in initUser:", error);
            }
        }
    });
}

export const signOutUser = async () => {
    const store = userStore();
    const auth = getAuth();
    const result = await auth.signOut();
    store.setIsLoggedIn(false);
    store.setUser({} as User);
    return result;
}