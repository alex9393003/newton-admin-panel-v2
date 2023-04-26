<template>
  <v-dialog v-model="extremityDialog" max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Extremity Entry</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="extremityEntryForm" v-model="formIsValid">
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="form.category"
                :items="['spinal', 'extremeties']"
                label="Category"
                required
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="form.region"
                :items="[
                  'upper-cerv',
                  'mid-cerv',
                  'lower-cerv',
                  'sub-occ',
                  'upper-t',
                  'mid-t',
                  'lower-t'
                ]"
                label="Region"
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-select
                v-model="form.extremityLevel"
                :items="['arm', 'bicep', 'tricep']"
                label="Extremity Level"
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-select
                v-model="form.side"
                :items="['l', 'r', 'b']"
                label="Side"
                required
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-checkbox v-model="form.sublux" label="Sublux"></v-checkbox>
            </v-col>
          </v-row>

          <!-- Additional form fields based on Entry entity attributes -->

          <!-- Add more form fields here -->

          <v-row>
            <v-col cols="6">
              <v-checkbox
                v-model="form.muscleSpasm"
                label="Muscle Spasm"
              ></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox
                v-model="form.triggerPoints"
                label="Trigger Points"
              ></v-checkbox>
            </v-col>
          </v-row>

          <!-- Add the remaining form fields here -->

          <v-textarea
            v-model="form.positioning"
            label="Positioning"
            auto-grow
            required
          ></v-textarea>
          <v-textarea
            v-model="form.technique"
            label="Technique"
            auto-grow
            required
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitExtremityEntryForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { createEntryService } from '~/services/entry';

export default {
  name: 'ExtremityEntryDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        category: '',
        region: '',
        extremityLevel: '',
        side: '',
        sublux: false,
        muscleSpasm: false,
        triggerPoints: false,
        tenderness: false,
        numbness: false,
        edema: false,
        swelling: false,
        reducedMotion: false,
        positioning: '',
        coldPack: false,
        hotPack: false,
        electStim: false,
        traction: false,
        massage: false,
        technique: '',
        manipulation: false,
      },
      formIsValid: false,
    };
  },
  computed: {
    extremityEntryDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  async mounted() {
    this.entryService = createEntryService(this.$api);
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
    resetForm() {
      for (const key in this.form) {
        if (typeof this.form[key] === 'boolean') {
          this.form[key] = false;
        } else {
          this.form[key] = '';
        }
      }
    },
    async submitExtremityEntryForm() {
      if (this.$refs.extremityEntryForm.validate()) {
        const res = await this.entryService.addEntry(this.form);
        if (await res instanceof Error) {
          console.log('Entry not added');
        } else {
          console.log('Entry added successfully');
          this.$emit('entry-added');
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