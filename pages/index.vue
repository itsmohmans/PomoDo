<template>
  <div>
    <Timer />
  </div>
</template>
<script setup>
import { useTimerStore as timer } from '~~/stores/timer';

onMounted(() => {
  getSettings()
  console.log("hello")
  timer().clearTimeRemaining()
})
</script>
