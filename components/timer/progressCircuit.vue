<template>
  <div class="text-center mt-10">
    <v-progress-circular
      :rotate="360"
      :size="400"
      :width="40"
      class="progress"
      :model-value="timer.getTimeRemaining*100 / timer.getSessionTime"
      color="teal"
    >
    {{ String(getMinutes()).padStart(2, '0') }}:{{ String(getSeconds()).padStart(2, '0') }}
    </v-progress-circular>
    <div class="session-info">
      <p>{{ timer.settings[timer.getCurrentSession].text }}</p>
      <p>Session {{ timer.getCurrentSessionNumber }} / {{ timer.getMaxSessions }}</p>
    </div>
  </div>
</template>
<script setup>
import { useTimerStore } from '/stores/timer';
const timer = useTimerStore()
const getMinutes = () => Math.floor(timer.getTimeRemaining / 60)
const getSeconds = () => timer.getTimeRemaining - 60 * getMinutes()

useHead(() => {
  return {
    titleTemplate: `${timer.settings[timer.getCurrentSession].text} - ${getMinutes()} Mins left | PomoDo`
  }
})

</script>
<style scoped>
.progress {
  font-size: 4rem;
}
.session-info {
  margin-top: 2rem;
}
</style>