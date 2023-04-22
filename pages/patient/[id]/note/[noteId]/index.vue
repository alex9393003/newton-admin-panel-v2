<template>
    <div>
      <v-container>
        <v-btn class="mb-4" @click="backToPatients()">Back to Patient List</v-btn>
        <v-row>
            <v-col cols="4">
                <v-card class="w-full h-full">
                    <v-card-title>{{ currentPatient }}</v-card-title>
                    <v-card-subtitle>{{ currentNote }}</v-card-subtitle>
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
                        <v-card-title>Extremity Entries</v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="mr-3" @click="spinalDialog = true">Add Entry</v-btn>
                        </div>
                        <EntriesTable :items="mockItems" @view-item="viewSpinalItem" @edit-item="editSpinalItem" />
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
          <v-card-title>Extremity Entries</v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-3" @click="extremityDialog = true">Add Entry</v-btn>
        </div>
        <EntriesTable :items="mockItems" @view-item="viewExtremityItem" @edit-item="editExtremityItem" />
      </v-card>
    </v-col>
        </v-row>
      </v-container>
    </div>
    <SpinalDialog v-model="spinalDialog" />
    <ExtremityDialog v-model="extremityDialog" />
</template>
  
<script>
import SpinalDialog from '~/components/dialogs/SpinalDialog.vue';
import ExtremityDialog from '~/components/dialogs/ExtremityDialog.vue';
import EntriesTable from '~/components/tables/EntriesTable.vue';
import { noteStore } from '~/store/note';
import { patientStore } from '~/store/patient';
import { createNoteService } from '~/services/note';



export default {
    name: 'NotePage',
    components: {
        SpinalDialog,
        ExtremityDialog,
        EntriesTable,
    },
    data () {
        return {
            spinalDialog: false,
            extremityDialog: false,
            noteStore: null,
            patientStore: null,
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
            ],
            selectedSpinalItem: null,
            selectedExtremityItem: null,
        }
    },
    computed: {
        currentNote() {
            return this.noteStore?.getCurrentNote;
        },
        currentPatient() {
            return this.patientStore?.getCurrentPatient;
        }
    },
    async mounted() {
        this.noteStore = noteStore();
        this.patientStore = patientStore();
        
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
        editSpinalItem(item) {
        // Handle editing spinal item
        this.spinalDialog = true;
        },
        editExtremityItem(item) {
        // Handle editing extremity item
        this.extremityDialog = true;
        },
        backToPatients() {
            this.$router.push(`/patient/${this.$route.params.id}`);
        },
    },
        
    
}   
</script>
  
<style>
    tbody tr {
        height: 50px;
    }
</style>
