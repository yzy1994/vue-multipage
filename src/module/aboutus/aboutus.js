import Vue from 'vue'
import navi from '../../components/navi'
import foot from '../../components/foot'
import rlist from './rlist'
import plist from './plist.vue'
/* eslint-disable no-new */
new Vue({
  el: '#body',
  components: {
    navi,
    foot,
    rlist,
    plist
  }
})

