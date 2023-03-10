<template>
  <div class="text-center mt-10">
    <v-progress-circular
      :rotate="360"
      :size="400"
      :width="3"
      class="progress"
      :model-value="(timer().getTimeRemaining * 100) / (timer().getSessionTime * 60)"
      :color="timer().settings[timer().currentSession].color"
    >
    {{ String(getMinutes()).padStart(2, '0') }}:{{ String(getSeconds()).padStart(2, '0') }}
    </v-progress-circular>
    
    <div class="session-info">
      <timer-label />
      <div>
        {{ timer().settings[timer().getCurrentSession].text }} <b>·</b> {{ timer().getCurrentSessionNumber }} / {{ timer().getMaxSessions }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTimerStore as timer } from '/stores/timer';
const getMinutes = () => Math.floor(timer().getTimeRemaining / 60)
const getSeconds = () => timer().getTimeRemaining - 60 * getMinutes()

useHead(() => {
  return {
    titleTemplate: timer().isStarted ? `${timer().settings[timer().getCurrentSession].text} - ${getMinutes()} Mins left | PomoDo` : 'PomoDo'
  }
})

</script>
<style scoped>
.progress {
  font-size: 5rem;
}
.session-info {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.1rem;
}
</style>