<template>
  <div ref="conceptSvgId" id="conceptSvg">

  </div>
</template>

<script>
import global from '../../components/common.vue'
var svgElem = ''
export default {
  props: {
    conceptlist: '',
    conceptsvgheight: 600,
    conceptsvgwidth: 1200,
    conceptsvgzoomindex: 9,
    conceptshowlayerlist: '',
    conceptbrushid: 'conceptBrush',
    conceptsvg: 'conceptSvg',
    rectclass: 'conceptrect',
    role: ''
  },
  watch: {
    conceptlist (newData, oldData) {
      this.conceptlist = newData
      this.cleanSVG()
      this.init()
      this.initSVG(this.conceptlist)
    },
    role (newData, oldData) {
      this.role = newData
      console.log(this.role)
    }
  },
  methods: {
    init () {
      var svgDiv = this.$refs.conceptSvgId
      svgElem = document.createElementNS(global.vctconfig.xmlns, 'svg')
      // svgElem.setAttributeNS(null, 'viewBox', '0 0 ' + global.svgWidth + ' ' + global.svgHeight)
      // svgElem.setAttributeNS(null, 'width', global.svgWidth)
      // svgElem.setAttributeNS(null, 'id', this.ecsvgid)
      // svgElem.setAttributeNS(null, 'height', global.svgHeight)
      svgElem.style.display = 'inline'
      var defs = document.createElementNS(global.vctconfig.xmlns, 'defs')
      var marker = this.DrawMarker()
      var rgBrush = this.RGBrush(this.conceptbrushid)
      defs.appendChild(rgBrush)
      defs.appendChild(marker)
      svgElem.appendChild(defs)
      svgDiv.appendChild(svgElem)
    },
    DrawMarker () {
      var marker = document.createElementNS(global.vctconfig.xmlns, 'marker')
      marker.setAttribute('id', 'arrow')
      marker.setAttribute('markerUnits', 'strokeWidth')
      marker.setAttribute('markerWidth', '8')
      marker.setAttribute('markerHeight', '8')
      marker.setAttribute('viewBox', '0 0 12 12')
      marker.setAttribute('refX', '6')
      marker.setAttribute('refY', '6')
      marker.setAttribute('orient', 'auto')
      var pathA = document.createElementNS(global.vctconfig.xmlns, 'path')
      pathA.setAttributeNS(null, 'd', 'M2,2 L10,6 L2,10 L6,6 L2,2')
      pathA.setAttributeNS(null, 'fill', '#000000')
      marker.appendChild(pathA)
      return marker
    },
    RGBrush (brushId) {
      var rgbrush = document.createElementNS(global.vctconfig.xmlns, 'radialGradient')
      rgbrush.setAttribute('id', brushId)
      // "rgBrush"
      rgbrush.setAttribute('cx', '50%')
      rgbrush.setAttribute('cy', '50%')
      rgbrush.setAttribute('r', '50%')
      rgbrush.setAttribute('fx', '50%')
      rgbrush.setAttribute('fy', '50%')
      // Light color
      var stop1 = document.createElementNS(global.vctconfig.xmlns, 'stop')
      stop1.setAttribute('offset', '0%')
      stop1.setAttribute('style', 'stop-color:rgb(' + global.vctconfig.latLigColor + ');stop-opacity:0')
      // Deep color
      var stop2 = document.createElementNS(global.vctconfig.xmlns, 'stop')
      stop2.setAttribute('offset', '100%')
      stop2.setAttribute('style', 'stop-color:rgb(' + global.vctconfig.latDeeColor + ');stop-opacity:1')
      rgbrush.appendChild(stop1)
      rgbrush.appendChild(stop2)
      return rgbrush
    },
    cleanSVG () {
      let svgDiv = this.$refs.conceptSvgId
      let svgElems = svgDiv.getElementsByTagName('svg')
      for (let i = 0; i < svgElems.length; i++) {
        svgDiv.removeChild(svgElems[i])
      }
    },
    initSVG (eclist) {
      let ecLayerList = []
      let maxX = 0
      for (let i = 0; i < eclist.length; i++) {
        let eventClass = eclist[i]
        if (eventClass.x > maxX) {
          maxX = eventClass.x
        }
        while (eventClass.layer >= ecLayerList.length) {
          ecLayerList.push([])
        }
        ecLayerList[eventClass.layer].push(eventClass)
      }
      let maxCount = 0
      for (let i = 0; i < ecLayerList.length; i++) {
        if (ecLayerList[i].length > maxCount) {
          maxCount = ecLayerList[i].length
        }
      }
      this.maxLayerCount = ecLayerList.length
      this.maxSvgWidth = maxX * 1.3
      this.maxSvgHeight = ((global.vctconfig.blockHeight + global.vctconfig.yGrap) * this.maxLayerCount + global.vctconfig.totalYGrap) * 1.1
      this.initSVGView(svgElem, this.svgId, this.maxSvgWidth, this.maxSvgHeight)
      var yGrap = global.vctconfig.yGrap
      var startY = global.vctconfig.startY
      var blockHeight = global.vctconfig.blockHeight
      for (let i = 0; i < ecLayerList.length; i++) {
        for (let j = 0; j < ecLayerList[i].length; j++) {
          let ecLat = ecLayerList[i][j]
          let locY = ecLat.layer * (blockHeight + yGrap) + startY
          let drawOntLat = new global.DrawOntLat(this.rectclass, ecLat, locY)
          let g = drawOntLat.drawLat('ecBrush')
          svgElem.appendChild(g)
        }
      }
      this.drawLatLinks(eclist, svgElem)
      this.$emit('InitSVGFinished', this.rectclass)
    },
    initSVGView (svgElem, svgId, svgWidth, svgHeight) {
      svgElem.setAttributeNS(null, 'viewBox', `0 0 ${svgWidth} ${svgHeight}`)
      svgElem.setAttributeNS(null, 'width', svgWidth)
      svgElem.setAttributeNS(null, 'id', svgId)
      svgElem.setAttributeNS(null, 'height', svgHeight)
      svgElem.style.display = 'inline'
    },
    drawConLine (sourceId, targetId, svgElem) {
      let sourceG = document.getElementById(sourceId)
      if (sourceG != null) {
        let botLinkNode = sourceG.childNodes[3]
        let targetG = svgElem.getElementById(targetId)
        let topLinkNode = targetG.childNodes[2]
        let sourceX = botLinkNode.getAttribute('cx')
        let sourceY = botLinkNode.getAttribute('cy')
        let targetX = topLinkNode.getAttribute('cx')
        let targetY = topLinkNode.getAttribute('cy')
        let drawLine = document.createElementNS(global.vctconfig.xmlns, 'line')
        drawLine.setAttribute('sourceId', sourceId)
        drawLine.setAttribute('targetId', targetId)
        drawLine.setAttribute('x1', sourceX)
        drawLine.setAttribute('y1', sourceY)
        drawLine.setAttribute('x2', targetX)
        drawLine.setAttribute('y2', targetY)
        drawLine.setAttribute('stroke', 'black')
        drawLine.setAttribute('stroke-width', '1')
        drawLine.setAttribute('marker-end', '#arrow')
        return drawLine
      } else {
        return null
      }
    },
    drawLatLinks (list, svgElem) {
      for (let i = 0; i < list.length; i++) {
        let temp = list[i]
        if (temp.parentId !== 0) {
          let drawLine = this.drawConLine(temp.parentId, temp.id, svgElem)
          if (drawLine != null) {
            svgElem.appendChild(drawLine)
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
