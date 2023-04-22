<template>
  <div>
    <v-container>
      <v-card class="elevation-4">
        <div class="py-5 d-flex">
          <v-card-title>
            Patient List
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="ma-2 pa-2" @click="patientDialog = true">Add New Patient</v-btn>
        </div>
        <v-table>
          <thead>
            <tr>
              <th class="text-left" @click="sortPatients('firstName')">
                First Name
              </th>
              <th class="text-left" @click="sortPatients('lastName')">
                Last Name
              </th>
              <th class="text-left" @click="sortPatients('lastUpdated')">
                Last Updated
              </th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody class="">
            <tr
              v-for="item in displayedPatients"
              :key="item.id"
            >
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ formatDateTime(item.lastUpdated) }}</td>
              <td class="d-flex justify-end">
                <v-btn class="ma-2 pa-2" color="primary" @click="goToPatient(item)">See patient</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="5"
          color="primary"
        ></v-pagination>
      </v-card>
    </v-container>
  </div>
  <PatientDialog v-model="patientDialog" @close-dialog="closePatientDialog" @patient-added="refreshPatientList" />
</template>

<script>
import PatientDialog from '~/components/dialogs/PatientDialog.vue';
import { patientStore } from '~/store/patient';
import { createPatientService } from '~/services/patient';

export default {
  name: 'NotePage',
  components: {
      PatientDialog
  },
  data () {
      return {
          patientDialog: false,
          patientService: null,
          patients: [],
          displayedPatients: [],
          itemsPerPage: 10,
          currentPage: 1,
          totalPages: 1,
      }
  },
  watch: {
    currentPage() {
      this.updateDisplayedPatients();
    },
  },
  async mounted() {
      this.patientStore = patientStore();
      this.patientService = createPatientService(this.$api);
      this.patients = await this.patientService.getPatients();
      this.updateDisplayedPatients();
  },
  methods: {
      async refreshPatientList() {
          this.patients = await this.patientService.getPatients();
          this.updateDisplayedPatients();
      },
      editPatientItem(item) {
        this.patientDialog = true;
      },
      goToPatient(item) {
          this.patientStore.setCurrentPatient(item);
          this.$router.push(`/patient/${item.id}`);
      },
      backToDashboard() {
          this.$router.push('/');
      },
      closePatientDialog() {
          this.patientDialog = false;
      },
      updateDisplayedPatients() {
        this.totalPages = Math.ceil(this.patients.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.displayedPatients = this.patients.slice(startIndex, startIndex + this.itemsPerPage);
      },
      sortPatients(field) {
        this.patients = this.patients.sort((a, b) => {
          if (a[field] < b[field]) {
            return -1;
          }
          if (a[field] > b[field]) {
            return 1;
          }
          return 0;
        });
        this.updateDisplayedPatients();
      },
      formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(date);

        const formattedTime = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(date);

        return `${formattedDate}`;
      },
    },
  }
</script>