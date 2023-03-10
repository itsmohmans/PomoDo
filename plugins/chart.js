import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'vue-chartjs';

export default defineNuxtPlugin((nuxt) => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
  );
  // register needed charts components
  nuxt.vueApp.component('line-chart', Line)
  nuxt.vueApp.component('pie-chart', Pie)
  nuxt.vueApp.component('bar-chart', Bar)
})