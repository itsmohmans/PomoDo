<template>
  <div class="controls-container">
    <v-btn
      :disabled="!(timer().isStarted || timer().getTimeRemaining !== timer().settings.timer[timer().currentSession].time * 60)"
      variant="outlined"
      size="small"
      icon
      :color="timer().settings.timer[timer().currentSession].color"
      @click="clearTimer"
    >
      <v-icon>mdi-stop</v-icon>
    </v-btn>
    <v-btn
      elevation="4"
      size="x-large" width="144"
      :color="timer().settings.timer[timer().currentSession].color"
      :variant="timer().isStarted ? 'outlined' : 'elevated'"
      @click="toggleTimer"
    >
      {{timer().isStarted ? 'Pause' : 'Start'}}
      <v-tooltip
        v-if="!mobile"
        activator="parent"
        location="bottom"
        open-delay="500"
      >
        You can also use the keyboard's spacebar to start / stop
      </v-tooltip>
    </v-btn>
    <v-btn
      variant="outlined"
      size="small"
      icon
      :color="timer().settings.timer[timer().currentSession].color"
      @click="timer().nextSession()"
    >
      <v-icon>mdi-skip-next</v-icon>
    </v-btn>
  </div>
</template>
<script setup>
import { useTimerStore as timer } from '/stores/timer';
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const { toggleTimer, clearTimer } = useTimerControls()

// Keyboard shortcut to toggle timer (spacebar)
onKeyStroke(" ", (e) => {
  e.preventDefault()
  toggleTimer()
})

onBeforeUnmount(clearTimer())
</script>
<style scoped>
.controls-container {
  display: flex;
  flex-direction: row;
  column-gap: 2rem;
  align-items: center;
  justify-content: center;
}
</style>