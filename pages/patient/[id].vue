

<template>
    <div>
      <v-container>
        <v-row>
            <v-col cols="8">
                <v-card class="elevation-4">
                    <div class="py-5 d-flex">
                    <v-card-title>
                        Notes List
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="ma-2 pa-2">Add New Note</v-btn>
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
                        v-for="item in notes"
                        :key="item.id"
                    >
                        <td>{{ item.firstName }}</td>
                        <td>{{ item.lastName }}</td>
                        <td class="d-flex justify-end">
                        <v-btn class="ma-2 pa-2" color="primary" @click="seePatient(item)">See Note</v-btn>
                        </td>
                    </tr>
                    </tbody>
                    
                </v-table>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <div class="d-flex align-center justify-space-around py-16">
                        <v-avatar color="info" size="x-large">
                            MT
                        </v-avatar>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                        <v-card-title>
                            Hello
                        </v-card-title>
                    </div>
                </v-card>
            </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import { getPatients } from '~~/services/patient';

    export default {
      data () {
        return {
            notes: [],
          
        }
      },
      async mounted() {
        console.log('mounted!');
        // get notes from notes service
        this.notes = await getPatients();
        console.log(this.notes);
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