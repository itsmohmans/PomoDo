<template>
  <div class="text-center mt-10">
    <v-progress-circular
      :rotate="360"
      :size="400"
      :width="3"
      class="progress"
      :model-value="(timer().getTimeRemaining * 100) / (timer().getSessionTime * 60)"
      :color="timer().getCurrentColor"
    >
    {{ String(getMinutes()).padStart(2, '0') }}:{{ String(getSeconds()).padStart(2, '0') }}
    </v-progress-circular>
    <div class="session-info">
      <p>{{ timer().settings.timer[timer().getCurrentSession].text }}</p>
      <p>Session {{ timer().getCurrentSessionNumber }} / {{ timer().getMaxSessions }}</p>
    </div>
  </div>
</template>
<script setup>
import { useTimerStore as timer } from '/stores/timer';
const getMinutes = () => Math.floor(timer().getTimeRemaining / 60)
const getSeconds = () => timer().getTimeRemaining - 60 * getMinutes()

useHead(() => {
  return {
    titleTemplate: timer().isStarted ? `${timer().settings.timer[timer().getCurrentSession].text} - ${getMinutes()} Mins left | PomoDo` : 'PomoDo'
  }
})

</script>
<style scoped>
.progress {
  font-size: 5rem;
}
.session-info {
  margin-top: 2rem;
}
</style>