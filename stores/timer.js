export const useTimerStore = defineStore('timer', {
  state: () => ({
    // all the time values are in seconds
    started: false,
    timerSettings: [
      {
        session: 'work',
        text: 'Work',
        time: 25*60
      },
      {
        session: 'short-break',
        text: 'Short Break',
        time: 5*60
      },
      {
        session: 'long-break',
        text: 'Long Break',
        time: 15*60
      }
    ],
    timeRemaining: 25*60,
    currentSession: 0,         // index for timerSettings
    currentSessionNumber: 1,
    maxSessions: 3,            // the number of sessions before a long break
  }),
  getters: {
    isStarted: (state) => state.started,
    getTimeRemaining: (state) => state.timeRemaining,
    getSessionTime: (state) => state.timerSettings[state.currentSession].time,
    getCurrentSession: (state) => state.currentSession,
    isWork: (state) => state.timerSettings[state.currentSession].session === 'work',
    getCurrentSessionNumber: (state) => state.currentSessionNumber,
    getMaxSessions: (state) => state.maxSessions,
  },
  actions: {
    toggleTimer() {
      this.started = !this.started
    },
    clearTimeRemaining() {
      this.timeRemaining = this.timerSettings[(this.currentSession) % 3].time
    },
    setTimeRemaining(time) {
      this.timeRemaining = time
    },
    nextSession() {
      // if current session is not work (i.e. a break) 
      if (this.currentSession !== 0) {
        this.currentSessionNumber = this.currentSessionNumber % this.maxSessions + 1
        this.currentSession = 0 // back to work
      }
      else if (this.currentSessionNumber === this.maxSessions) {
        this.currentSession = 2 // long break
      }
      else {
        this.currentSession++
        this.currentSession %= 3
      }
      this.timeRemaining = this.timerSettings[(this.currentSession) % 3].time
    },
    setMaxSessions(maxSessionsNumber) {
      this.maxSessions = maxSessionsNumber
    }
  },
})
