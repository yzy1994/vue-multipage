<template>
  <div class="w-1140 m-t-20">
    <div class="list-wrap">
      <b class="top-title">{{ title }}</b>
      <dl class="item clearfix" id="researchers">
        <dd v-for="r in rlist" :key="r.id" class="item col-xs-12">
          <img v-bind:src="r.picpath" class="img">
          <div class="detail">{{ r.resume }}</div>
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
      title: 'Researchers',
      rlist: null
    }
  },

  mounted: function () {
    axios({
      method: 'get',
      url: global.httpUrl + 'api/researcher',
      withCredentials: true})
    .then(response => { (this.rlist = response.data.data) })
  }
}
</script>

<style lang="stylus">
  .list-wrap .img {
    position: absolute;
    top: 0;
    left: 20px;
    height: 130px;
  }
  .detail {
    overflow: hidden;
    padding-left: 150px;
    line-height: 1.5;
    font-size: 15px;
    font-weight: bolder;
  }
  dd.item {
    height: 130px;
    margin-bottom: 20px;
    position: relative;
  }
</style>
