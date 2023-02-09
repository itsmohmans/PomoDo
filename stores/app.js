export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'dark',
    showNotification: false,
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
