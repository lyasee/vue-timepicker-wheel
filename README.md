# vue-timepicker-wheel

A timepicker Vue component. Compatible with Vue 2.x

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Props](#available-props)
- [Events](#events)

## Demo
[Demo](https://jsfiddle.net/lyasee/eywraw8t/525798/)
[Demo vuetify](https://jsfiddle.net/lyasee/s15zthdm/16/)

## Install

``` bash
npm i vue-timepicker-wheel
```

## Usage
``` html
<template>
  <div>
    <vue-timepicker-wheel :time="time" @change="value => time = value" />
  </div>
</template>

<script>
import VueTimepickerWheel from 'vue-timepicker-wheel'

export default {
  components: {
    VueTimepickerWheel
  },
  data: () => ({
    time: '23:59' // 23 hour, 59 minute
  })
}
</script>
```
## Available props

| Prop                          | Type            | Default     | Description                              |
|-------------------------------|-----------------|-------------|------------------------------------------|
| time                          | String          | --:--       | Time value of the timepicker             |
| width                         | String          | 300px       | Box Width                                |
| color                         | String          | #1867c0     | Box Background Color                     |
| time-color                    | String          | white       | Time Color                               |
| time-size                     | String          | 50px        | Time Font Size                           |
| time-weight                   | String          | 500         | Time Font Weight                         |
| arrow                         | Boolean         | true        | arrow up/down button                     |
| shadow                        | Boolean         | false       | Box Shadow                               |

## Events

These events are emitted on actions in the timepicker

| Event             | Output     | Description                          |
|-------------------|------------|--------------------------------------|
| change            | time       | return time                          |
