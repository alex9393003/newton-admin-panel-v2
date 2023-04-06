import { defineStore } from 'pinia'
import { Patient } from '~/typeorm/entity/Patient'

export const patientStore = defineStore('patient', {
  state: () => ({
    currentPatient: {} as Patient,
  }),

  getters: {
    currentPatient: (state) => state.currentPatient,
  },

  actions: {
    setCurrentPatient(patient: Patient) {
        this.currentPatient = patient;
    },
  },
})