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
                <v-row justify="center">
                    <v-btn @click="dialog = true">Add New Note</v-btn>
                    <v-btn @click="generateAndExportPdf()">PDF Test</v-btn>
                    <button @click="generateCSV(testPayload)">Export CSV</button>
                  <NoteDialog v-model="dialog" :selected-item="selectedNoteItem" @note-added="refreshNotes" @close-dialog="closeNoteDialog" />

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
  import { exportPdf } from '~/utils/pdfExport';
  import { saveAs } from 'file-saver'

  
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
      generateCSV(payload) {
        // const header = [
        //   'SPINAL',
        //   'LEVELS',
        //   'REGIONS',
        //   '',
        //   'L',
        //   'R',
        //   'B',
        //   '',
        //   'SUBLUX',
        //   'MUSCLE SPASMS',
        //   // ... other headers
        // ]

        // const rows = [
        //   ['OCC', 'Sub. Occ', 'Full C-Region', '', payload.OCC, payload.OCC, payload.OCC, '', payload.OCC, payload.OCC, payload.OCC, payload.OCC, payload.OCC, payload.OCC, payload.OCC, payload.OCC, '', payload.OCC, payload.OCC, payload.OCC, '', payload.OCC, '', payload.OCC, payload.OCC, '', payload.OCC, payload.OCC, payload.OCC],
        //   ['C1', '', '', '', payload.C1, payload.C1, payload.C1, '', payload.C1, payload.C1, payload.C1, payload.C1, payload.C1, payload.C1, payload.C1, payload.C1, '', payload.C1, payload.C1, payload.C1, '', payload.C1, '', payload.C1, payload.C1, '', payload.C1, payload.C1, payload.C1],
        //   // ... other rows
        // ]

        const header = [
          'SPINAL', '', '', '', 'SIDES', '', '', '', '', '', '', '', '', '', 'OBJECTIVE FINDINGS', '', '', '', '', '', '', '', '', '', '', 'PHYSIOTHERAPIES', '', '', '', '', '', '', '', '', 'TREATMENT',
          'LEVELS', 'REGIONS', '', '', 'L', 'R', 'B', '', 'SUBLUX', 'MUSCLE SPASMS', 'TRIGGER POINTS', 'TENDERNESS', 'NUMBNESS', 'EDEMA', 'SWELLING', 'REDUCED MOTION', '', 'POSITIONING', 'COLD PACKS', 'HOT PACKS', '', 'ELECT STIM', '', 'TRACTION', 'MASSAGE', '', 'POSITIONING', 'TECHNIQUES', 'MANIPULATION'
        ];

        const rows = [
          ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['OCC', 'Sub. Occ', 'Full C-Region', '', payload.occ_L, payload.occ_R, payload.occ_B, '', payload.occ_sublux, payload.occ_muscle_spasms, payload.occ_trigger_points, payload.occ_tenderness, payload.occ_numbness, payload.occ_edema, payload.occ_swelling, payload.occ_reduced_motion, '', payload.occ_positioning, payload.occ_cold_packs, payload.occ_hot_packs, '', payload.occ_elect_stim, '', payload.occ_traction, payload.occ_massage, '', payload.occ_treatment_positioning, payload.occ_techniques, payload.occ_manipulation],
          //... other rows
        ];

        const csvContent = [header, ...rows]
          .map((e) => e.join(','))
          .join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
        saveAs(blob, 'export.csv')
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
      // async generateAndExportPdf() {
      //   // Sample data
      //   const data = Array.from({ length: 25 }, () =>
      //     Array.from({ length: 10 }, () => 'Sample')
      //   );

      //   await exportPdf(data);
      // },
      async generateAndExportPdf() {
        // Construct the samplePayload as shown above
        const samplePayload = {
          vitals: {
            height: "180",
            weight: 75,
            temperature: 98.6,
            systolic: 120,
            diastolic: 80,
            pulse: 70,
            respiration: 16,
          },
          physiotherapyNumber: 5,
          roomAssignments: 3,
          physio: 2,
          tx: 1,
          spinalData: {
            // Add sample spinalData here
          },
        };

        // Generate spinalData and add it to samplePayload
        // ... (Add the code for generating spinalData as shown above)
        const spinalData = {};
        const spinalRows = [
          "Occ",
          "C1",
          "C2",
          "C3",
          "C4",
          "C5",
          "C6",
          "C7",
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
          "L1",
          "L2",
          "L3",
          "L4",
          "L5",
          "S1",
          "S2",
          "S3",
          "S4",
          "S5",
        ];

        spinalRows.forEach((row) => {
          spinalData[row] = Array.from({ length: 13 }, () => Math.floor(Math.random() * 10) + 1);
        });

        samplePayload.spinalData = spinalData;

        samplePayload.spinalData = spinalData;

        await exportPdf(samplePayload);
      },
    },
  };
  </script>
  
<style scoped>
    tbody tr {
        height: 50px;
    }
</style>