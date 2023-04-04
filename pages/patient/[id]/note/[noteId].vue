

<template>
    <div>
      <v-container>
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
            <v-col cols="12">
                <v-card class="w-full">
                    <v-card-title>Patient X</v-card-title>
                    <v-card-subtitle>Note for 03/27/23</v-card-subtitle>
                    <div class="px-5 py-5">
                            <div class="d-flex">
                                <v-card-title>General</v-card-title>
                                <v-btn color="primary" class="justify-end">Edit General</v-btn>


                            </div>

                            <v-divider></v-divider>

                            <v-row>
                                <v-col class="py-5 px-5"  cols="6">
                                    <v-card-text>Height: 5' 10" </v-card-text>
                                    <v-card-text>Weight: 156 lbs </v-card-text>
                                    <v-card-text>Temperature: 98.7 </v-card-text>


                                </v-col>
                                <v-col class="py-5 px-5" cols="6">
                                    <v-card-text>Respiration: 5' 10" </v-card-text>
                                    <v-card-text>Systolic: 156 lbs </v-card-text>
                                    <v-card-text>Diastolic: 98.7 </v-card-text>
                                </v-col>
                            </v-row>
                    </div>

                    <!-- <div class="px-5 py-5">
                        <v-card-title>General</v-card-title>
                    </div> -->

                    <div class="px-5 py-5">
                        <!-- <v-card-title>General</v-card-title> -->
                    </div>
                </v-card>
            </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>

    export default {
        data () {
            return {

            
            }
        },
        async mounted() {

        },
        methods: {
        },
            
        
}   
</script>
  
<style>
    tbody tr {
        height: 50px;
    }
</style>