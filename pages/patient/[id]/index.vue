

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
                            <v-dialog
                            v-model="dialog"
                            persistent
                            width="1024"
                            >
                            <template v-slot:activator="{ props }">
                                <v-btn
                                color="primary"
                                v-bind="props"
                                >
                                Open Dialog
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                <span class="text-h5">User Profile</span>
                                </v-card-title>
                                <v-card-text>
                                <v-container>
                                    <v-row>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        label="Legal first name*"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        label="Legal middle name"
                                        hint="example of helper text only on focus"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-text-field
                                        label="Legal last name*"
                                        hint="example of persistent helper text"
                                        persistent-hint
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                        label="Email*"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                        label="Password*"
                                        type="password"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                    >
                                        <v-select
                                        :items="['0-17', '18-29', '30-54', '54+']"
                                        label="Age*"
                                        required
                                        ></v-select>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="6"
                                    >
                                        <v-autocomplete
                                        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                        label="Interests"
                                        multiple
                                        ></v-autocomplete>
                                    </v-col>
                                    </v-row>
                                </v-container>
                                <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue-darken-1"
                                    variant="text"
                                    @click="dialog = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    color="blue-darken-1"
                                    variant="text"
                                    @click="dialog = false"
                                >
                                    Save
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        </v-row>

                    </div>
                    <v-table>
                    <thead>
                    <tr>
                        <th class="text-left">
                            First Name
                        </th>
                        <th class="text-left">
                            Last Name
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
                        <td>{{ item.firstName }}</td>
                        <td>{{ item.lastName }}</td>
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
  import { createPatientService } from '~~/services/patient';

    export default {
        data () {
            return {
                notes: [],
                store: null,
                dialog: false,
                patientService: null
            }
        },
        computed: {
            currentPatient() {
                return this.store?.getCurrentPatient;
            }
        },
        async mounted() {
            this.patientService = createPatientService(this.$api);
            this.store = patientStore();
            this.notes = await this.patientService.getPatients(this.$route.params.id);
        },
        methods: {
            goToNote(item) {
                this.$router.push(`/patient/${this.$route.params.id}/note/${item.id}`);
            },
        },
    }
</script>
  
<style>
    tbody tr {
        height: 50px;
    }
</style>