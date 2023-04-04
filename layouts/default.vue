<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list-item
          class="my-5"
          title="Pynkerton Chiropractic"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            :title="item.title"
            :value="item.value"
            :prepend-icon="item.icon"
          ></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn color="primary" block>
              Logout
            </v-btn>
          </div>
        </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Pynkerton Chiropractic</v-toolbar-title>
      <v-switch class="d-flex justify-end mr-4" v-model="themeToggler"></v-switch>
          <v-menu
            min-width="200px"
            rounded
          >
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
                class="mx-16"
              >
                <v-avatar
                  color="brown"
                  size="large"
                >
                  <span class="text-h5">{{ user.initials }}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar
                    color="brown"
                  >
                    <span class="text-h5">{{ user.initials }}</span>
                  </v-avatar>
                  <h3>{{ user.fullName }}</h3>
                  <p class="text-caption mt-1">
                    {{ user.email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn
                    rounded
                    variant="text"
                  >
                    Edit Account
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn
                    rounded
                    variant="text"
                  >
                    Disconnect
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>

<script setup>
import { useTheme } from "vuetify";
import Home from '@/pages/index.vue';
const theme = useTheme();
const drawer = ref(null);
const themeToggler = ref(false);
const user =  {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      };
const items =  [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Patients',
          to: '/patient'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Notes',
          to: '/notes'
        },

        
      ];
watch(themeToggler, () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
});

</script>