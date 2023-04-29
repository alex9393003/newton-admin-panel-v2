<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Region</th>
          <th class="text-left">Level</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
            <td>{{ item.region }}</td>
            <td v-if="item.category === 'spinal'">{{ item.spinalLevel }}</td>
            <td v-else>{{ item.extremityLevel }}</td>
            <td class="d-flex justify-end">
                <v-icon @click="$emit('edit-item', item)">mdi-pencil</v-icon>
            </td>
        </tr>
      </tbody>
    </v-table>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
    },
  };
  </script>