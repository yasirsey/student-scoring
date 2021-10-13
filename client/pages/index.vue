<template>
  <main class="container mt-3">
    <select @change="onChangeClass($event)" class="form-select" aria-label="class">
      <option value="" selected>Tümü</option>
      <option :value="item._id" v-for="item in classes" :key="item.id">{{item.name}}</option>
    </select>
    
    <table class="table mt-3 table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Ad Soyad</th>
        <th scope="col">Sınıf</th>
        <th scope="col">Puan</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in students" :key="item.id">
        <th scope="row">{{index+1}}</th>
        <td>{{item.name}}</td>
        <td>{{item.sClass.name}}</td>
        <td>{{item.point}}</td>
      </tr>
    </tbody>
  </table>
  </main>
</template>

<script>
import _ from 'lodash'

export default {
  auth: false,
  mounted() {
    this.$store.dispatch('getClasses')
    this.$store.dispatch('getStudents', this.selectedClass)
  },
  data: () => ({
    selectedClass: '',
  }),
  methods: {
    async onChangeClass(event) {
      await this.$store.dispatch('getStudents', event.target.value)
      this.selectedClass = event.target.value
    }
  },
  computed: {
    classes() {
      return this.$store.state.classes
    },
    students() {
      return _.orderBy(this.$store.state.students, 'point', 'desc')
    },
  }
};
</script>
