export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'dark',
    showNotification: false,
    playSessionEndSound: true,
    alarmAudio: 'bell_1', // ~/assets/sounds/{alarmAudio}.wav
    showThemeToggle: true
  }),
  getters: {
    getTheme: (state) => state.theme
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    setTheme(theme) {
      this.theme = theme
    }
  }
})
