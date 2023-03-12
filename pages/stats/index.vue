<template>
  <div class="stats-container">
    <line-chart class="chart mins-days"
      :data="minutesDaysCharts.data"
      :options="minutesDaysCharts.options"
    />
    <pie-chart
      class="chart mins-labels"
      :data="minutesLabelCharts.data"
      :options="minutesLabelCharts.options.pie"
    />
    <bar-chart
      class="chart mins-labels"
      :data="minutesLabelCharts.data"
      :options="minutesLabelCharts.options.bar"
    />
  </div>
</template>
<script setup>
import { useStatsStore as stats } from '~~/stores/stats'
import {useAppStore as app} from '~~/stores/app'

const labels = stats().getLabels
const colors = Object.values(stats().getColors)
const days = stats().getUniqueDates
// FIXME: Merge minutes of the same day together
const minutesPerDate = Object.values(stats().getMinutes)
  .reduce((minsArr, mins) => Array(...minsArr).concat(mins.map(min => min/60)), [])

const minutes = Object.values(stats().getMinutes)
  .map(arr => arr.reduce((total, mins) => total + mins/60, 0));
const colors = Object.values(stats().getColors)

const minutesLabelCharts = reactive({
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Hours',
        backgroundColor: colors,
        data: minutes,
      },
    ]
  },
  options: {
    pie: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: app().getTheme === 'dark' ? '#fff' : '#000'
          }
        },
        title: {
          display: true,
          text: 'Work Time / Label',
        }
      }
    },
    bar: {
      responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Minutes per label',
      }
    }
    }
  }
})
const minutesDaysCharts = reactive({
  data: {
    labels: days,
    datasets: [
      {
        label: 'Hours',
        backgroundColor: colors,
        data: minutesPerDate,
        tension: 0.4,
      },
    ]
  },
  options: {
    borderColor: '#a1a1a1',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Work Time / Day',
      },
    },
    elements: {
      point: {
        radius: 6,
        borderWidth: 1,
        hitRadius: 18,
      },
      line: {
        fill: true,
      }
    }
  }
})
</script>
<style scoped>
.stats-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 2rem;
}
.stats-container * {
  max-width: 600px;
  max-height: 400px;
  margin: 1rem
}
.chart.mins-labels {
  padding: 10px;
  /* border: 1px solid grey; */
  border-radius: 40px;
}
</style>
