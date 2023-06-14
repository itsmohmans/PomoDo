export const useTimerStore = defineStore('timer', {
  state: () => ({
    started: false,
    settings: {
      timer : {
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
        },
      },
      autoStart: true,
      maxSessions: 4, // the number of sessions before a long break
    },
    timeRemaining: 25*60, // in seconds
    currentSession: 'work',
    currentSessionNumber: 1,
  }),
  getters: {
    isStarted: (state) => state.started,
    getTimeRemaining: (state) => state.timeRemaining,
    getSessionTime: (state) => state.settings.timer[state.currentSession].time,
    getCurrentSession: (state) => state.currentSession,
    isWork: (state) => state.settings.timer[state.currentSession] === 'work',
    getCurrentSessionNumber: (state) => state.currentSessionNumber,
    getMaxSessions: (state) => state.settings.maxSessions,
    getCurrentColor: (state) => state.settings.timer[state.currentSession].color
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
        this.currentSessionNumber = this.currentSessionNumber % this.settings.maxSessions + 1
        this.currentSession = 'work'
      }
      else if (this.currentSessionNumber === this.settings.maxSessions) {
        this.currentSession = 'long-break'
      }
      else {
        this.currentSession = 'short-break'
      }
      this.timeRemaining = this.settings.timer[this.currentSession].time * 60
    },
    setMaxSessions(maxSessionsNumber) {
      this.settings.maxSessions = maxSessionsNumber
    },
    setTimerSettings(workTime, shortBreakTime, longBreakTime) {
      this.settings.timer['work'].time = workTime
      this.settings.timer["short-break"].time = shortBreakTime
      this.settings.timer["long-break"].time = longBreakTime
      this.timeRemaining = workTime * 60
    }
  },
})
