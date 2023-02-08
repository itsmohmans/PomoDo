<template>
  <div class="controls-container">
    <v-btn
      variant="outlined"
      size="small"
      icon
      color="teal"
      @click="timer.clearTimeRemaining()"
    >
      <v-icon>mdi-restart</v-icon>
    </v-btn>
    <v-btn
      elevation="4"
      size="x-large" width="144"
      color="teal"
      :variant="timer.isStarted ? 'outlined' : 'elevated'"
      @click="toggleStart"
    >
      {{timer.isStarted ? 'Stop' : 'Start'}}
    </v-btn>
    <v-btn
      variant="outlined"
      size="small"
      icon
      color="teal"
      @click="timer.nextSession()"
    >
      <v-icon>mdi-skip-next</v-icon>
    </v-btn>
  </div>
</template>
<script setup>
import { useTimerStore } from '/stores/timer';
const timer = useTimerStore()
const state = reactive({
  interval: {} // store the running interval
})

const toggleStart = () => {
  timer.toggleTimer()
  if (timer.isStarted) {
    state.interval = setInterval(startTimer, 1000)
  }
  else clearInterval(state.interval)
}
const startTimer = () => {
  if (timer.getTimeRemaining === 0) {
    return timer.nextSession()
  }
  timer.setTimeRemaining(timer.getTimeRemaining - 1)
}
onBeforeUnmount(() => clearInterval(state.interval))

// Keyboard shortcut to toggle timer (spacebar)
onKeyStroke(" ", (e) => {
  e.preventDefault()
  toggleStart()
})
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