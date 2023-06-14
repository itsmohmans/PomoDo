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
            v-model="settings.timer.work"
            min="5" max="60" step="5"
            show-ticks thumb-label
            :color="timer().getCurrentColor"
            class="w-100"
            :ticks="sliderTicks.workTimer"
            :rules="rules.workRules"
          >
            <template v-slot:append>
              <v-text-field
                v-model="settings.timer.work"
                hide-details single-line
                density="compact"
                type="number"
                style="width: 70px"
                min="5" max="60"
              ></v-text-field>
            </template>
          </v-slider>
        </v-list-item>
        <!-- Breaks Sessions -->
        <v-list-item
          v-for="value, i in ['short-break', 'long-break']"
          :key="i"
          :title="timer().settings.timer[value].text">
          <v-slider
            v-model="settings.timer[value]"
            min="0" max="60" step="5"
            show-ticks thumb-label
            :color="timer().getCurrentColor"
            class="w-100"
            :ticks="sliderTicks.breakTimers"
            :rules="rules.breakRules"
          >
            <template v-slot:append>
              <v-text-field
                v-model="settings.timer[value]"
                hide-details single-line
                density="compact"
                type="number"
                style="width: 70px"
                min="0" max="60"
              ></v-text-field>
            </template>
          </v-slider>
        </v-list-item>


        <v-list-item
          title="Max Sessions"
          subtitle="The number of work sessions before a long break"
          >
          <v-slider
            v-model="settings.maxSessions"
            min="1" max="10" step="1"
            show-ticks thumb-label
            :color="timer().getCurrentColor"
            class="w-100"
            :ticks="sliderTicks.maxSessions"
            :rules="rules.maxSessionsRules"
          >
            <template v-slot:append>
              <v-text-field
                v-model="settings.maxSessions"
                hide-details single-line
                density="compact"
                type="number"
                style="width: 70px"
                min="1" max="10"
              ></v-text-field>
            </template>
          </v-slider>
        </v-list-item>
        <v-list-item>
            <v-checkbox
              v-model="timer().settings.autoStart"
              :color="timer().getCurrentColor"
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
            v-model="settings.notificationsEnabled"
            :color="timer().getCurrentColor"
            label="Notifications"
            true-icon="mdi-bell"
            false-icon="mdi-bell-off"
          >
          </v-checkbox>
        </v-list-item>
        <v-list-item>
          <v-checkbox
            v-model="app().playSessionEndSound"
            :color="timer().getCurrentColor"
            label="Sounds"
            true-icon="mdi-volume-high"
            false-icon="mdi-volume-off"
          >
          </v-checkbox>
        </v-list-item>
        <v-list-item>
          <v-checkbox
            v-model="app().showThemeToggle"
            :color="timer().getCurrentColor"
            label="Show Theme Toggle"
            true-icon="mdi-theme-light-dark"
            false-icon="mdi-theme-light-dark"
          >
          </v-checkbox>
        </v-list-item>

        <!-- Footer -->
        <v-divider></v-divider>
        <v-footer class="d-flex flex-column align-center">
          <div>Made with ❤️ by Mo Mansour</div>
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
              href="mailto:mohmans+pomodo@pm.me?subject=%5BPomoDo%20App%5D"
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
          :color="timer().getCurrentColor"
          variant="text"
          @click="state.dialog = false"
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
    :color="timer().getCurrentColor"
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
// only the settings that need validation
const settings = reactive({
  timer: {
    'work': 25,
    'short-break': 5,
    'long-break': 15,
  },
  maxSessions: 4,
  notificationsEnabled: false,
})
const state = reactive({
  dialog: false,
  snackbar: false,
})

// rules for validating inputs
const rules = reactive({
  workRules: [
    (value) => {
      if (value >= 5 && value <= 60) return true

      if (value <= 0) return "Are you kidding me? if you don't wanna work then just go find something better to do than playing with my settings."
      if (value < 5) return "Do you want to work for less than 5 mins?! You can do better."
      return "Don't be so hard on yourself, work for an hour or less before taking a break."
    }
  ],
  breakRules: [
    (value) => {
      if (value >= 0 && value <= 60) return true

      if (value < 0) return "How tf would you take a negative break time you moron?"
      return "That's too much time for a break, stop wasting your time."
    }
  ],
  maxSessionsRules: [
    (value) => {
      if (value >= 1) return true

      return "Max sessions can't be less than one!"
    }
  ],
})

// save settings to localstorage
const saveSettings = () => {

  saveNotification()

  // validate user inputs before saving
  if (rules.workRules[0](settings.timer.work) === true) {
    timer().settings.timer.work.time = settings.timer.work
  }
  if (rules.breakRules[0](settings.timer['short-break']) === true) {
    timer().settings.timer['short-break'].time = settings.timer['short-break']
  }
  if (rules.breakRules[0](settings.timer['long-break']) === true) {
    timer().settings.timer['long-break'].time = settings.timer['long-break']
  }
  if (rules.maxSessionsRules[0](settings.maxSessions) === true) {
    timer().settings.maxSessions = settings.maxSessions
  }

  storeSettings()
  
  state.dialog = false
  state.snackbar = true
}

watch (
  () => state.dialog,
  (dialog) => {
    if (!dialog) { // if dialog is closed
      saveSettings()
    }
    else {
      // retrieve settings from state when dialog is opened
      settings.notificationsEnabled = app().showNotification
      settings.maxSessions = timer().settings.maxSessions
      for (let session of Object.keys(settings.timer)) {
        settings.timer[session] = timer().settings.timer[session].time
      }
    }
  }
)

// get notification permission from the browser
const saveNotification = () => {
  const {isSupported, show} = useWebNotification({
      title: "Notifications enabled.",
  })
  if (isSupported.value) {
    if(!app().showNotification && settings.notificationsEnabled)
      show()
  } else {
    console.error('Your browser does not support notifications.')
  }
  app().showNotification = settings.notificationsEnabled
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
