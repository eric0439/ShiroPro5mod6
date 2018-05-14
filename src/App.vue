<template>
  <md-app>
      <md-autocomplete v-model="modelChar" :md-options="characters.name">
        <label>{{$t('character')}}</label>
      </md-autocomplete>
  </md-app>
</template>

<script>
import data from "./data/data.json"

export default {
  name: 'app',
  components: {

  },
  data: function() {
      return {
          characters: data,
          modelChar: ""
      }
  },
  mounted() {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
