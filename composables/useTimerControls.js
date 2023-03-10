import { useTimerStore } from '/stores/timer';
import { useAppStore } from '~~/stores/app';
import { useStatsStore } from '~~/stores/stats'

export const useTimerControls = () => {
  const timer = useTimerStore(), 
    app = useAppStore(),
    stats = useStatsStore()

  const { $dayjs } = useNuxtApp()
  const interval = ref({})

  const toggleTimer = () => {
    timer.toggleTimer()
    if (timer.isStarted) {
      interval.value = setInterval(startTimer, 1000)
    }
    else clearInterval(interval.value)
  }

  const startTimer = () => {
    if (timer.getTimeRemaining <= 0) {
      const currentSession = timer.settings[timer.currentSession]
      
      // TODO: make it save the stats even if there isn't any label
      // save current session to stats
      if (timer.currentLabel !== 'No label' && currentSession.text === 'Work') {
        stats.addNewSession(
          timer.currentLabel,
          currentSession.time,
          $dayjs()
        )
      }
      timer.nextSession()
      if (app.playSessionEndSound) playAlarm()
      const nextSession = timer.settings[timer.currentSession]
  
      if (app.showNotification) showNotification(currentSession.text, nextSession.text)
      
      if (timer.autoStart)
        return
      return toggleTimer()
    }
    timer.setTimeRemaining(timer.getTimeRemaining - 1)
  }

  const clearTimer = () => {
    timer.started = false
    timer.clearTimeRemaining()
    clearInterval(interval.value)
  }

  const showNotification = (currentSession, nextSession) => {
    const {
      isSupported,
      notification,
      show,
      onError,
    } = useWebNotification({
          title: `${currentSession} is done.`,
          body: `You've just finished a ${String(currentSession).toLowerCase()} session. Now get ready to start the next session: ${nextSession}`,
          renotify: true,
          tag: currentSession
    })
    if (isSupported.value)
      show()
  }

  const playAlarm = async () => {
    // I want the audio to be dynamically imported, to to make it possible to change it later
    const audio = await import(`../assets/sounds/${useAppStore().alarmAudio}.wav`)
    const alarm = new Audio(audio.default)
    alarm.play()
  }
  return {
    toggleTimer,
    clearTimer
  }
}