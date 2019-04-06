<template>
  <div v-show="show" :style="style" style="display: block" @mousedown.stop @contextmenu.prevent class="context">
    <ul class="context-menu">
      <!-- <li class="context-title">{{ this.title }}</li> -->
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'context-menu',
  props: {
    title: '功能菜单',
    target: null,
    show: Boolean
  },
  data () {
    return {
      triggerShowFn: () => {},
      triggerHideFn: () => {},
      x: null,
      y: null,
      style: {},
      binded: false,
      selelctElmentId: ''
    }
  },
  mounted () {
  },
  watch: {
    show (value) {
      if (value) {
        this.bindHideEvents()
      } else {
        this.unbindHideEvents()
      }
    },
    target (val) {
      this.bindEvents()
    }
  },
  methods: {
    // 初始化事件
    bindEvents () {
      this.$nextTick(() => {
        if (!this.target || this.binded) return
        this.triggerShowFn = this.contextMenuHandler.bind(this)
        console.log(this.target)
        console.log(this.target.length)
        for (let i = 0; i < this.target.length; i++) {
          console.log(this.target[i])
          this.target[i].addEventListener('contextmenu', this.triggerShowFn)
        }
        this.binded = true
      })
    },
    // 取消绑定事件
    unbindEvents () {
      if (!this.target) return
      this.target.removeEventListener('contextmenu', this.triggerShowFn)
    },
    // 绑定隐藏菜单事件
    bindHideEvents () {
      this.triggerHideFn = this.clickDocumentHandler.bind(this)
      document.addEventListener('mousedown', this.triggerHideFn)
      document.addEventListener('mousewheel', this.triggerHideFn)
    },
    // 取消绑定隐藏菜单事件
    unbindHideEvents () {
      document.removeEventListener('mousedown', this.triggerHideFn)
      document.removeEventListener('mousewheel', this.triggerHideFn)
    },
    // 鼠标按压事件处理器
    clickDocumentHandler (e) {
      this.$emit('update:show', false)
    },
    // 右键事件事件处理
    contextMenuHandler (e) {
      this.selelctElmentId = e.path[1].getAttribute('id')
      this.x = e.clientX
      this.y = e.clientY
      this.layout()
      this.$emit('update:show', true)
      this.$emit('selectElment', this.selelctElmentId)
      e.preventDefault()
    },
    // 布局
    layout () {
      this.style = {
        left: this.x + 'px',
        top: this.y + 'px'
      }
    }
  }
}
</script>

<style lang="stylus">
  .context {
    position fixed
    background #ffffff
    border solid 1px rgba(0, 0, 0, .2)
    border-radius 3px
    z-index 999
    display none
  }
  .context ul{
    margin-left 0
  }
  .context li{
    width 80px
    height 35px
    line-height 35px
    font-size 12px
    text-align center
    display block
    color #1a1a1a
  }
  .context li:hover {
    background #555555
    color: #ffffff
  }
</style>
