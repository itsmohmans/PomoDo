import { useAppStore } from '~~/stores/app'
import { useTimerStore } from '~~/stores/timer'

const storageKeys = {
  timer: 'timer-settings',
  app: 'app-settings'
}
export const storeSettings = () => {
  const timerSettings = useTimerStore().$state
  const appSettings = useAppStore().$state

  localStorage.setItem(storageKeys.timer, JSON.stringify(timerSettings))
  localStorage.setItem(storageKeys.app, JSON.stringify(appSettings))
}

export const getSettings = () => {
  const storedSettings = {
    timer: localStorage.getItem(storageKeys.timer),
    app: localStorage.getItem(storageKeys.app)
  }
  
  if (storedSettings.timer){
    useTimerStore().$state = JSON.parse(storedSettings.timer)
  }

  if (storedSettings.app){
    useAppStore().$state = JSON.parse(storedSettings.app)
  }
}
