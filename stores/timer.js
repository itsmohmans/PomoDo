export const useTimerStore = defineStore('timer', {
  state: () => ({
    started: false,
    settings: {
      'work': {
        text: 'Work',
        time: 25, // in minutes
        color: 'teal'
      },
      'short-break': {
        text: 'Short Break',
        time: 5,
        color: 'cyan'
      },
      'long-break': {
        text: 'Long Break',
        time: 15,
        color: 'light-blue'
      }
    },
    timeRemaining: 25*60, // in seconds
    currentSession: 'work',
    currentSessionNumber: 1,
    maxSessions: 4,   // the number of sessions before a long break
    autoStart: true
  }),
  getters: {
    isStarted: (state) => state.started,
    getTimeRemaining: (state) => state.timeRemaining,
    getSessionTime: (state) => state.settings[state.currentSession].time,
    getCurrentSession: (state) => state.currentSession,
    isWork: (state) => state.settings[state.currentSession] === 'work',
    getCurrentSessionNumber: (state) => state.currentSessionNumber,
    getMaxSessions: (state) => state.maxSessions,
  },
  actions: {
    toggleTimer() {
      this.started = !this.started
    },
    clearTimeRemaining() {
      this.timeRemaining = this.getSessionTime * 60
    },
    setTimeRemaining(time) {
      this.timeRemaining = time
    },
    nextSession() {
      // if current session is not work (i.e. a break) 
      if (this.currentSession !== 'work') {
        this.currentSessionNumber = this.currentSessionNumber % this.maxSessions + 1
        this.currentSession = 'work'
      }
      else if (this.currentSessionNumber === this.maxSessions) {
        this.currentSession = 'long-break'
      }
      else {
        this.currentSession = 'short-break'
      }
      this.timeRemaining = this.settings[this.currentSession].time * 60
    },
    setMaxSessions(maxSessionsNumber) {
      this.maxSessions = maxSessionsNumber
    },
    setTimerSettings(workTime, shortBreakTime, longBreakTime) {
      this.settings['work'].time = workTime
      this.settings["short-break"].time = shortBreakTime
      this.settings["long-break"].time = longBreakTime
      this.timeRemaining = workTime * 60
    }
  },
})
