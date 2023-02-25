<template>
  <div class="controls-container">
    <v-btn
      :disabled="!(timer.isStarted || timer.getTimeRemaining !== timer.settings[timer.currentSession].time * 60)"
      variant="outlined"
      size="small"
      icon
      :color="timer.settings[timer.currentSession].color"
      @click="clearTimer"
    >
      <v-icon>mdi-stop</v-icon>
    </v-btn>
    <v-btn
      elevation="4"
      size="x-large"
      width="144"
      :color="timer.settings[timer.currentSession].color"
      :variant="timer.isStarted ? 'outlined' : 'elevated'"
      @click="toggleTimer"
    >
      {{timer.isStarted ? 'Pause' : 'Start'}}
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
      :color="timer.settings[timer.currentSession].color"
      @click="timer.nextSession()"
    >
      <v-icon>mdi-skip-next</v-icon>
    </v-btn>
  </div>
</template>
<script setup>
import { useTimerStore as timer, useTimerControls } from '/stores/timer';
import { useDisplay, onBeforeUnmount } from 'vue/dist/vue.esm-bundler';

const { mobile } = useDisplay();
const { toggleTimer, clearTimer } = useTimerControls();

// Keyboard shortcut to toggle timer (spacebar)
const onKeyStroke = (key, callback) => {
const handleKeyDown = (e) => {
if (e.code === key) {
callback(e);
}
};
window.addEventListener('keydown', handleKeyDown);
return () => {
window.removeEventListener('keydown', handleKeyDown);
};
};
onKeyStroke("Space", (e) => {
e.preventDefault();
toggleTimer();
});
onBeforeUnmount(clearTimer);
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