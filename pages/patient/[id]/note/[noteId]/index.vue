<template>
    <div>
      <v-container>
        <v-btn class="mb-4" @click="backToPatients()">Back to Patient List</v-btn>
        <v-row>
            <!-- This will be the note interface
                - Here we will have a scrollable design
                - We will have the data for the note laid out
                - Sections:
                    - top section is vitals
                        edit button there, which opens up dialog to edit vitals for the note. Vitals are related to the note
                    - Next section is Spinal
                        - This will have View Spinal Entries button, which goes to a view of spinal entries '/spinal'
                        - This will look like patients list page, where we can add a new entry, that shows as dialog
                    - Next section is Extremities
                        - This will have View Extremeties Entries button, which goes to a view of spinal entries '/extremeties'
                        - This will look like patients list page, where we can add a new entry, that shows as dialog
                    - Next Section is additional notes with the note
                    - Save Note button
                    - Back button
            -->
            <v-col cols="4">
                <v-card class="w-full h-full">
                    <v-card-title>Patient X</v-card-title>
                    <v-card-subtitle>Note for 03/27/23</v-card-subtitle>
                    <div class="px-2 py-5">
                            <div class="d-flex">
                                <v-card-title>General</v-card-title>
                                <v-btn color="primary" class="justify-end">Edit General</v-btn>



                            </div>

                            <v-divider></v-divider>

                            <v-row>
                                <v-col class="py-5 px-2"  cols="6">
                                    <v-card-text>Height: 5' 10" </v-card-text>
                                    <v-card-text>Weight: 156 lbs </v-card-text>
                                    <v-card-text>Temperature: 98.7 </v-card-text>


                                </v-col>
                                <v-col class="py-5 px-2" cols="6">
                                    <v-card-text>Respiration: 5' 10" </v-card-text>
                                    <v-card-text>Systolic: 156 lbs </v-card-text>
                                    <v-card-text>Diastolic: 98.7 </v-card-text>
                                </v-col>
                                
                            </v-row>
                            
                    </div>
                </v-card>
                </v-col>
                <v-col cols="8">
                    <v-card class="elevation-4">
                    <div class="py-5 d-flex">
                        <v-card-title>
                        Extremity Entries
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="mr-3" @click="spinalDialog = true">Add Entry</v-btn>
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
              v-for="item in mockItems"
              :key="item.id"
            >
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td class="d-flex justify-end">
                <v-icon @click="seePatient(item)">mdi-pencil</v-icon>
                </td>
            </tr>
          </tbody>
          
        </v-table>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-card class="w-full h-full">
                    <div class="px-5 py-5"> 
                        <div class="d-flex">
                                <v-card-title>Additional Notes</v-card-title>
                                <v-btn color="primary" class="justify-end">Edit</v-btn>
                            </div>
                            <v-divider></v-divider>
                            <div class="px-5 py-5">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nunc,
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nunc,
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nunc,
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nunc,
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nunc,
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nunc,

                                </p>
                            </div>
                        
                        <!-- <v-textarea
                            label="Additional Notes"
                            placeholder="Additional Notes"
                            outlined
                            rows="10"
                        ></v-textarea> -->
                    </div>
                </v-card>
            </v-col>
            
            <v-col cols="8">
                    <v-card class="elevation-4">
                    <div class="py-5 d-flex">
                        <v-card-title>
                        Extremity Entries
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="mr-3" @click="extremityDialog = true">Add Entry</v-btn>
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
              v-for="item in mockItems"
              :key="item.id"
            >
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td class="d-flex justify-end">
                <v-icon @click="seePatient(item)">mdi-pencil</v-icon>
                </td>
            </tr>
          </tbody>
          
        </v-table>
                </v-card>
            </v-col>
        </v-row>
      </v-container>
    </div>
    <v-dialog v-model="spinalDialog" max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Spinal Entry</span>
      </v-card-title>
      <v-card-text>
        <!-- Add your form inputs here -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="spinalDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitSpinalForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="extremityDialog" max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Extremity Entry</span>
      </v-card-title>
      <v-card-text>
        <!-- Add your form inputs here -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="extremityDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitExtremityForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </template>
  
  <script>

    export default {
        data () {
            return {
                spinalDialog: false,
                extremityDialog: false,
                mockItems: [
                    {
                        id: 1,
                        firstName: 'John',
                        lastName: 'Doe',
                        email: '',
                    },
                    {
                        id: 1,
                        firstName: 'John',
                        lastName: 'Doe',
                        email: '',
                    },
                    {
                        id: 1,
                        firstName: 'John',
                        lastName: 'Doe',
                        email: '',
                    },
                ]
            }
        },
        async mounted() {

        },
        methods: {
            // toSpinalEntries() {
            //     // we need to grab the patient id from a prop
            //     this.$router.push(`/patient/1/note/${this.$route.params.id}/spinal`);
            // },
            // toExtremityEntries() {
            //     // we need to grab the patient id from a prop
            //     this.$router.push(`/patient/1/note/${this.$route.params.id}/extremity`);
            // },
            backToPatients() {
                this.$router.push(`/patient/1`);
            },
            submitSpinalForm() {
            // Handle spinal form submission
            this.spinalDialog = false;
            },
            submitExtremityForm() {
            // Handle extremity form submission
            this.extremityDialog = false;
            },
        },
            
        
}   
</script>
  
<style>
    tbody tr {
        height: 50px;
    }
</style>
