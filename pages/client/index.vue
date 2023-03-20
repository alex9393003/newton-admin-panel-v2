<template>
  <div>
    <v-card>
      <v-card-title class="text-h6">Management</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
  
  <script>
  export default {
    name: 'ClientManagement',
    data() {
      return {
        headers: [
        { text: 'Name', value: 'name' },
        { text: 'Age', value: 'age' },
        { text: 'Gender', value: 'gender' },
      ],
      items: [
        { name: 'John Doe', age: 25, gender: 'Male' },
        { name: 'Jane Doe', age: 30, gender: 'Female' },
        { name: 'Bob Smith', age: 40, gender: 'Male' },
        { name: 'Alice Johnson', age: 35, gender: 'Female' },
        { name: 'Mike Brown', age: 28, gender: 'Male' },
        { name: 'Sarah Lee', age: 42, gender: 'Female' },
        { name: 'David Chen', age: 50, gender: 'Male' },
        { name: 'Emily Wang', age: 27, gender: 'Female' },
        { name: 'Tom Wilson', age: 38, gender: 'Male' },
        { name: 'Olivia Davis', age: 31, gender: 'Female' },
      ],
      search: '',
      }
    }
  }
  </script>
  