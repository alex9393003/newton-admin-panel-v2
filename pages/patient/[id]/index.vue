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
      async generateAndExportPdf() {
        // Sample data
        const data = Array.from({ length: 25 }, () =>
          Array.from({ length: 10 }, () => 'Sample')
        );

        await exportPdf(data);
      },
    },
  };
  </script>
  
<style scoped>
    tbody tr {
        height: 50px;
    }
</style>