<template>
  <div>
    <div 
      ref="timepicker" 
      v-bind:style="boxStyle()" 
      @wheel=onWheel 
      @mouseover="isInsideMouse = true" 
      @mouseleave="isInsideMouse = false"
    >

      <!-- Hour -->
      <div class="time-row">
        <div v-show="arrow" class="time-row-up">
          <a @click="onClickArrowUpHour" v-bind:style="arrowTimeStyle(isHourClick)">
            <font-awesome-icon :icon="icon.angleUp" class="fa-angle-up"/>
          </a>
        </div>
        <div>
          <a class="box-inner-time" @click="onClickHour" @keydown="onKeyDown" v-bind:style="timeStyle(isHourClick)"> {{ hour }} </a>
        </div>
        <div v-show="arrow" class="time-row-down">
          <a @click="onClickArrowDownHour" v-bind:style="arrowTimeStyle(isHourClick)">
            <font-awesome-icon :icon="icon.angleDown" class="fa-angle-down"/>
          </a>
        </div>
      </div>

      <!-- Colon -->
      <div class="time-row">
        <div v-show="arrow" class="time-row-up"></div>
        <span class="box-inner-colon" v-bind:style="colonStyle()"> : </span>
        <div v-show="arrow" class="time-row-down">
          <font-awesome-icon :icon="icon.angleDown" class="fa-angle-down" v-bind:style="{ 'color': color }"/>
        </div>
      </div>

      <!-- Minute -->
      <div class="time-row">
        <div v-show="arrow" class="time-row-up">
          <a @click="onClickArrowUpTime" v-bind:style="arrowTimeStyle(isMinuteClick)">
            <font-awesome-icon :icon="icon.angleUp" class="fa-angle-up"/>
          </a>
        </div>
        <div>
          <a class="box-inner-time" @click="onClickMinute" @keydown="onKeyDown" v-bind:style="timeStyle(isMinuteClick)"> {{ minute }} </a>
        </div>
        <div v-show="arrow" class="time-row-down">
          <a @click="onClickArrowDownTime" v-bind:style="arrowTimeStyle(isMinuteClick)">
            <font-awesome-icon :icon="icon.angleDown" class="fa-angle-down"/>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    width: {
      type: String,
      default: '300px' // '300px'
    },
    color: {
      type: String,
      default: '#1867c0' // '#4caf50'
    },
    timeColor: {
      type: String,
      default: 'white'
    },
    timeSize: {
      type: String,
      default: '50px' // '70px'
    },
    timeWeight: {
      type: String,
      default: '500'
    },
    time: {
      type: String,
      default: '--:--'
    },
    arrow: {
      type: Boolean,
      default: true
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      icon: {
        angleUp: faAngleUp,
        angleDown: faAngleDown,
      },
      hour: this.getTime(this.time).hour,
      minute: this.getTime(this.time).minute,
      isHourClick: false,
      isMinuteClick: false,
      hourCount: this.getTime(this.time).hourCount,
      minuteCount: this.getTime(this.time).minuteCount,
      hourMaxCount: 23,
      minuteMaxCount: 59,
      isInsideMouse: false,
      timer: null
    }
  },

  mounted () {
    window.addEventListener('keydown', (e) => {
      this.onKeyDown(e)
    })
  },

  watch: {
    time (time) {
      if (time) {
        const times = time.toString().split(':')
        this.hour = times[0]
        this.minute = times[1]
      }
    }
  },

  methods: {
    getTime (time) {
      if (!time || time.trim() === '' || time === '--:--' || time === '00:00') {
        return { hour: '--', minute: '--', hourCount: 0, minuteCount: 0 }
      }

      const times = time.toString().split(':')
      const hour = times[0]
      const minute = times[1]
      const hourCount = hour < 10 ? '0' + hour : hour
      const minuteCount = minute < 10 ? '0' + minute : minute

      return { hour, minute, hourCount, minuteCount }
    },
    onWheel (e) {
      e.preventDefault()

      if (e.deltaY < 0) { // UP
        if (this.isHourClick && this.hourCount < this.hourMaxCount) {
          this.hourCount++
        }
        if (this.isMinuteClick && this.minuteCount < this.minuteMaxCount) {
          this.minuteCount++
        }
      } else if (e.deltaY > 0){ // DOWN
        if (this.isHourClick && this.hourCount > 0) {
          this.hourCount--
        }
        if (this.isMinuteClick && this.minuteCount > 0) {
          this.minuteCount--
        }
      }

      if (this.isHourClick) {
        if (this.hour === '--') {
          this.hour = '00'
          this.hourCount = 0
        } else {
          this.hour = this.hourCount < 10 ? '0' + this.hourCount : this.hourCount
        }
      } else if (this.isMinuteClick) {
        if (this.minute === '--') {
          this.minute = '00'
          this.minuteCount = 0
        } else {
          this.minute = this.minuteCount < 10 ? '0' + this.minuteCount : this.minuteCount
        }
      }

      this.emitChange()
    },
    onClickHour () {
      this.isHourClick = true
      this.isMinuteClick = false
    },
    onClickMinute () {
      this.isHourClick = false
      this.isMinuteClick = true
    },
    onKeyDown (e) {
      if (this.isInsideMouse) {
        e.preventDefault()
      } else {
        return false
      }

      const keyCode = {
        UP: 38,
        DOWN: 40
      }

      if (e.keyCode === keyCode.UP) {
        if (this.isHourClick && this.hourCount < this.hourMaxCount) {
          this.hourCount++
        }
        if (this.isMinuteClick && this.minuteCount < this.minuteMaxCount) {
          this.minuteCount++
        }
      } else if (e.keyCode === keyCode.DOWN) {
        if (this.isHourClick && this.hourCount > 0) {
          this.hourCount--
        }
        if (this.isMinuteClick && this.minuteCount > 0) {
          this.minuteCount--
        }
      }

      if (this.isHourClick) {
        if (this.hour === '--') {
          this.hour = '00'
          this.hourCount = 0
        } else {
          this.hour = this.hourCount < 10 ? '0' + this.hourCount : this.hourCount
        }
      } else if (this.isMinuteClick) {
        if (this.minute === '--') {
          this.minute = '00'
          this.minuteCount = 0
        } else {
          this.minute = this.minuteCount < 10 ? '0' + this.minuteCount : this.minuteCount
        }
      }

      this.emitChange()
    },
    boxStyle () {
      const css = {
        textAlign: 'center',
        backgroundColor: this.color,
        height: 'auto',
        width: this.width
      }

      const boxShadow = '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'

      if (this.shadow) {
        css.boxShadow = boxShadow
      }

      return css
    },
    colonStyle () {
      return {
        color: this.timeColor,
        fontSize: this.timeSize,
        fontWeight: this.timeWeight
      }
    },
    timeStyle (isClick) {
      return {
        color: this.timeColor,
        fontSize: this.timeSize,
        opacity: isClick ? 1 : .6,
        marginTop: this.arrow ? '-10px' : '0px',
        fontWeight: this.timeWeight
      }
    },
    arrowTimeStyle (isClick) {
      return {
        color: this.timeColor,
        cursor: isClick ? '' : 'pointer',
        opacity: isClick ? 1 : .6
      }
    },
    onClickArrowUpHour () {
      this.isHourClick = true
      this.isMinuteClick = false

      if (this.hourCount < this.hourMaxCount) {
        if (this.hour === '--') {
          this.hour = '00'
          this.hourCount = 0
        } else {
          this.hourCount++
          this.hour = this.hourCount < 10 ? '0' + this.hourCount : this.hourCount
        }
      }

      this.emitChange()
    },
    onClickArrowDownHour () {
      this.isHourClick = true
      this.isMinuteClick = false

      if (this.hourCount > 0) {
        this.hourCount--
        this.hour = this.hourCount < 10 ? '0' + this.hourCount : this.hourCount
      }

      this.emitChange()
    },
    onClickArrowUpTime () {
      this.isHourClick = false
      this.isMinuteClick = true

      if (this.minuteCount < this.minuteMaxCount) {
        if (this.minute === '--') {
          this.minute = '00'
          this.minuteCount = 0
        } else {
          this.minuteCount++
          this.minute = this.minuteCount < 10 ? '0' + this.minuteCount : this.minuteCount
        }
      }

      this.emitChange()
    },
    onClickArrowDownTime () {
      this.isHourClick = false
      this.isMinuteClick = true

      if (this.minuteCount > 0) {
        this.minuteCount--
        this.minute = this.minuteCount < 10 ? '0' + this.minuteCount : this.minuteCount
      }

      this.emitChange()
    },
    emitChange () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.timer = null
        const hour = this.hour === '--' ? '00' : this.hour.toString()
        const minute = this.minute === '--' ? '00' : this.minute.toString()

        this.$emit('change', hour + ':' + minute)
      }, 400)
    }
  }
}
</script>

<style>
  .box-inner-colon {
    display: inline-flex;
    margin: 0px;
    padding: 0px;
  }
  .box-inner-time {
    opacity: .6;
    display: inline-flex;
    justify-content: center;
    margin: 0px;
    padding: 0px;
  }
  .fa-angle-up, .fa-angle-down {
    font-size: 20px; 
    font-weight: bold;
  }
  .time-row {
    display: inline-block;
  }
  .time-row > div > a {
    cursor: pointer;
  }
  .time-row-up {
    text-align: center;
    margin-top: 10px;
  }
  .time-row-down {
    text-align: center;
    margin-bottom: -10px;
  }
</style>
