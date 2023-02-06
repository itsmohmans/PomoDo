export const useTimerStore = defineStore('timer', {
  state: () => ({
    started: false,
    timeRemaining: 120 // base time in seconds
  }),
  getters: {
    isStarted: (state) => state.started,
    getTimeRemaining: (state) => state.timeRemaining
  },
  actions: {
    toggleTimer() {
      this.started = !this.started
    },
    clearTimeRemaining() {
      this.timeRemaining = 120
    },
    setTimeRemaining(time) {
      this.timeRemaining = time
    }
  },
})
