import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Line, Pie } from 'vue-chartjs';


export default defineNuxtPlugin((nuxt) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  nuxt.vueApp.component('doughnut-chart', Doughnut)
  nuxt.vueApp.component('line-chart', Line)
  nuxt.vueApp.component('pie-chart', Pie)
})