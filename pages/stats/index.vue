<template>
  <div class="stats-container">
    <doughnut-chart :data="data" :options="options"/>
    <line-chart class="line-chart" :data="data" :options="options"/>
    <pie-chart :data="data" :options="options"/>
  </div>
</template>
<script setup>

const data = {
  labels: ['Cats', 'Dogs', 'Hamsters'],
  datasets: [
    {
      label: 'First Dataset',
      backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      data: [22, 11, 6]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: true
}


</script>
<style scoped>
.stats-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 0;
}
.stats-container * {
  max-width: 200px;
  max-height: 200px;
  margin: 0
}
.stats-container .line-chart {
  max-width: 400px;
}
</style>
