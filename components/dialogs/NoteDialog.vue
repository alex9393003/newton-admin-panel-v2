<template>
    <v-dialog v-model="noteDialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Note</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="noteForm" v-model="formIsValid">
            <v-row>
                <v-col cols="12">
                    <label class="form-label">Visit Date and Time</label>
                    <VueDatePicker
                        v-model="visitDateTime"
                        dark
                        type="datetime"
                        :minute-interval="30"
                    />
                    </v-col>
            </v-row>
  
            <!-- Additional form fields based on Note entity attributes -->
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="form.heightFeet"
                  label="Height (Feet)"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.heightInches"
                  label="Height (Inches)"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
  
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="form.temperature"
                  label="Temperature"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.respiration"
                  label="Respiration"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
  
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="form.systolic"
                  label="Systolic"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.diastolic"
                  label="Diastolic"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
  
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="form.physiotherapy"
                  label="Physiotherapy"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.roomAssignment"
                  label="Room Assignment"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
  
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="form.physio"
                  label="Physio"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.tx"
                  label="TX"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-textarea
            v-model="form.otherNotes"
            label="Other Notes"
            auto-grow
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitNoteForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNoteService } from '~/services/note';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


export default {
  name: 'NoteDialog',
  components: {
    VueDatePicker,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        visitDate: null,
        visitTime: null,
        heightFeet: 0,
        heightInches: 0,
        temperature: 0,
        respiration: 0,
        systolic: 0,
        diastolic: 0,
        physiotherapy: 0,
        roomAssignment: 0,
        physio: 0,
        tx: 0,
        otherNotes: "",
      },
      formIsValid: false,
      visitDateTime: null,
    };
  },
  computed: {
    noteDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  watch: {
    visitDateTime(val) {
    if (val) {
      const isoString = val.toISOString();
      this.form.visitDate = isoString.substring(0, 10);
      this.form.visitTime = isoString.substring(11, 16);
    }
  },
  },
  async mounted() {
    this.noteService = createNoteService(this.$api);
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
    resetForm() {
      this.form.visitDate = null;
      this.form.visitTime = null;
      this.form.heightFeet = 0;
      this.form.heightInches = 0;
      this.form.temperature = 0;
      this.form.respiration = 0;
      this.form.systolic = 0;
      this.form.diastolic = 0;
      this.form.physiotherapy = 0;
      this.form.roomAssignment = 0;
      this.form.physio = 0;
      this.form.tx = 0;
      this.form.otherNotes = "";
    },
    async submitNoteForm() {
      if (this.$refs.noteForm.validate()) {
        const res = await this.noteService.addNote(this.form);
        if (await res instanceof Error) {
          console.log('Note not added');
        } else {
          console.log('Note added successfully');
          this.$emit('note-added');
          this.closeDialog();
          this.resetForm();
        }
      } else {
        console.log('Form not submitted. Did not meet validation standards.');
      }
    },
  },
};
</script>