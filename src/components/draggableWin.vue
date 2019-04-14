<template>
  <div class="draggableWin" ref="dWin" v-bind:id="id" :style="style">
    <div class="title draggable" id="dTitile" @mousedown="mousedown">
      <h3>
        {{ title }}
      </h3>
      <h3>
        <div>
          <!-- <a class="max" href="javascript:;" title="最大化"></a>
          <a class="revert" href="javascript:;" title="还原"></a> -->
          <a class="close" href="javascript:;" ref="closeWin" title="关闭"></a>
        </div>
		  </h3>
    </div>

    <div class="resizeL"></div>
    <div class="resizeT"></div>
    <div class="resizeR"></div>
    <div class="resizeB"></div>
    <div class="resizeLT"></div>
    <div class="resizeTR"></div>
    <div class="resizeBR"></div>
    <div class="resizeLB"></div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'dWin'
    },
    visible: false
  },
  mounted: function () {
    this.$refs.closeWin.addEventListener('click', () => {
      console.log('closeWin')
      console.log(this.id)
      this.$emit('closeWindow', this.id)
    })
  },
  watch: {
    visible (newVal) {
      console.log(newVal)
      if (newVal === true) {
        this.style = 'display:block'
      } else {
        this.style = 'display:none'
      }
    }
  },
  data () {
    return {
      style: '',
      selectElement: ''
    }
  },
  methods: {
    mousedown (e) {
      // 窗口拖拽
      this.selectElement = this.$refs.dWin
      var div1 = this.selectElement
      this.selectElement.style.cursor = 'move'
      this.isDown = true
      var distanceX = e.clientX - this.selectElement.offsetLeft
      var distanceY = e.clientY - this.selectElement.offsetTop
      document.onmousemove = function (ev) {
        var oevent = ev || e
        div1.style.left = oevent.clientX - distanceX + 'px'
        div1.style.top = oevent.clientY - distanceY + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
        div1.style.cursor = 'default'
      }
    }
  }
}
</script>


<style lang="stylus">
  .draggableWin {
    background: url(/static/images/common/page-bg.jpg);
    position: absolute;
    top: 20%;
    left: 20%;
    border: 1px solid #444;
    border-radius: 5px;
    box-shadow: 0 1px 3px 2px #666;
    z-index: 2;
    display: block;
  }

  .draggableWin .title {
    position relative
    height 40px
    margin 5px
  }

  .draggableWin .title h2{
    font-size 14px
    height 27px
    line-height 24px
    border-bottom 1px
    solid #a1b4b0
  }

  .draggableWin .title div{
    position absolute
    height 19px
    top 2px
    right 0
  }

  .draggableWin .title a.max {
    background-position: -60px 0;
  }

  .draggableWin .title a, a.open {
    float: left;
    width: 21px;
    height: 19px;
    display: block;
    margin-left: 5px;
    background: url(/static/images/bont/ObjOnt.png) no-repeat;
  }

  .draggableWin .title a.close {
    background-position: -89px 0;
  }

  .draggableWin .title a.close:hover {
    background-position: -89px -29px;
  }
  
</style>
