<template>
  <div>
  <v-dialog
    v-model="state.dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    close-on-back
    retain-focus
  >
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" :disabled="timer.isStarted || timer.timeRemaining !== timer.settings[timer.currentSession].time">
        <v-icon>mdi-cog</v-icon>
        <v-tooltip activator="parent" location="bottom" open-delay="500">
          Settings
        </v-tooltip>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar>
        <v-btn icon @click="state.dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="saveSettings">
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      
      <!-- Timer Settings -->
      <v-list>
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
            class="w-75"
            :ticks="sliderTicks.workTimer"
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
            class="w-75"
            :ticks="sliderTicks.breakTimers"
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
            class="w-75"
            :ticks="sliderTicks.maxSessions"
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
      </v-list>
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
const timer = useTimerStore()

const settings = reactive({
  timer: {
    'work': timer.settings['work'].time / 60,
    'short-break': timer.settings['short-break'].time / 60,
    'long-break': timer.settings['long-break'].time / 60,
    'max-sessions': timer.getMaxSessions,
    autoStart: true
  },
  showNotification: false,
  showThemeToggle: true,
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
  state.dialog = false
  state.snackbar = true
}

</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}

</style>