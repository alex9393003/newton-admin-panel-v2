<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col style="text-align: center;" cols="12">
          <h2>Patient Portal / Notes Console</h2>
          <v-card class="my-5 pa-2">
            <v-card-title>Items to test</v-card-title>
            <div style="text-align: left;">
              <v-list>
                <v-list-item>Add/Update Patient</v-list-item>
                <v-list-item>Add/Update Note</v-list-item>
                <v-list-item>Add/Update Note</v-list-item>
                <v-list-item>Add/Update Spinal Entries for Note</v-list-item>
                <v-list-item>Add/Update Extremity Entries for Note</v-list-item>
                <v-list-item>Once A Few entries are added per note, Export Note to CSV, Excel</v-list-item>
              </v-list>
            </div>
          </v-card>
        </v-col>

        <!-- <v-col cols="6" sm="8" md="6">
          <v-hover
          v-slot="{ isHovering, props }"
          open-delay="50"
        >
          <v-card
            :elevation="isHovering ? 16 : 2"
            :class="{ 'on-hover': isHovering }"
            class="mx-auto"
            height="200"
            v-bind="props"
          >
            <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
              Open Delay (Mouse enter)
            </v-card-text>
          </v-card>
        </v-hover>
        </v-col>
        <v-col cols="6" sm="8" md="6">
          <v-hover
          v-slot="{ isHovering, props }"
          open-delay="50"
        >
          <v-card
            :elevation="isHovering ? 16 : 2"
            :class="{ 'on-hover': isHovering }"
            class="mx-auto"
            height="200"
            v-bind="props"
          >
            <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
              Open Delay (Mouse enter)
            </v-card-text>
          </v-card>
        </v-hover>
        </v-col> -->
      </v-row>

      <!-- chart section  -->
      <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="mb-3 mt-2">Patient Analytics</v-card-title>
          <v-card-text>
            <line-chart :data="chartData" :options="chartOptions" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  
  
    </v-container>
      
    </template>
    
    <script>

    export default {
      name: 'DashboardPage',
      data() {
        return {
          chartData: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Example Data",
                data: [12, 19, 3, 5, 2, 3, 10, 15, 8, 23, 12, 7],
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
              },
            ],
          },
          chartOptions: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };
      },
    };
    </script>
    