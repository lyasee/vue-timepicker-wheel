<template>
  <div id="app">
    <timepicker style="text-align: center;" @change="onChangeTimepicker" :time="time"/>
    <div style="height: 1000px;">
    </div>
  </div>
</template>

<script>
import Timepicker from './components/Timepicker.vue'

export default {
  name: 'app',
  components: {
    Timepicker
  },

  data () {
    return {
      time: '00:00'
    }
  },

  created () {

  },

  methods: {
    onChangeTimepicker (timepicker) {
      console.log('onChangeTimepicker', timepicker)
    }
  }
}
</script>

<style>

</style>
