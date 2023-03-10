
export const useStatsStore = defineStore('stats', {
  state: () => ({
    stats: {
      // Each property is a label for the set of sessions
      // Each set of sessions is an array of objects
      // consisting of date and minutes for each sessoin

      // FIXME: apply new changes (the new labels obj structure) to the getters
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
        'label 2': [
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
        ],
    }
  }),
  getters: {
    // get dates by each label
    getDates: (state) => {
      const datesByLabel = Object.entries(state.stats).reduce((result, [label, stats]) => {
        const dates = stats.map(session => session.date);
        return {
          ...result,
          [label]: {
            dates,
          },
        };
      }, {});

      return datesByLabel;
    },
    // get miuntes by each label
    getMinutes: (state) => {
      const minsByLabel = Object.entries(state.stats).reduce((result, [label, stats]) => {
        const minutes = stats.map(session => session.minutes);
        return {
          ...result,
          [label]: {
            minutes,
          },
        };
      }, {});

      return minsByLabel;
    },
  },
  actions: {
    addNewLabel(label) {
      // push a label object to this.session
    },
    addNewSession(label, time, date) {
      // push new session obj to this.session[label]
    }
  }
})
