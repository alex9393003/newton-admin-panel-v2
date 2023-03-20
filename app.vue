<template>
  <div>
    <!-- <NuxtWelcome /> -->
    {{ myData }}
  </div>
</template>

<script>
// import { getAllUsers } from './typeorm/repositories/UserRepository'
import { getUsers } from './services/user';

export default {

  name: 'App',
  data() {
    return {
      myData: null
    }
  },
  async mounted() {
    // this.myData = await getAllUsers();
    this.myData = await getUsers();
  }
}


</script>
