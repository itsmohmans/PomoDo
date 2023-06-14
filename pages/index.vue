<template>
  <div>
    <Timer />
  </div>
</template>
<script setup>
import { useTimerStore as timer } from '~~/stores/timer';

onMounted(() => {
  getSettings()
  timer().clearTimeRemaining()
})
</script>