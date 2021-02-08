<template>
  <div>
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
    <canvas id="myCanvas" width="200" height="200">
      Your browser does not support HTML5 Canvas.
    </canvas>
    <div class="test">{{ newArr }}</div>
    <div id="dashChart" />
  </div>
</template>

<script>
import VueSpeedometer from 'vue-speedometer'
const numericalData = [-3, -2.15, -1.29, -0.5, 0.3, 1.28, 2.14, 3]
const standard = ['极低', '较低', '中低', '中性', '中高', '较高', '极高']
const fakeData = 0.1
const colorTemplate1 = [[0.142, '#1c2b18'], [0.284, '#4e6c48'], [0.426, '#71a366'], [0.568, '#e8cf8f'], [0.710, '#b24933'], [0.852, '#9d2129'], [1, '#6b1b1e']
]
export default {
  name: 'Menu2',
  components: {
    VueSpeedometer
  },
  data() {
    return {
      arr: ['d', 'a', 'b', 'a', 'a', 'b', 'c'],
      newArr: []
    }
  },
  mounted() {
    this.drawLine()
    this.canves()
    this.test()
    this.temp()
  },
  methods: {
    test() { // 将字符串数组中的重复数据挑出来
      let count = 0
      let str = ''
      const temp = []
      for (let i = 0; i < this.arr.length; i++) {
        if (temp.length === 0) { // 将第一个数据进行入栈操作
          str = this.arr[i] + '-1'
        } else {
          const hasRepeat = temp.some(item => {
            return this.arr[i] === item
          })
          if (hasRepeat) { // 有重复的数据
            count = 1
            for (let j = 0; j < temp.length; j++) {
              if (this.arr[i] === temp[j]) { // 如果在新数组中有相同的数据
                count = count + 1
              }
            }
            str = this.arr[i] + '-' + count
          } else { // 没有就直接加入数据
            str = this.arr[i] + '-1'
          }
        }
        this.newArr.push(str)
        temp.push(this.arr[i])
      }
      // console.log(this.newArr)
    },
    temp() {
      // const aa = Date.parse('2021-1-19')
      // const bb = Date.UTC(2021, 0, 19)
      // const cc = Date.now()
      // console.log(aa, bb, cc)

      const message = 'ab☺de'
      console.log('----', message.codePointAt(1), message.codePointAt(2))
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('dashChart'))
      // 绘制图表
      myChart.setOption({
        series: [
          {
            z: 0,
            type: 'pie',
            radius: '80%',
            startAngle: 0,
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.RadialGradient(0.5, 1, 1, [
                  {
                    offset: 0.8,
                    color: 'rgba(255,255,255,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(33,150,243,0.01)'
                  }])
              }
            },
            label: {
              show: false
            },
            data: [{
              value: 0.5
            }, {
              value: 0.5,
              itemStyle: {
                color: 'rgba(0,0,0,0)'
              }
            }]
          },
          {
            type: 'gauge',
            radius: '80%',
            min: -3,
            max: 3,
            startAngle: 180,
            endAngle: 0,
            splitNumber: 6,
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 6,
                color: colorTemplate1
              }
            },
            splitLine: { show: false },
            axisTick: { show: false }, // 刻度(线)样式。
            pointer: {
              icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
              width: 3,
              length: '80%',
              offsetCenter: [0, '-10%'],
              itemStyle: {
                color: '#000'
              }
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 6,
              itemStyle: {
                borderWidth: 2,
                borderColor: '#000'
              }
            },
            axisLabel: {
              show: false,
              distance: -20,
              color: '#666',
              fontSize: 12,
              formatter: (val) => {
                val = Number(val)
                for (let i = 0; i < numericalData.length; i++) {
                  if (val > numericalData[i] && val <= numericalData[i + 1]) {
                    return standard[i]
                  }
                  if (val === numericalData[0]) {
                    return standard[0]
                  }
                }
              }
            },
            detail: {
              fontSize: 14,
              offsetCenter: [0, '30%'],
              valueAnimation: true,
              formatter: function(value) {
                return '趋势强度：' + Math.round(value * 100) + '%'
              },
              color: '#333'
            },
            data: [{
              value: 0.70
            }]
          }, {
            type: 'gauge',
            radius: '98%',
            min: -3,
            max: 3,
            detail: { show: false },
            startAngle: 170,
            endAngle: 10,
            splitNumber: 6,
            data: [fakeData],
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: { show: false },			// 刻度(线)样式。
            axisLabel: {
              show: true,
              distance: -20,
              color: '#666',
              fontSize: 12,
              formatter: (val) => {
                val = Number(val)
                for (let i = 0; i < numericalData.length; i++) {
                  if (val > numericalData[i] && val <= numericalData[i + 1]) {
                    return standard[i]
                  }
                  if (val === numericalData[0]) {
                    return standard[0]
                  }
                }
              }
            },
            pointer: { show: false }
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
      ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 45, false)
      ctx.strokeStyle = '#ff9277'
      ctx.stroke()
    }
  },
  template: `<vue-speedometer />`
}
</script>

<style>
.dashboard, #dashChart{
  display: inline-block;
  width: 300px;
  height: 300px;
  margin-right: 60px;
}
canvas {
  border: 1px solid #ccc;
}
.test {
  display: inline-block;
  margin-left: 60px;
}
</style>
