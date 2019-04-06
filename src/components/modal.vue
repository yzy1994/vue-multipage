<script>
  /**
   * Bootstrap Style Modal Component for Vue
   * Depend on Bootstrap.css
   * Copy from https://github.com/Coffcer/vue-bootstrap-modal
   */

  export default {
    props: {
      show: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      title: {
        type: String,
        default: 'Modal'
      },
      small: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      full: {
        type: Boolean,
        default: false
      },
      // 为true时无法通过点击遮罩层关闭modal
      force: {
        type: Boolean,
        default: false
      },
      // 确认按钮text
      okText: {
        type: String,
        default: 'OK'
      },
      // 取消按钮text
      cancelText: {
        type: String,
        default: 'Cancel'
      },
      // 确认按钮className
      okClass: {
        type: String,
        default: 'btn blue'
      },
      // 取消按钮className
      cancelClass: {
        type: String,
        default: 'btn red btn-outline'
      },
      // 点击确定时关闭Modal
      // 默认为false，由父组件控制prop.show来关闭
      closeWhenOK: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        duration: null
      }
    },
    computed: {
      modalClass () {
        return {
          'modal-lg': this.large,
          'modal-sm': this.small,
          'modal-full': this.full
        }
      }
    },
    created () {
      if (this.show) {
        document.body.className += ' modal-open'
      }
    },
    beforeDestroy () {
      document.body.className = document.body.className.replace(/\s?modal-open/, '')
    },
    watch: {
      show (value) {
        if (value) {
          document.body.className += ' modal-open'
        } else {
          if (!this.duration) {
            this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000
          }

          window.setTimeout(() => {
            document.body.className = document.body.className.replace(/\s?modal-open/, '')
          }, this.duration || 0)
        }
      }
    },
    methods: {
      ok () {
        this.$emit('ok')
        if (this.closeWhenOK) {
          this.$emit('close')
        }
      },
      cancel () {
        this.$emit('close')
      },
      // 点击遮罩层
      clickMask () {
        if (!this.force) {
          this.$emit('close')
        }
      }
    }
  }
</script>

<template>
  <transition name="modal">
    <div v-show="show">
      <div class="modal" @click.self="clickMask">
        <div class="modal-dialog" :class="modalClass">
          <div class="modal-content">
            <!--Header-->
            <div class="modal-header">
              <slot name="header">
                <a type="button" class="close" @click="cancel">x</a>
                <h4 class="modal-title">
                  <slot name="title">
                    {{title}}
                  </slot>
                </h4>
              </slot>
            </div>
            <!--Container-->
            <div class="modal-body">
              <slot></slot>
            </div>
            <!--Footer-->
            <!-- <div class="modal-footer">
              <slot name="footer">
                <button type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
                <button type="button" :class="okClass" @click="ok">{{okText}}</button>
              </slot>
            </div> -->
          </div>
        </div>
      </div>
      <div class="modal-backdrop in"></div>
    </div>
  </transition>
</template>

<style lang="stylus">
  .modal {
    display: block;
  }
  .modal-dialog {
    margin: 10% auto 10px;
  }
  .modal-enter-active, .modal-leave-active {
    transition: all .5s ease;
    .modal-dialog, .modal-backdrop {
      transition: all .5s ease;
    }
  }
  .modal-enter, .modal-leave-to {
    .modal-dialog {
      opacity: 0;
      transform: translateY(-20%);
    }
    .modal-backdrop {
      opacity: 0;
    }
  }
  .modal-leave, .modal-enter-to {
    .modal-dialog {
      opacity: 1;
      transform: translateY(0%);
    }
    .modal-backdrop {
      opacity: .5;
    }
  }
  .close {
    font-size: 16px;
  }
</style>