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
      var eventData = {
        'devX': devX,
        'devY': devY,
        'devNodeX': devNodeX,
        'devNodeY': devNodeY
      }
      latRect.addEventListener('mousedown', function (eve) {
        this.drag(eve, eventData)
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

    // drag = function (eve, eventData) {
    //   if (!eve) {
    //     eve = window.event
    //   }
    //   let tar = eve.target
    //   let devX2 = eventData.devX
    //   let devY2 = eventData.devY
    //   let devNodeX = eventData.devNodeX
    //   let devNodeY = eventData.devNodeY
    //   let doc = document
    //   let tarPar = tar.parentNode
    //   let x = eve.layerX ? eve.layerX : eve.offsetX
    //   let y = eve.layerY ? eve.layerY : eve.offsetY
    //   let oriX = tarPar.getAttribute('x')
    //   let oriY = tarPar.getAttribute('y')
    //   let devX = x - oriX
    //   let devY = y - oriY
    //   if (tar.setCapture) {
    //     tar.setCapture()
    //   }
    //   else if (window.captureEvents) {
    //     window.captureEvents(window.event.MOUSEMOVE | window.event.MOUSEUP)
    //   }
    //   doc.onmousemove = function(eve) {
    //     if (!eve) {
    //       eve = window.event
    //     }
    //     let tx = eve.layerX - devX - oriX
    //     let ty = eve.layerY - devY - oriY
    //     tarPar.setAttribute('x', tx + parseInt(oriX))
    //     tarPar.setAttribute('y', ty + parseInt(oriY))
    //     let childList = tarPar.childNodes
    //     for (var i = 0; i < childList.length; i++) {
    //       let tempChild = childList[i]
    //       let tempLocX
    //       let tempLocY
    //       if (tempChild.tagName === 'circle') {
    //         tempChild.setAttribute('cx', tx + parseInt(oriX) + devNodeX)
    //         if (tempChild.getAttribute('type') === this.vctconfig.bottomCir) {
    //           tempChild.setAttribute('cy', ty + parseInt(oriY) + devNodeY)
    //         } else {
    //           tempChild.setAttribute('cy', ty + parseInt(oriY))
    //         }
    //       } else if (tempChild.tagName === 'text') {
    //         tempChild.setAttribute('x', tx + parseInt(oriX) + devX2)
    //         tempChild.setAttribute('y', ty + parseInt(oriY) + devY2)
    //       } else {
    //         tempChild.setAttribute('x', tx + parseInt(oriX))
    //         tempChild.setAttribute('y', ty + parseInt(oriY))
    //       }
    //     }
    //     var parId = tarPar.getAttribute('id')
    //     var startLineList = new ArrayList()
    //     var endLineList = new ArrayList()
    //     // change the loc of connection
    //     for (var j = 0; j < conLineList.size(); j++) {
    //       var conLine = conLineList.get(j)
    //       var startId = conLine.getAttribute('startId')
    //       var endId = conLine.getAttribute('endId')
    //       if (startId === parId) {
    //         startLineList.add(conLine)
    //       } else if (endId === parId) {
    //         endLineList.add(conLine)
    //       }
    //     }
    //     for (var m = 0; m < startLineList.size(); m++) {
    //       var tempStartLine = startLineList.get(m)
    //       tempStartLine.setAttribute('x1', tx + parseInt(oriX) + devNodeX)
    //       tempStartLine.setAttribute('y1', ty + parseInt(oriY) + devNodeY)
    //     }
    //     for (var n = 0; n < endLineList.size(); n++) {
    //       var tempEndLine = endLineList.get(n)
    //       tempEndLine.setAttribute('x2', tx + parseInt(oriX) + devNodeX)
    //       tempEndLine.setAttribute('y2', ty + parseInt(oriY))
    //     }
    //   }
    //   doc.onmouseup = function () {
    //     if (tar.releaseCapture) {
    //       tar.releaseCapture()
    //     } else if (window.captureEvents) {
    //       window.captureEvents(window.event.MOUSEMOVE | window.event.MOUSEUP)
    //     }
    //     doc.onmousemove = null
    //     doc.onmouseup = null
    //   }
    // }
  }
  export default {
    httpUrl,
    vctconfig,
    DrawOntLat
  }
</script>
