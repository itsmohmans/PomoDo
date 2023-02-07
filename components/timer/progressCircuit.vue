<template>
  <div class="text-center">
    <v-progress-circular
      :rotate="360"
      :size="400"
      :width="60"
      class="progress"
      :model-value="useTimerStore().getTimeRemaining*100 / baseTime"
      color="teal"
    >
    {{ String(getMinutes()).padStart(2, '0') }}:{{ String(getSeconds()).padStart(2, '0') }}
    </v-progress-circular>
  </div>
</template>
<script setup>
import { useTimerStore } from '/stores/timer';
const baseTime = useTimerStore().getTimeRemaining
const getMinutes = () => Math.floor(useTimerStore().getTimeRemaining / 60)
const getSeconds = () => useTimerStore().getTimeRemaining - 60 * getMinutes()
</script>
<style scoped>
.progress {
  font-size: 4rem;
}
</style>