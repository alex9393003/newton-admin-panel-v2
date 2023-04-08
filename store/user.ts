import { defineStore } from 'pinia'
import { User } from '~~/typeorm/entity/User';

interface UserState {
  user: User;
  isLoggedIn: boolean;
  authInitialized: boolean;
}

export const userStore = defineStore('user', {
  state: () => ({
    user: {} as User,
    isLoggedIn: false,
    authInitialized: false,
  }),

  getters: {
    // getCurrentUser: (state) => state.currentUser,
    getUser: (state: UserState): User | null =>
      Object.keys(state.user).length > 0 ? state.user : null,
    getIsLoggedIn: (state: UserState): boolean => state.isLoggedIn,
    getAuthInitialized: (state: UserState): boolean => state.authInitialized,
  },
  actions: {
    setIsLoggedIn(value: boolean) {
        this.isLoggedIn = value;
    },
    setUser(user: User) {
        this.user = user;
      },
    setAuthInitialized(value: boolean) {
      this.authInitialized = value;
    },
  },
})