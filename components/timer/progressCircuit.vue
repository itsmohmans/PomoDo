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
      {{ useTimerStore().getTimeRemaining }}
    </v-progress-circular>
  </div>
</template>
<script setup>
import { useTimerStore } from '/stores/timer';
const baseTime = useTimerStore().getTimeRemaining
</script>
<style scoped>
.progress {
  font-size: 4rem;
}
</style>