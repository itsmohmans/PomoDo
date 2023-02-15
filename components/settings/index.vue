<template>
  <div>
  <v-dialog
    v-model="state.dialog"
    max-width='90vw'
    scrim="background"
    max-height='600px'
    transition="dialog-bottom-transition"
    close-on-back
    retain-focus
  >
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-cog</v-icon>
        <v-tooltip activator="parent" location="bottom" open-delay="500">
          Settings
        </v-tooltip>
      </v-btn>
    </template>
    <v-card>      
      <!-- Timer Settings -->
      <v-list class="px-2 px-md-16">
        <v-list-subheader>Timer Settings</v-list-subheader>
        <!-- Work Time -->
        <v-list-item title="Work Sessions">
          <v-slider
            v-model="timer().settings['work'].time"
            max="60"
            min="5"
            step="5"
            show-ticks
            color="teal"
            class="w-100"
            :ticks="sliderTicks.workTimer"
            thumb-label
          >
            <template v-slot:append>
              <v-text-field
                v-model="timer().settings['work'].time"
                hide-details
                single-line
                density="compact"
                type="number"
                style="width: 70px"
              ></v-text-field>
            </template>
          </v-slider>
        </v-list-item>
        <!-- Breaks Sessions -->
        <v-list-item
          v-for="value, i in ['short-break', 'long-break']"
          :key="i"
          :title="timer().settings[value].text">
          <v-slider
            v-model="timer().settings[value].time"
            max="60"
            min="0"
            step="5"
            show-ticks
            color="teal"
            class="w-100"
            :ticks="sliderTicks.breakTimers"
            thumb-label
          >
            <template v-slot:append>
              <v-text-field
                v-model="timer().settings[value].time"
                hide-details
                single-line
                density="compact"
                type="number"
                style="width: 70px"
              ></v-text-field>
            </template>
          </v-slider>
        </v-list-item>


        <v-list-item
          title="Max Sessions"
          subtitle="The number of work sessions before a long break"
          >
          <v-slider
            v-model="timer().maxSessions"
            max="10"
            min="1"
            step="1"
            show-ticks
            color="teal"
            class="w-100"
            :ticks="sliderTicks.maxSessions"
            thumb-label
          >
            <template v-slot:append>
              <v-text-field
                v-model="timer().maxSessions"
                hide-details
                single-line
                density="compact"
                type="number"
                style="width: 70px"
              ></v-text-field>
            </template>
          </v-slider>
        </v-list-item>
        <v-list-item
          title="Auto Start Sessions"
          subtitle="Automatically start the next session when the time for current session is up.">
          <template v-slot:prepend>
            <!-- TODO: refactor checkboxes for better accessability -->
            <v-checkbox v-model="timer().autoStart" color="teal"></v-checkbox>
          </template>
        </v-list-item>
      
        <v-divider></v-divider>

      <!-- General Settings -->
        <v-list-subheader>General Settings</v-list-subheader>
        <v-list-item title="Notifications" subtitle="Show notification when a session ends">
          <template v-slot:prepend>
            <v-checkbox v-model="app().showNotification" color="teal"></v-checkbox>
          </template>
        </v-list-item>
        <v-list-item title="Dark / Light Theme Toggle" subtitle="Show a theme toggle">
          <template v-slot:prepend>
            <v-checkbox v-model="app().showThemeToggle" color="teal"></v-checkbox>
          </template>
        </v-list-item>
        <v-list-item title="Sessions end sound" subtitle="Play alarm sound on session end">
          <template v-slot:prepend>
            <v-checkbox v-model="app().playSessionEndSound" color="teal"></v-checkbox>
          </template>
        </v-list-item>

        <!-- Footer -->
        <v-divider></v-divider>
        <v-footer class="flex flex-column">
          <div class="w-100 py-1 text-center">
            Made with ❤️ by Mo Mansour
            <v-btn
              icon="mdi-github"
              variant="plain"
              size="medium"
              href="https://github.com/itsmohmans/pomodo"
              target="_blank"
              class="ml-3"
            ></v-btn>
          </div>
          <div class="app-version font-weight-thin text-disabled">
            {{ useRuntimeConfig().public.APP_VERSION }}
          </div>
        </v-footer>
      </v-list>
      
      <v-card-actions>
        <!-- TODO: add a button to reset settings to defaults -->
        <v-spacer></v-spacer>
        <v-btn
          color="teal"
          variant="text"
          @click="saveSettings"
        >
          Close
        </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar
    v-model="state.snackbar"
    timeout="1500"
    @click="state.snackbar = false"
    color="teal"
  >
    Settings saved successfully
  </v-snackbar>
</div>
</template>
<script setup>
import { useTimerStore as timer} from '~~/stores/timer'
import {useAppStore as app} from '~~/stores/app'

const sliderTicks = reactive({
  workTimer: {
    5: '5',
    60: '60'
  },
  breakTimers: {
    0: '0',
    60: '60'
  },
  maxSessions: {
    1: '1',
    10: '10'
  }
})
const state = reactive({
  dialog: false,
  snackbar: false
})

// save settings to localstorage
const saveSettings = () => {
  timer().clearTimeRemaining()
  if(app().showNotification) saveNotification()
  storeSettings()
  
  state.dialog = false
  state.snackbar = true
}

// get notification permission from the browser
const saveNotification = () => {
  const {isSupported, show} = useWebNotification({
      title: "Notifications enabled.",
  })
  if (isSupported.value) {
    show()
  } else {
    console.error('Your browser does not support notifications.')
  }
}

</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .1s ease-in-out;
}
</style>
