<template>
  <div class="stats-container">
    <!-- <line-chart class="line-chart" :data="data" :options="options"/> -->
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

const { $dayjs } = useNuxtApp()

const labels = stats().getLabels
const dates = stats().getDates
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
          text: 'Minutes per label',
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
        text: 'Minutes per label',
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
  max-width: 400px;
  max-height: 200px;
  margin: 0
}
.stats-container .line-chart {
  max-width: 400px;
}
.chart.mins-labels {
  padding: 10px;
  border: 1px solid grey;
  border-radius: 50px;
}
</style>
