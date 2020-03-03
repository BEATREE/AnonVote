<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: 'Chart',
  data() {
    return {}
  },
  methods: {
      createChart(chartId, chartData){
          const ctx = document.getElementById(chartId);
          const {type, data, options} = chartData;
          const myChart = new Chart(ctx, {
              type: type,
              data: data,
              options: options,
          })
      }
  },
  mounted
}
</script>

<style lang="scss" scoped></style>
