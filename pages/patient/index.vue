<template>
  <div>
    <v-container>
      <v-card class="elevation-4">
        <div class="py-5 d-flex">
          <v-card-title>
            Patient List
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="ma-2 pa-2">Add New Patient</v-btn>
        </div>
        <v-table>
        <thead>
          <tr>
            <th class="text-left">
              firstName
            </th>
            <th class="text-left">
              lastName
            </th>
            <th class="text-left">
            </th>
            
          </tr>
        </thead>
        <tbody class="">
          <tr
            v-for="item in patients"
            :key="item.id"
          >
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td class="d-flex justify-end">
              <v-btn class="ma-2 pa-2" color="primary" @click="goToPatient(item)">See patient</v-btn>
            </td>
          </tr>
        </tbody>
        
      </v-table>


      </v-card>
      
    </v-container>
  </div>
</template>

<script>
import { getPatients } from '~/services/patient';
import { patientStore } from '~~/store/patient';

export default {
  data () {
    return {
      patients: [],
      store: null
    }
  },
  async mounted() {
    this.patients = await getPatients();
    this.store = patientStore();
  },
  computed: {
    currentPatient() {
      return this.store.getCurrentPatient;
    },
},
  methods: {
    goToPatient (item) {
      // I want to go to the dynamic route 'patient/[id]' of the id associated with the v-table item. I want to pass props to that route as well
      this.store.setCurrentPatient(item)
      navigateTo(`/patient/${item.id}`);
    }
  }
}
</script>

<style>
  tbody tr {
    height: 50px;
  }
</style>

// if (this.store.getCurrentPatient) {
  //   console.log('current patient is set', this.store.getCurrentPatient);
  // } else {
  //   console.log('current patient is not set');
  // }
  // this.store.setCurrentPatient({
  //   firstName: 'test',
  //   lastName: 'test'
  // })