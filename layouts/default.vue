<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
      <!-- <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
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
          <!-- <v-list-item :prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item :prepend-icon="mdi-forum" title="About" value="about"></v-list-item> -->
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

      <v-toolbar-title>Application</v-toolbar-title>
      <v-switch class="d-flex justify-end mr-4" v-model="themeToggler"></v-switch>
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
          to: '/patient/notes'
        },

        
      ];
watch(themeToggler, () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
});

</script>