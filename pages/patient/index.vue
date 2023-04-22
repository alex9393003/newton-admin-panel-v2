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
              v-for="item in patients"
              :key="item.id"
            >
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td class="d-flex justify-end">
                <v-btn class="ma-2 pa-2" color="primary" @click="goToPatient(item)">See patient</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </div>
  <PatientDialog v-model="patientDialog" />
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
      }
  },
  async mounted() {
      this.patientStore = patientStore();
      this.patientService = createPatientService(this.$api);
      this.patients = await this.patientService.getPatients();
  },
  methods: {
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
  },
} 
</script>