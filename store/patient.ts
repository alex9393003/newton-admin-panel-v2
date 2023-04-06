import { defineStore } from 'pinia'
import { Patient } from '~/typeorm/entity/Patient'

interface PatientState {
  currentPatient: Patient;
}

export const patientStore = defineStore('patient', {
  state: () => ({
    currentPatient: {} as Patient,
  }),

  getters: {
    // getCurrentPatient: (state) => state.currentPatient,
    getCurrentPatient: (state: PatientState): Patient | null =>
      Object.keys(state.currentPatient).length > 0 ? state.currentPatient : null,
  },
  actions: {
    setCurrentPatient(patient: Patient) {
        this.currentPatient = patient;
    },
  },
})