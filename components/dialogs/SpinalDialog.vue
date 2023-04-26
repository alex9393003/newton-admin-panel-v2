<template>
  <v-dialog max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="spinalEntryForm" v-model="formIsValid">
          <v-row>
            {{ currentNote }}
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
                v-model="form.spinalLevel"
                :items="['t1', 't2', 't3']"
                label="Spinal Level"
                required
              ></v-select>
            </v-col>
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
        <v-btn color="blue darken-1" text @click="submitSpinalEntryForm()">{{saveButtonText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { createEntryService } from '~/services/entry';

export default {
  name: 'SpinalEntryDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    selectedItem: {
      type: Object,
    },
    currentNote: {
      type: Object,
    }
  },
  data() {
    return {
      form: {
        category: '',
        region: '',
        spinalLevel: '',
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
    spinalEntryDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    isUpdateMode() {
      return !!this.selectedItem;
    },
    title() {
      return this.isUpdateMode ? 'Update Spinal Entry' : 'Add Spinal Entry';
    },
    saveButtonText() {
      return this.isUpdateMode ? 'Update' : 'Save';
    },
  },
  watch: {
    selectedItem(newItem, oldItem) {
      if (newItem && newItem !== oldItem) {
        this.populateFormData(newItem);
      }
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
    populateFormData(item) {
      this.form = {
        ...item
      }
    },
    async submitSpinalEntryForm() {
      const noteId = this.$route.params.noteId;
      if (this.$refs.spinalEntryForm.validate()) {
        const res = this.isUpdateMode ? await this.entryService.updateEntry(this.form) : await this.entryService.addEntry(this.form, noteId);
        console.log('response is ', res);
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