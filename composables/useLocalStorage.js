import { useAppStore } from '~~/stores/app'
import { useTimerStore } from '~~/stores/timer'
import { useStatsStore } from '~~/stores/stats'
const storageKeys = {
  timer: 'timer-settings',
  app: 'app-settings',
  stats: 'user-stats'
}
export const storeSettings = () => {
  const timerSettings = useTimerStore().$state
  const appSettings = useAppStore().$state
  const stats = useStatsStore().$state

  localStorage.setItem(storageKeys.timer, JSON.stringify(timerSettings))
  localStorage.setItem(storageKeys.app, JSON.stringify(appSettings))
  localStorage.setItem(storageKeys.stats, JSON.stringify(stats))
}

export const getSettings = () => {
  const storedSettings = {
    timer: localStorage.getItem(storageKeys.timer),
    app: localStorage.getItem(storageKeys.app),
    stats: localStorage.getItem(storageKeys.stats)
  }
  
  if (storedSettings.timer){
    useTimerStore().$state = JSON.parse(storedSettings.timer)
  }

  if (storedSettings.app){
    useAppStore().$state = JSON.parse(storedSettings.app)
  }
  if (storedSettings.stats) {
    useStatsStore().$state = JSON.parse(storedSettings.stats)
  }
}
