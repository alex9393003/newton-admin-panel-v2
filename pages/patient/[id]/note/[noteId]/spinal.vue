<template>
    <div>
      <v-container>
        <v-card class="elevation-4">
          <div class="py-5 d-flex">
            <v-card-title>
              Spinal Entries
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="ma-2 pa-2">Add New Entry +</v-btn>
          </div>
          <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Region
              </th>
              <th class="text-left">
                Level
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
                <v-btn class="ma-2 pa-2" color="primary" @click="seePatient(item)">View Entry</v-btn>
                <v-btn class="ma-2 pa-2" color="primary" @click="seePatient(item)">Edit Entry</v-btn>

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
  
  
    export default {
      data () {
        return {
          patients: [],
        }
      },
      async mounted() {
        console.log('mounted!');
        // get patients from patient service
        this.patients = await getPatients();
        console.log(this.patients);
      },
      methods: {
        seePatient (item) {
          console.log(item)
          // I want to go to the dynamic route 'patient/[id]' of the id associated with the v-table item
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