<template>
  <v-dialog v-model="extremityDialog" max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Extremity Entry</span>
      </v-card-title>
      <v-card-text>
            <!-- <v-text-field
              :rules="rules"
              label="First name"
              :readonly="!editable"
              :value="form.firstName"
              @input="value => updateFormData('firstName', value)"
            ></v-text-field> -->
            <v-text-field
              :rules="rules"
              label="First name"
              v-model="form.firstName"
            ></v-text-field>
          </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitExtremityForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        firstName: "",
      },
      rules: [v => !!v || 'First name is required'],
    };
  },
  computed: {
    extremityDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  methods: {
    closeDialog() {
      this.extremityDialog = false;
    },
    submitExtremityForm() {
      // Handle extremity form submission
      this.extremityDialog = false;
    },
  },
};
</script>



