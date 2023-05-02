<template>
    <div>
      
      <v-container>
        <v-btn class="mb-4" @click="backToPatients()">Back to Patient List</v-btn>
        <v-row>
          <v-col cols="8">
            <v-card class="elevation-4 mx-5 my-5">
              <div class="py-5 d-flex">
                <v-card-title>
                  Notes List
                </v-card-title>
                <v-spacer></v-spacer>
                <v-row justify="center">
                    <v-btn @click="dialog = true">Add New Note</v-btn>
                    <v-btn @click="exportCSV">CSV Test</v-btn>
                    <v-btn @click="exportXLSX">CSV Test</v-btn>
                    <!-- <v-btn @click="exportPDF">CSV Test</v-btn> -->


                  <NoteDialog v-model="dialog"  @note-added="refreshNotes" @close-dialog="closeNoteDialog" />
                </v-row>
              </div>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">
                      Visit Date
                    </th>
                    <th class="text-left">
                      Room Assignment
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
                    <td>{{ item.visitDate }}</td>
                    <td>{{ item.roomAssignment }}</td>
                    <td class="d-flex justify-end">
                      <v-btn class="ma-2 pa-2" color="primary" @click="goToNote(item)">See Note</v-btn>
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
                        <v-label class="">First Name</v-label>
                        <v-card-text>{{currentPatient?.firstName}}</v-card-text>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                        <v-label class="">Last Name</v-label>
                        <v-card-text>{{currentPatient?.lastName}}</v-card-text>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                        <v-label class="">Email</v-label>

                        <v-card-text>{{currentPatient?.email}}</v-card-text>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                        <v-label class="">Phone</v-label>
                        <v-card-text class="">{{currentPatient?.phoneNumber}}</v-card-text>
                    </div>
                    <div class="d-flex align-center justify-space-around">
                        <v-label>Age</v-label>
                        <v-card-text>{{currentPatient?.age}}</v-card-text>
                    </div>
                </v-card>
            </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import { patientStore } from '~/store/patient';
  import { noteStore } from '~/store/note';
  import { createPatientService } from '~/services/patient';
  import { createNoteService } from '~/services/note';
  import NoteDialog from '~/components/dialogs/NoteDialog.vue';
  import { generateCSV, generateXLSX } from '~/utils/csvExport';
  

  
  export default {
    name: 'PatientPage',
    components: {
      NoteDialog,
    },
    data() {
      return {
        notes: [],
        patientStore: null,
        noteStore: null,
        dialog: false,
        patientService: null,
        noteService: null,
        testPayload: {
          occ_L: 1,
          occ_R: 1,
          occ_B: 1,
          occ_sublux: 1,
          occ_muscle_spasms: 1,
          occ_trigger_points: 1,
          occ_tenderness: 1,
          occ_numbness: 1,
          occ_edema: 1,
          occ_swelling: 1,
          occ_reduced_motion: 1,
          occ_positioning: 1,
          occ_cold_packs: 1,
          occ_hot_packs: 1,
          occ_elect_stim: 1,
          occ_traction: 1,
          occ_massage: 1,
          occ_treatment_positioning: 1,
          occ_techniques: 1,
          occ_manipulation: 1,
        }
      };
    },
    computed: {
      currentPatient() {
        return this.patientStore?.getCurrentPatient;
      },
    },
    async mounted() {
      this.patientStore = patientStore();
      this.noteStore = noteStore();
      this.patientService = createPatientService(this.$api);
      this.noteService = createNoteService(this.$api);
      this.notes = await this.noteService.getNotesForPatient({ patientId: this.$route.params.id });
    },
    methods: {
      exportCSV() {
        // Replace the example payload data with your actual data
        const payload = {
          c5: {
            physio: {
              positioning: 'Positioning value',
              coldPacks: 'Cold Packs value',
              hotPacks: 'Hot Packs value',
              electStim: 'Electrical Stimulation value',
              traction: 'Traction value',
              massage: 'Massage value',
            },
            treatment: {
              positioning: 'Treatment Positioning value',
              techniques: 'Techniques value',
              manipulation: 'Manipulation value',
            },
          },
          c6: {
            sides: {
              l: 'Left side value',
              r: 'Right side value',
              b: 'Both sides value',
            },
          },
        };

        generateCSV(payload);
      },
      exportXLSX() {
        // Replace the example payload data with your actual data
        const payload = {
          c5: {
            physio: {
              positioning: 'Positioning value',
              coldPacks: 'Cold Packs value',
              hotPacks: 'Hot Packs value',
              electStim: 'Electrical Stimulation value',
              traction: 'Traction value',
              massage: 'Massage value',
            },
            treatment: {
              positioning: 'Treatment Positioning value',
              techniques: 'Techniques value',
              manipulation: 'Manipulation value',
            },
          },
          c6: {
            sides: {
              l: 'Left side value',
              r: 'Right side value',
              b: 'Both sides value',
            },
          },
        };

        generateXLSX(payload);
      },
      // async exportPDF() {
      //   const { $pdfMake } = useContext();
      //   // Replace the example payload data with your actual data
      //   const payload = {
      //     c5: {
      //       physio: {
      //         positioning: 'Positioning value',
      //         coldPacks: 'Cold Packs value',
      //         hotPacks: 'Hot Packs value',
      //         electStim: 'Electrical Stimulation value',
      //         traction: 'Traction value',
      //         massage: 'Massage value',
      //       },
      //       treatment: {
      //         positioning: 'Treatment Positioning value',
      //         techniques: 'Techniques value',
      //         manipulation: 'Manipulation value',
      //       },
      //     },
      //     c6: {
      //       sides: {
      //         l: 'Left side value',
      //         r: 'Right side value',
      //         b: 'Both sides value',
      //       },
      //     },
      //   };

      //   generateXLSX(payload, true, $pdfMake);
      // },
      backToPatients() {
        this.$router.push('/patient');

      },
      goToNote(item) {
        this.noteStore.setCurrentNote(item);
        this.$router.push(`/patient/${this.$route.params.id}/note/${item.id}`);
      },
      async refreshNotes() {
        this.notes = await this.noteService.getNotesForPatient({ patientId: this.$route.params.id });
      },
      closeNoteDialog() {
        this.dialog = false;
      },
    },
  };
  </script>
  
<style scoped>
    tbody tr {
        height: 50px;
    }
</style>

<!-- todo: pdf stuff -->
<!-- <script>
import { ref, computed, onMounted } from 'vue';
// import { useRouter, useRoute } from 'vue';
// import { useContext } from 'nuxt3';
import { patientStore } from '~/store/patient';
import { noteStore } from '~/store/note';
import { createPatientService } from '~/services/patient';
import { createNoteService } from '~/services/note';
import NoteDialog from '~/components/dialogs/NoteDialog.vue';
import { generateCSV, generateXLSX } from '~/utils/csvExport';

export default {
  name: 'PatientPage',
  components: {
    NoteDialog,
  },
  setup() {
    const api = useNuxtApp().vueApp.config.globalProperties.$api;
    const test = useNuxtApp();
    const router = useRouter();
    const route = useRoute();
    const patientStoreInstance = patientStore();
    const noteStoreInstance = noteStore();
    const notes = ref([]);
    const dialog = ref(false);
    const patientService = createPatientService(api);
    const noteService = createNoteService(api);
    const testPayload = ref({
      // ... your testPayload data
    });

    const currentPatient = computed(() => {
      return patientStoreInstance.getCurrentPatient;
    });

    onMounted(async () => {
      console.log('api is ',api);
      notes.value = await noteService.getNotesForPatient({ patientId: route.params.id });
    });

    const exportCSV = () => {
      // ... exportCSV logic
    };

    const exportXLSX = () => {
      // ... exportXLSX logic
    };

    // todo: get pdfs working with pdfMake
    // const exportPDF = async () => {
    //   const pdfMake = useNuxtApp().vueApp.config.globalProperties.$pdfMake;
    //   console.log('pdf make is ', pdfMake);
    //   // ... exportPDF logic, using $pdfMake
    //   const payload = {
    //     c5: {
    //       physio: {
    //         positioning: 'Positioning value',
    //         coldPacks: 'Cold Packs value',
    //         hotPacks: 'Hot Packs value',
    //         electStim: 'Electrical Stimulation value',
    //         traction: 'Traction value',
    //         massage: 'Massage value',
    //       },
    //       treatment: {
    //         positioning: 'Treatment Positioning value',
    //         techniques: 'Techniques value',
    //         manipulation: 'Manipulation value',
    //       },
    //     },
    //     c6: {
    //       sides: {
    //         l: 'Left side value',
    //         r: 'Right side value',
    //         b: 'Both sides value',
    //       },
    //     },
    //   };
    //   generateXLSX(payload, true, () => pdfMake);
    // };

    const goToNote = (item) => {
      noteStoreInstance.setCurrentNote(item);
      router.push(`/patient/${route.value.params.id}/note/${item.id}`);
    };

    const refreshNotes = async () => {
      notes.value = await noteService.getNotesForPatient({ patientId: route.value.params.id });
    };

    const closeNoteDialog = () => {
      dialog.value = false;
    };

    return {
      notes,
      dialog,
      currentPatient,
      exportCSV,
      exportXLSX,
      exportPDF,
      goToNote,
      refreshNotes,
      closeNoteDialog,
      testPayload,
    };
  },
};
</script> -->