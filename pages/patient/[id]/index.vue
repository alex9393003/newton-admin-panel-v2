

<template>
    <div>
      <v-container>
        <v-row>
            <v-col cols="8">
                <v-card class="elevation-4 mx-5 my-5">
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
                            {{ $route.params.id }}
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
                        <v-btn class="ma-2 pa-2" color="primary" @click="seeNote(item)">See Note</v-btn>
                        </td>
                    </tr>
                    </tbody>
                    
                </v-table>
                </v-card>
                <v-hover
                    v-slot="{ isHovering, props }"
                    open-delay="50"
                >
                    <v-card
                        :elevation="isHovering ? 16 : 2"
                        :class="{ 'on-hover': isHovering }"
                        class="mx-5 my-5"
                        height="200"
                        v-bind="props"
                    >
                        <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
                            Add New Note + 
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>

            <v-col cols="4">
                <v-card class="px-5 mx-5 my-5">
                    <div class="d-flex align-center justify-space-around py-16">
                        <v-avatar color="info" size="x-large">
                            MT
                        </v-avatar>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                        <!-- <v-card-title>
                            Hello
                        </v-card-title> -->
                        <v-label>First Name</v-label>
                        <v-card-text>get(First Name)</v-card-text>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                        <!-- <v-card-title>
                            Hello
                        </v-card-title> -->
                        <v-label>Last Name</v-label>
                        <v-card-text>get(Last Name)</v-card-text>
                    </div>
                </v-card>
            </v-col>
        </v-row>

      </v-container>
    </div>
  </template>
  
  <script>
  import { getPatients } from '~~/services/patient';
//   get Notes 

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
            seeNote(item) {
                this.$router.push(`/patient/${this.$route.params.id}/note/${item.id}`);
            }
        },
            
        
}   
</script>
  
<style>
    tbody tr {
        height: 50px;
    }
</style>