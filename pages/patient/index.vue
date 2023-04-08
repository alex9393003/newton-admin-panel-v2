<template>
  <div>
    <v-container>
      <v-card class="elevation-4">
        <div class="py-5 d-flex">
          <v-card-title>
            Patient List
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="ma-2 pa-2">Add New Patient</v-btn>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getPatients } from '~/services/patient';
import { patientStore } from '~/store/patient';

const router = useRouter();
const patients = ref([]);
const store = patientStore();

definePageMeta({
  middleware: 'auth',
  auth: true
})

onMounted(async () => {
  patients.value = await getPatients();
});

const goToPatient = (item) => {
  store.setCurrentPatient(item);
  router.push(`/patient/${item.id}`);
};
</script>

<style>
  tbody tr {
    height: 50px;
  }
</style>