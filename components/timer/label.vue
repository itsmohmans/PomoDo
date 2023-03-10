<template>
  <div>
    <v-chip
      variant="outlined"
      :color="timer().settings[timer().currentSession].color"
      @click="state.dialog = true"
    >
      Label
    </v-chip>
    <!-- TODO: Display a pop-up dialog to choose a label
        or delete labels. The changes are then saved to state and localstorage
        It should have:
          - A list displaying current labels, if any
          - A plus button to add a new label, that shows:
            - A text box for label name
            - A color picker for label color
    -->
  </div>
</template>
<script setup>
import { useTimerStore as timer} from '~~/stores/timer'

const state = reactive({
  dialog: false
})

</script>
