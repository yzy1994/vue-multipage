<script>
  const httpUrl = 'http://localhost:8000/'
  const vctconfig = {
    xmlns: 'http://www.w3.org/2000/svg',
    brushUrl: 'module/vct.html',
    latLigColor: '190,228,251',
    latDeeColor: '160,217,251',
    latStroke: '58,179,251',
    svgWidth: 1200,
    svgHeight: 520,
    blockHeight: 36,
    blockWidth: 80,
    xGrap: 20,
    yGrap: 50,
    totalXGrap: 100,
    totalYGrap: 100,
    fontsize: 12,
    widSup: 12 * 2,
    topCir: 'top',
    bottomCir: 'bot',
    recHeight: Math.round(12 * 2.3),
    rx: 10,
    ry: 10,
    radius: 1,
    startY: 50
  }
  class DrawOntLat {
    constructor (rectclass, ontLat, locY) {
      this.locX = ontLat.x
      this.locY = locY
      this.rectclass = rectclass
      this.latname = ontLat.name
      this.latid = ontLat.id
    }
    drawLat = function (brushId) {
      let latname = this.latname
      let latid = this.latid
      let locX = this.locX
      let locY = this.locY
      let rectclass = this.rectclass
      let recHeight = vctconfig.recHeight
      let fontsize = vctconfig.fontsize
      let widSup = vctconfig.widSup
      let rx = vctconfig.rx
      let ry = vctconfig.ry
      let latStroke = vctconfig.latStroke
      // let brushUrl = vctconfig.brushUrl
      let radius = vctconfig.radius
      let g = this.drawLatGro(latname, latid, locX, locY, 'fal', rectclass)
      let textStr = latname
      let num = textStr.length
      let len = num * fontsize
      let recWidth = Math.round(len + widSup)
      let latRect = this.drawLatRect(recWidth, recHeight, rx, ry, latStroke, `url(#${brushId})`, locX, locY, rectclass)
      let devX = Math.floor((recWidth - len) / 2)
      let devY = Math.floor((recHeight - fontsize) / 2 + fontsize) - 1
      let text = this.drawLatText(locX, locY, devX, devY, textStr)
      let devNodeX = recWidth * 0.5
      // let devNodeY = recHeight
      let topCir = vctconfig.topCir
      let bottomCir = vctconfig.bottomCir
      let topLinkNode = this.drawLatLinkNode(devNodeX + locX, locY, radius, topCir)
      let bottomLinkNode = this.drawLatLinkNode(devNodeX + locX, locY + recHeight, radius, bottomCir)
      g.appendChild(latRect)
      g.appendChild(text)
      g.appendChild(topLinkNode)
      g.appendChild(bottomLinkNode)
      // SVG可拖拽
      latRect.addEventListener('mousedown', function (eve) {
        let eveTarget = eve.target
        let originX = parseInt(eveTarget.getAttribute('x'))
        let originY = parseInt(eveTarget.getAttribute('y'))
        let x = eve.layerX ? eve.layerX : eve.offsetX
        let y = eve.layerY ? eve.layerY : eve.offsetY
        let devX = x - originX
        let devY = y - originY
        let gNode = eveTarget.parentNode
        let gNodeId = gNode.getAttribute('id')
        let textNode = gNode.getElementsByTagName('text')[0]
        let originTextX = parseInt(textNode.getAttribute('x'))
        let originTextY = parseInt(textNode.getAttribute('y'))
        document.onmousemove = function (ev) {
          let oevent = ev || eve
          let oeventX = oevent.layerX ? oevent.layerX : oevent.offsetX
          let oeventY = oevent.layerY ? oevent.layerY : oevent.offsetY
          eveTarget.setAttribute('x', oeventX - devX)
          eveTarget.setAttribute('y', oeventY - devY)
          gNode.setAttribute('x', oeventX - devX)
          gNode.setAttribute('y', oeventY - devY)
          textNode.setAttribute('x', oeventX - x + originTextX)
          textNode.setAttribute('y', oeventY - y + originTextY)
        }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
          let eX = e.layerX ? e.layerX : e.offsetX
          let eY = e.layerY ? e.layerY : e.offsetY
          let deltaX = eX - x
          let deltaY = eY - y
          let svgNode = gNode.parentNode
          let lineNodeList = svgNode.getElementsByTagName('line')
          for (let i = 0; i < lineNodeList.length; i++) {
            let lineNode = lineNodeList[i]
            if (lineNode.getAttribute('sourceId') === gNodeId) {
              lineNode.setAttribute('x1', parseInt(lineNode.getAttribute('x1')) + deltaX)
              lineNode.setAttribute('y1', parseInt(lineNode.getAttribute('y1')) + deltaY)
            }
            if (lineNode.getAttribute('targetId') === gNodeId) {
              lineNode.setAttribute('x2', parseInt(lineNode.getAttribute('x2')) + deltaX)
              lineNode.setAttribute('y2', parseInt(lineNode.getAttribute('y2')) + deltaY)
            }
          }
        }
      })
      return g
    }
    drawLatGro = function (latname, latid, locX, locY, isSelected, rectclass) {
      var g = document.createElementNS(vctconfig.xmlns, 'g')
      g.setAttribute('latname', latname)
      g.setAttribute('latid', latid)
      g.setAttribute('id', latid)
      g.setAttribute('x', locX)
      g.setAttribute('y', locY)
      g.setAttribute('isSel', isSelected)
      g.setAttribute('class', rectclass)
      return g
    }
    drawLatText = function (locX, locY, devX, devY, content) {
      var text = document.createElementNS(vctconfig.xmlns, 'text')
      text.setAttributeNS(null, 'fill', 'black')
      text.setAttributeNS(null, 'font-family', 'Verdana')
      text.setAttributeNS(null, 'font-size', vctconfig.fontsize)
      text.textContent = content
      text.setAttribute('x', locX + devX)
      text.setAttribute('y', locY + devY)
      return text
    }
    drawLatRect = function (width, height, rx, ry, stroke, fill, locX, locY, rectclass) {
      var rect = document.createElementNS(vctconfig.xmlns, 'rect')
      rect.setAttribute('width', width)
      rect.setAttribute('height', height)
      rect.setAttribute('rx', rx)
      rect.setAttribute('ry', ry)
      rect.setAttribute('stroke', stroke)
      rect.setAttribute('fill', fill)
      rect.setAttribute('x', locX)
      rect.setAttribute('y', locY)
      // rect.draggable()
      return rect
    }
    drawLatLinkNode = function (locX, locY, radius, type) {
      var circle = document.createElementNS(vctconfig.xmlns, 'circle')
      circle.setAttribute('stroke', 'black')
      circle.setAttribute('fill', 'black')
      circle.setAttribute('cx', locX)
      circle.setAttribute('cy', locY)
      circle.setAttribute('r', radius)
      circle.setAttribute('type', type)
      circle.setAttribute('opacity', '0')
      return circle
    }
  }
  export default {
    httpUrl,
    vctconfig,
    DrawOntLat
  }
</script>
