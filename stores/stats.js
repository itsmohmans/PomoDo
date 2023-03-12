
export const useStatsStore = defineStore('stats', {
  state: () => ({
    stats: {
      'label 1': {
        color: 'some color',
        sessions: [
          {
            date: 'date 1.0',
            minutes: 22
          },
          {
            date: 'date 1.1',
            minutes: 30
          },
          {
            date: 'date 1.2',
            minutes: 11
          },
          {
            date: 'date 1.3',
            minutes: 24
          },
          {
            date: 'date 1.4',
            minutes: 1
          },
        ],
      },
      'label 2': {
        color: 'another color',
        sessions:[
          {
            date: 'date 2.0',
            minutes: 99
          },
          {
            date: 'date 2.1',
            minutes: 88
          },
          {
            date: 'date 2.2',
            minutes: 77
          },
          {
            date: 'date 2.3',
            minutes: 66
          },
          {
            date: 'date 2.4',
            minutes: 44
          },
        ]
      },
    }
  }),
  getters: {
    /**
     * get all labels
     * @param {*} state is current state
     * @returns an array of labels
     */
    getLabels: (state) => Object.keys(state.stats),
    /**
     * get dates by each label
     * @param {*} state is current state
     * @returns an object where keys are each label, 
     * and value for each key is an array of dates
     */
    getDates: (state) => {
      const datesByLabel = Object.entries(state.stats)
        .reduce((result, [label, data]) => {
          const dates = data.sessions.map(session => session.date)
          return {
            ...result,
            [label]: dates
          }
        }, {})
        return datesByLabel
    },
    /**
     * get miuntes by each label
     * @param {*} state is current state
     * @returns an object where keys are each label, 
     * and value for each key is an array of minutes
     */
    getMinutes: (state) => {
      const minsByLabel = Object.entries(state.stats)
        .reduce((result, [label, data]) => {
          const minutes = data.sessions.map(session => session.minutes)
          return {
            ...result,
            [label]: minutes
          }
        }, {})
        return minsByLabel
    },
    /**
     * get color for each label
     * @param {*} state is current state
     * @returns an object where keys are each label, 
     * and value for each key is the color
     */
    getColors: (state) => {
      const colorByLabel = Object.entries(state.stats)
        .reduce((result, [label, data]) => {
          return {
            ...result,
            [label]: data.color
          }
        }, {})
        return colorByLabel
    },
    /**
     * get color for each label
     * @param {*} state is current state
     * @returns an array of unique days of sessions.
     * FIXME: the below logic doesn't save add minutes of
     * sessions of the same day together
     */
    // TODO: make this getter to return an array for each date and minutes
    getUniqueDates: (state) => {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const uniqueDays = Object.values(state.getDates)
        .reduce((datesArr, date) => datesArr.concat(date), [])
        .map(date => date.weekDay)
        .filter((day, idx, arr) => day !== arr[idx + 1])
        .sort()
        .map(day => daysOfWeek[day])
      return uniqueDays
    },
  },
  actions: {
    addNewLabel(label, color) {
      // if the label does not exist
      if (!this.getLabels.find(el => el === label))
        this.stats[label] = {
          color: color,
          sessions: []
        }
      else console.error(`${label} is already a label`)
    },
    addNewSession(label, minutes, date) {
      if (this.getLabels.find(el => el === label)) {
        return this.stats[label].sessions.push({
          minutes: minutes,
          date: date
        })
      } else { // if the label does not exist, create new one
        this.addNewLabel(label, '#fff') // TODO: make it a random color
        this.addNewSession(label, minutes, date)
      }
    },
    removeLabel(label) {
      const index = this.getLabels.indexOf(label);
      if (index !== -1) {
        delete this.stats[label];
      }
    },
    // TODO: add a change label color and name actions
  }
})
