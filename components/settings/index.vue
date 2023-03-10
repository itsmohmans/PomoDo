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
            :color="timer().settings[timer().currentSession].color"
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
            :color="timer().settings[timer().currentSession].color"
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
            :color="timer().settings[timer().currentSession].color"
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
        <v-list-item>
            <v-checkbox
              v-model="timer().autoStart"
              :color="timer().settings[timer().currentSession].color"
              label="Auto Start Sessions"
              true-icon="mdi-timer-play-outline"
              false-icon="mdi-timer-play-outline"
            ></v-checkbox>
        </v-list-item>
      
        <v-divider></v-divider>

      <!-- General Settings -->
        <v-list-subheader>General Settings</v-list-subheader>
        <v-list-item>
            <v-checkbox
              v-model="app().showNotification"
              :color="timer().settings[timer().currentSession].color"
              label="Notifications"
              true-icon="mdi-bell"
              false-icon="mdi-bell-off"
            >
            </v-checkbox>
        </v-list-item>
        <v-list-item>
            <v-checkbox
              v-model="app().playSessionEndSound"
              :color="timer().settings[timer().currentSession].color"
              label="Sounds"
              true-icon="mdi-volume-high"
              false-icon="mdi-volume-off"
            >
            </v-checkbox>
        </v-list-item>
        <v-list-item>
            <v-checkbox
              v-model="app().showThemeToggle"
              :color="timer().settings[timer().currentSession].color"
              label="Show Theme Toggle"
              true-icon="mdi-theme-light-dark"
              false-icon="mdi-theme-light-dark"
            >
            </v-checkbox>
        </v-list-item>

        <!-- Footer -->
        <v-divider></v-divider>
        <v-footer class="d-flex flex-column align-center">
          <div>Made with ?????? by Mo Mansour</div>
          <div>
            <v-btn
              icon="mdi-github"
              variant="plain"
              size="medium"
              href="https://github.com/itsmohmans/pomodo"
              target="_blank"
            ></v-btn>
            <v-btn
              icon="mdi-email"
              variant="plain"
              size="medium"
              href="mailto:mohmans@pm.me?subject=%5BPomoDo%20App%5D"
              class="ml-2"
            ></v-btn>
          </div>
          <div
            v-if="useRuntimeConfig().public.APP_VERSION"
            class="mt-4 font-weight-thin text-disabled"
          >
            {{ useRuntimeConfig().public.APP_VERSION }}
          </div>
        </v-footer>
      </v-list>
      
      <v-card-actions>
        <!-- TODO: add a button to reset settings to defaults -->
        <v-spacer></v-spacer>
        <v-btn
          :color="timer().settings[timer().currentSession].color"
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
    :color="timer().settings[timer().currentSession].color"
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
.v-footer {
  row-gap: 0.4rem;
}
</style>
