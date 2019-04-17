<template>
  <div style="width: 1000px; height: 490px; overflow: auto;">
    <div style="width: 200px; float: left;" class="m-t-20">
      <img width="200px" src="/static/images/bont/legend.png" />
    </div>
    <div id="echartsMain" class="m-t-20 echartsMain"
      style="width: 770px; height: 600px; float: left;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    inputs: null,
    echartsDivId: {
      type: String,
      default: 'echartsMain'
    },
    title: {
      type: String,
      default: ''
    }
  },
  watch: {
    inputs (newVal) {
      console.log(newVal)
      this.initEcharts(newVal)
    }
  },
  methods: {
    initEcharts (inputs) {
      console.log('init echarts')
      let myChart = echarts.init(document.getElementById('echartsMain'))
      let option = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}{b} {c}'
        },
        toolbox: {
          show: true,
          feature: {
            restore: {
              show: true
            },
            magicType: {
              show: true,
              type: ['force', 'chord']
            },
            saveAsImage: {
              show: true
            }
          }
        },
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 600,
            gravity: 0.1,
            edgeLength: 80
          },
          symbol: 'roundRect',
          symbolSize: [48, 28],
          lineStyle: {
            normal: {
              color: '#000',
              width: 1,
              opacity: 1
            }
          },
          label: {
            normal: {
              show: true,
              offset: [0, -2],
              textStyle: {
                color: '#000',
                fontStyle: 'normal',
                fontSize: 10
              }
            }
          },
          roam: true,
          draggable: true,
          edgeSymbol: [ 'pin', 'arrow' ],
          edgeSymbolSize: [ 10, 15 ],
          itemStyle: {
            normal: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 1,
                colorStops: [{
                  offset: 0, color: '#fff'
                }, {
                  offset: 1, color: 'rgb(58,179,251)'
                }],
                globalCoord: false
              }
            }
          },
          edgeLabel: {
            normal: {
              textStyle: {
                fontSize: 20
              }
            }
          },
          data: inputs.nodes,
          links: inputs.links
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="stylus">

</style>
