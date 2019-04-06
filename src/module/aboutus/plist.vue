<template>
  <div id="divpaper" class="w-1140 m-t-20">
    <div class="list-wrap">
      <b class="top-title">{{ title }}</b>
      <dl class="items clearfix" id="papers">
        <dd v-for="p in plist" :key="p.id" class="paper col-xs-12">
          <a v-bind:href="p.path">{{ p.paperName }}</a>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import global from '../../components/common.vue'
export default {
  data () {
    return {
      title: 'papers',
      plist: null
    }
  },
  mounted: function () {
    axios({
      method: 'get',
      url: global.httpUrl + 'api/paper',
      withCredentials: true})
    .then(response => { (this.plist = response.data.data) })
  }
}
</script>


<style lang="stylus">
.paper {
    height: 20px;
    margin-bottom: 5px;
    position: relative;
    overflow: hidden;
}
</style>
