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
import { useAppStore } from '~~/stores/app';
const app = useAppStore()
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
  if (timer.getTimeRemaining <= 0) {
    const currentSession = timer.settings[timer.currentSession].text
    
    timer.nextSession()
    const nextSession = timer.settings[timer.currentSession].text

    if (app.showNotification) showNotification(currentSession, nextSession)
    
    if (timer.autoStart)
      return
    return toggleStart()
  }
  timer.setTimeRemaining(timer.getTimeRemaining - 1)
}

const showNotification = (currentSession, nextSession) => {
  const {
    isSupported,
    notification,
    show,
    onError,
  } = useWebNotification({
        title: `${currentSession} is done.`,
        body: `You've just finished a ${String(currentSession).toLowerCase()} session. Now get ready to start the next session: ${nextSession}`,
        renotify: true,
        tag: currentSession
  })
  if (isSupported.value)
    show()
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