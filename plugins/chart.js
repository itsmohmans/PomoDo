import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';
import { Line, Pie } from 'vue-chartjs';


export default defineNuxtPlugin((nuxt) => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  );
  // register needed charts components
  nuxt.vueApp.component('line-chart', Line)
  nuxt.vueApp.component('pie-chart', Pie)
})