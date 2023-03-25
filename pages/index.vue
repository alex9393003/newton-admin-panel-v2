<template>
  <v-container>
    <v-row justify="center" align="center">
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
    name: 'Home',
    async mounted() {

  
    },
  }
  </script>

  <!-- <style lang="sass" scoped>
  .v-card.on-hover.v-theme--dark
    background-color: rgba(#FFF, 0.8)
    >.v-card__text
      color: #000
  </style> -->
  