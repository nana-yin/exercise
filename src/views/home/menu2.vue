<template>
  <div>
    仪表盘
    <div class="dashboard">
      <vue-speedometer
        :width="300"
        :needle-height-ratio="0.7"
        :value="77"
        current-value-text="Happiness Level"
        :custom-segment-labels="[
          {
            text: &quot;Very Bad&quot;,
            position: &quot;OUTSIDE&quot;,
            color: &quot;#555&quot;,
          },
          {
            text: &quot;Bad&quot;,
            position: &quot;OUTSIDE&quot;,
            color: &quot;#555&quot;,
          },
          {
            text: &quot;Ok&quot;,
            position: &quot;OUTSIDE&quot;,
            color: &quot;#555&quot;,
            fontSize: &quot;19px&quot;,
          },
          {
            text: &quot;Good&quot;,
            position: &quot;OUTSIDE&quot;,
            color: &quot;#555&quot;,
          },
          {
            text: &quot;Very Good&quot;,
            position: &quot;OUTSIDE&quot;,
            color: &quot;#555&quot;,
          },
        ]"
        :ring-width="8"
        :needle-transition-duration="3333"
        needle-transition="easeElastic"
        needle-color="#333"
        text-color="#d8dee9"
      />
    </div>
    <div id="myChart" />
    <canvas id="myCanvas" width="300" height="300">
      Your browser does not support HTML5 Canvas.
    </canvas>
  </div>
</template>

<script>
import VueSpeedometer from 'vue-speedometer'

export default {
  name: 'Menu2',
  components: {
    VueSpeedometer
  },
  mounted() {
    this.drawLine()
    this.canves()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        series: [{
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#FF6E76'],
                [0.5, '#FDDD60'],
                [0.75, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
            width: 4,
            length: '88%',
            offsetCenter: [0, '-4%'],
            itemStyle: {
              color: '#000'
            }
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 10,
            itemStyle: {
              borderWidth: 3,
              borderColor: '#000'
            }
          },
          axisTick: {
            show: false
            // length: 6,
            // distance: -6,
            // splitNumber: 1,
            // lineStyle: {
            //     width: 5,
            //     borderRadius: 20,
            //     color: '#fff'
            // }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#000',
            fontSize: 16,
            fontWeight: 600,
            distance: -60,
            formatter: function(value) {
              if (value === 0.875) {
                return '优'
              } else if (value === 0.625) {
                return '中'
              } else if (value === 0.375) {
                return '良'
              } else if (value === 0.125) {
                return '差'
              }
            }
          },
          detail: {
            fontSize: 36,
            offsetCenter: [0, '30%'],
            valueAnimation: true,
            formatter: function(value) {
              return Math.round(value * 100) + '分'
            },
            color: 'auto'
          },
          data: [{
            value: 0.70
          }]
        }]
      })
    },
    canves() {
      var canvas = document.getElementById('myCanvas')
      if (!canvas.getContext) return
      var ctx = canvas.getContext('2d')
      // 绘制圆弧
      ctx.lineWidth = 10
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 45, 5, Math.PI * 2, true)
      ctx.strokeStyle = '#ff9277'
      ctx.stroke()
    }
  },
  template: `<vue-speedometer />`
}
</script>

<style>
.dashboard, #myChart{
  display: inline-block;
  width: 300px;
  height: 300px;
  margin-right: 60px;
}
canvas {
  border: 1px solid #ccc;
}
</style>
