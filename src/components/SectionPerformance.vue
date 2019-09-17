<template>
<section id="section_performance" :class="{isIntersecting: entry.isIntersecting}">
  <div class="container">    
    <div class="time-seen">{{ timeSeenString }}</div>

    <h2>Intersection Observer vs Scroll Events</h2>
    <div class="buttons">
      <button :class="{active: io_test1Active}" @click="io_test1Active = true; updateData(1, [88, 72.6, 148, 189.4], [157.4, 188, 348.6, 367.6]);">IO Test 1</button>
      <button :class="{active: io_test2Active}" @click="io_test2Active = true; updateData(2, [99.4, 70.8, 161.4, 198.6], [151, 180.6, 322.2, 323]);">IO Test 2</button>
      <button :class="{active: io_test3Active}" @click="io_test3Active = true; updateData(3, [99, 71.4, 159, 199.8], [138.6, 203.6, 333.4, 349.8]);">IO Test 3</button>
      <button :class="{active: se_test1Active}" @click="se_test1Active = true; updateData(4, [311.2, 106.6, 59, 163.6], [1432.4, 379, 130.2, 309.6]);">SE Test 1</button>
      <button :class="{active: se_test2Active}" @click="se_test2Active = true; updateData(5, [971.8, 107.6, 70.8, 165], [3281, 415, 121.4, 267.8]);">SE Test 2</button>
      <button :class="{active: se_test3Active}" @click="se_test3Active = true; updateData(6, [1013.6, 110, 72, 168.6], [3294.4, 389, 119.2, 291.4]);">SE Test 3</button>
    </div>

    <div class="demo">
      <div class="demo-left">
        <canvas ref="osxChart" width="500px" height="400px"></canvas>
      </div>
      <div class="demo-right">
        <canvas ref="winChart" width="500px" height="400px"></canvas>
      </div>
    </div>

    <p>The test consists of 100 elements on the page with a set height for each that provides a tall scrolling element.</P>
    <p>Baseline is scrolling only with no JavaScript.</p>
    <p>Test 1 has 1 observer or scroll event listener and 1 callback.</p>
    <p>Test 2 has 100 observers or scroll event listeners and 1 callback.</p>
    <p>Test 3 has 100 observers or scrolls event listeners and 100 callbacks.</p>
  </div>
</section>
</template>

<script>
import { value, onMounted } from 'vue-function-api';
import { timeSeenFunction } from '../functions/utils';
import Chart from 'chart.js';

export default {
  name: 'section-performance',

  props: {
    entry: Object
  },

  setup (props, context) {
    let timeSeenString = value(null);
    let osxChart = null;
    let winChart = null;
    let osxChartData = value({
      scripting: [54.8, 0, 0, 0, 0, 0, 0],
      rendering: [34.4, 0, 0, 0, 0, 0, 0],
      painting: [36.4, 0, 0, 0, 0, 0, 0],
      system: [104.2, 0, 0, 0, 0, 0, 0]
    });
    let winChartData = value({
      scripting: [87.4, 0, 0, 0, 0, 0, 0],
      rendering: [79.4, 0, 0, 0, 0, 0, 0],
      painting: [57.4, 0, 0, 0, 0, 0, 0],
      system: [140.2, 0, 0, 0, 0, 0, 0]
    });
    let io_test1Active = value(false);
    let io_test2Active = value(false);
    let io_test3Active = value(false);
    let se_test1Active = value(false);
    let se_test2Active = value(false);
    let se_test3Active = value(false);

    let updateData = (index, osxData, winData) => {
      osxChartData.value.scripting[index] = osxData[0];
      osxChartData.value.rendering[index] = osxData[1];
      osxChartData.value.painting[index] = osxData[2];
      osxChartData.value.system[index] = osxData[3];
      osxChart.update();

      winChartData.value.scripting[index] = winData[0];
      winChartData.value.rendering[index] = winData[1];
      winChartData.value.painting[index] = winData[2];
      winChartData.value.system[index] = winData[3];
      winChart.update();
    };
    
    timeSeenFunction(props, timeSeenString);

    onMounted (() => {
      osxChart = new Chart(context.refs.osxChart, {
        type: 'bar',
        data: {
          labels: ['Baseline', 'IO Test 1', 'IO Test 2', 'IO Test 3', 'SE Test 1', 'SE Test 2', 'SE Test 3'],
          datasets: [{
            label: 'Scripting',
            backgroundColor: '#C11826',
            data: osxChartData.value['scripting']
          }, {
            label: 'Rendering',
            backgroundColor: '#307B21',
            data: osxChartData.value['rendering']
          }, {
            label: 'Painting',
            backgroundColor: '#C45413',
            data: osxChartData.value['painting']
          }, {
            label: 'System',
            backgroundColor: '#4371AD',
            data: osxChartData.value['system']
          }]
        },
        options: {
					title: {
						display: true,
						text: 'OSX Test Results'
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
						}],
						yAxes: [{
              stacked: true,
              scaleLabel: {
								display: true,
								labelString: 'milliseconds'
              },
              ticks: {
                beginAtZero: true,
                max: 5000
              }
						}]
					}
				}
      });

      winChart = new Chart(context.refs.winChart, {
        type: 'bar',
        data: {
          labels: ['Baseline', 'IO Test 1', 'IO Test 2', 'IO Test 3', 'SE Test 1', 'SE Test 2', 'SE Test 3'],
          datasets: [{
            label: 'Scripting',
            backgroundColor: '#C11826',
            data: winChartData.value['scripting']
          }, {
            label: 'Rendering',
            backgroundColor: '#307B21',
            data: winChartData.value['rendering']
          }, {
            label: 'Painting',
            backgroundColor: '#C45413',
            data: winChartData.value['painting']
          }, {
            label: 'System',
            backgroundColor: '#4371AD',
            data: winChartData.value['system']
          }]
        },
        options: {
					title: {
						display: true,
						text: 'Windows Test Results'
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
						}],
						yAxes: [{
              stacked: true,
              scaleLabel: {
								display: true,
								labelString: 'milliseconds'
              },
              ticks: {
                beginAtZero: true,
                max: 5000
              }
						}]
					}
				}
      });
    });

    return {
      timeSeenString,
      updateData,
      io_test1Active,
      io_test2Active,
      io_test3Active,
      se_test1Active,
      se_test2Active,
      se_test3Active,
    }
  }
}
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  margin-bottom: 30px;
}
.demo-left {
  width: 50%;
}
.demo-right {
  height: 500px;
  position: relative;
  width: 50%;
}
.buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
