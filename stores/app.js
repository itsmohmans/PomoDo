export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'dark',
    showNotification: false,
    playSessionEndSound: true,
    alarmAudio: 'bell_1.wav', // ~/assets/sounds/{alarmAudio}.mp3
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
