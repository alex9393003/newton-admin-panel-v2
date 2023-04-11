<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="6" sm="8" md="6">
          <div v-if="DBHost">DB HOST EXISTS</div>
          <div v-else>DB HOST DOES NOT EXIST</div>
          <v-hover
          v-slot="{ isHovering, props }"
          open-delay="50"
        >
          <v-card
            :elevation="isHovering ? 16 : 2"
            :class="{ 'on-hover': isHovering }"
            class="mx-auto"
            height="200"
            v-bind="props"
          >
            <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
              Open Delay (Mouse enter)
            </v-card-text>
          </v-card>
        </v-hover>
        </v-col>
        <v-col cols="6" sm="8" md="6">
          <v-hover
          v-slot="{ isHovering, props }"
          open-delay="50"
        >
          <v-card
            :elevation="isHovering ? 16 : 2"
            :class="{ 'on-hover': isHovering }"
            class="mx-auto"
            height="200"
            v-bind="props"
          >
            <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
              Open Delay (Mouse enter)
            </v-card-text>
          </v-card>
        </v-hover>
        </v-col>
      </v-row>
  
  
    </v-container>
      
    </template>
    
    <script>


    export default {


    data () {
      DBHost: null
    },

    async mounted() {
      const { publicConfig } = useRuntimeConfig()
      this.DBHost = publicConfig
    },
    }
    </script>
  
    <!-- <style lang="sass" scoped><template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="logo py-4 d-flex justify-center">
          User Management
        </v-card>
        <v-btn color="primary"></v-btn>
        <v-card>
  
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>

  
  export default {
    name: 'User Management',
    async mounted() {

  
    },
  }
  </script>
  
    .v-card.on-hover.v-theme--dark
      background-color: rgba(#FFF, 0.8)
      >.v-card__text
        color: #000
    </style> -->
    