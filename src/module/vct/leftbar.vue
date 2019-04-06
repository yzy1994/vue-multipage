<template>
  <div class="col-xs-3">
    <div class="leftsidebar_box">
      <dl class="channel">
          <dt ref="EveClass">编辑事件类层次图</dt>
      </dl>
      <dl class="system_log">
          <dt ref="Concept">编辑概念层次图</dt>
      </dl>
      <dl class="cloud">
        <dt ref="ecRelation">非分类关系图</dt>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      displayEC: false,
      displayConcept: false,
      displayECR: false
    }
  },
  mounted: function () {
    this.$refs.EveClass.addEventListener('click', this.clickEC)
  },
  methods: {
    clickEC () {
      this.displayEC = !this.displayEC
      this.$emit('displayEC', this.displayEC)
    }
  }
}
</script>


<style lang="stylus">
  .leftsidebar_box {
    width: 220px;
    overflow: auto !important;
    height: 100% !important;
    background-color: #3992d0;
  }

  dt .active {
    background-color: rgb(49, 126, 180)
  }

  .channel dt {
    background-image: url(/static/images/leftmenu/channel.png);
  }

  .system_log dt {
    background-image: url(/static/images/leftmenu/system.png);
  }

  .cloud dt {
    background-image: url(/static/images/leftmenu/cloud.png);
  }

  .leftsidebar_box dt {
    padding-left: 40px;
    padding-right: 10px;
    background-repeat: no-repeat;
    background-position: 10px center;
    color: #f5f5f5;
    font-size: 14px;
    position: relative;
    line-height: 48px;
    cursor: pointer;
  }

</style>
