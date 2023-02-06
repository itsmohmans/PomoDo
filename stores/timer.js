export const useTimerStore = defineStore('timer', {
  state: () => ({
    started: false,
  }),
  getters: {
    isStarted: (state) => state.started,
  },
  actions: {
    toggleTimer() {
      this.started = !this.started
    },
  },
})
