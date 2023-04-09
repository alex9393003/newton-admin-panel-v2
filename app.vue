<template>
<v-container v-if="!isLoggedIn">
  <v-row class="pt-16">
    <v-col cols="4">

    </v-col>
    <v-col cols="4">
      <!-- create a vuetify 3 log in page -->
      <v-card class="w-full">
        <v-card-title>
          Log In
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              dense
              type="password"
            ></v-text-field>
            <v-btn
              color="primary"
              @click="signIn()"
              :disabled="loading"
            >
              Log In
            </v-btn>
          </v-form>
        </v-card-text>
        <div v-if="loginUnsuccessful">
          <v-card-text color="red">
            Sign in unsuccessful. Please check your user credentials and try again.
          </v-card-text>
        </div>
        
        </v-card>
      
    </v-col>
    <v-col cols="4">
    </v-col>
  </v-row>
</v-container>

<NuxtLayout v-else name="default"></NuxtLayout>

</template>
<script>
import { userStore } from './store/user';


export default {
    data () {
        return {
            email: '',
            password: '',
            loginUnsuccessful: false,
            store: null,
            loading: false,
        }
    },
    computed: {
      isLoggedIn() {
        if (this.store) {
          return this.store.getIsLoggedIn;
        } else  {
          return null;
        }
      }
    },
    async mounted() {
      this.store = userStore();
      await initUser();
    },
    methods: {
      async signIn() {
        this.loading = true;
        try {
          const credentials = await signInUser(this.email, this.password);
          if (!credentials) {
            this.loginUnsuccessful = true;
          }
          return credentials;
        } catch (err) {
          console.log("Sign in unsuccessful", err);
        } finally {
          this.loading = false;
        }
      },
    },
}
</script>