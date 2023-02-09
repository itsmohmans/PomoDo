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
            v-model="settings.timer['work']"
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
                v-model="settings.timer['work']"
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
          :title="timer.settings[value].text">
          <v-slider
            v-model="settings.timer[value]"
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
                v-model="settings.timer[value]"
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
            v-model="settings.timer['max-sessions']"
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
                v-model="settings.timer['max-sessions']"
                hide-details
                single-line
                density="compact"
                type="number"
                style="width: 70px"
              ></v-text-field>
            </template>
          </v-slider>
        </v-list-item>
        <v-list-item title="Auto start next session">
          <template v-slot:prepend>
            <v-checkbox v-model="settings.timer.autoStart"></v-checkbox>
          </template>
        </v-list-item>
      
        <v-divider></v-divider>

      <!-- General Settings -->
        <v-list-subheader>General Settings</v-list-subheader>
        <v-list-item title="Notifications" subtitle="Show notification when a session ends">
          <template v-slot:prepend>
            <v-checkbox v-model="settings.showNotification"></v-checkbox>
          </template>
        </v-list-item>
        <v-list-item title="Dark / Light Theme Toggle" subtitle="Show a theme toggle">
          <template v-slot:prepend>
            <v-checkbox v-model="settings.showThemeToggle"></v-checkbox>
          </template>
        </v-list-item>

        <!-- Footer -->
        <v-divider></v-divider>
        <v-footer>
          <div class="w-100 py-1 text-center">
            Made with ❤️ by Mo Mansour
            <v-btn
              icon="mdi-github"
              variant="plain"
              size="medium"
              href="https://github.com/itsmohmans/pomodo"
              target="_blank"
              class="mx-4"
            ></v-btn>
          </div>
        </v-footer>
      </v-list>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="teal"
          variant="text"
          @click="state.dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="teal"
          variant="text"
          @click="saveSettings"
        >
          Save
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
import { useTimerStore } from '~~/stores/timer';
import {useAppStore} from '~~/stores/app'
const timer = useTimerStore()
const app = useAppStore()

const settings = reactive({
  timer: {
    'work': timer.settings['work'].time / 60,
    'short-break': timer.settings['short-break'].time / 60,
    'long-break': timer.settings['long-break'].time / 60,
    'max-sessions': timer.getMaxSessions,
    autoStart: timer.autoStart
  },
  showNotification: app.showNotification,
})

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

const saveSettings = () => {
  timer.setTimerSettings(
    settings.timer.work*60,
    settings.timer['short-break']*60,
    settings.timer['long-break']*60
  )
  timer.setMaxSessions(settings.timer['max-sessions'])
  timer.autoStart = settings.timer.autoStart
  settings.showNotification ? saveNotification() : app.showNotification = false

  state.dialog = false
  state.snackbar = true
}

// get notification permission from the browser
const saveNotification = () => {
  const {isSupported, show} = useWebNotification({
      title: "Notifications enabled.",
  })
  if (isSupported.value) {
    app.showNotification = settings.showNotification
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
