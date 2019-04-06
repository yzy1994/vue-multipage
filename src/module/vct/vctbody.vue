<template>
  <div id="body">
    <navi></navi>
    <div class="row m-t-20 clearfix w-1140">
      <leftbar @displayEC="displayEC"></leftbar>
      <righttab></righttab>
    </div>
    <draggablewin title="事件本体" id="ecsWin" v-bind:visible="this.isECSVisible" @closeWindow="this.closeECSWin">
      <template slot="content">
        <ecssvg v-bind:eclist="this.eclist" v-bind:role="this.role" @InitSVGFinished="bindContext"></ecssvg>
      </template>
    </draggablewin>
    <foot></foot>
    <contextmenu @selectElment="selectSvgElement" @update:show="openContext" :show="contextMenuVisible" :target="contextMenuTarget">
      <li id="editEventClass" @click="this.editEventClass">编辑事件类</li>
      <li id="addEventClass" @click="this.addChildEventClass">添加子事件类</li>
      <li id="deleteEventClass" @click="this.deleteEventClass">删除事件类</li>
    </contextmenu>
    <draggablewin title="事件类编辑" id="ecEditWin" v-bind:visible="this.isECEditVisible" @closeWindow="this.closeECEdit">
      <template slot="content">
        <form id="ecDetailForm" class="ec_form" method="post">
          <ul>
            <li id="liname" class="lielement"><label for="eclatname">事件类名称:</label>
              <input name="eclatname" type="text" required="required" id="eclatname" v-model="ec_name">
            </li>

            <li id="liparent" class="lielement"><label for="ecparentlatname">父类名称:</label> 
              <input name="ecparentlatname" type="text" required="required" id="ecparentlatname" readonly=true v-model="ec_parentname">
            </li>

            <li id="linote" class="lielement"><label for="eclatnote" id="noteLB">备注:</label> <input value="note.." name="eclatnote" type="text" required="required" id="eclatnote"></li>

            <li id="liea" class="lielement"><label id="lea">动作要素:</label>
              <label id="leai" style="width: 300px;"></label></li>
            <li id="lieo" class="lielement"><label id="leo">对象要素:</label>
              <label id="leoi" style="width: 300px;"></label></li>
            <li id="liet" class="lielement"><label id="let">时间要素:</label>
              <label id="leti" style="width: 300px;"></label></li>
            <li id="liee" class="lielement"><label id="lee">环境要素:</label>
              <label id="leei" style="width: 300px;"></label></li>
            <li id="lieas" class="lielement"><label id="leas">断言要素:</label>
              <label id="leasi" style="width: 300px;"></label></li>
            <li id="liele" class="lielement"><label id="lele">语言表现要素:</label>
              <label id="lelei" style="width: 300px;"></label></li>
            <li id="lisubmit">
              <button class="btn btn-info" type="button" id="saveObj" @click="postEventClass">保存</button>
              <button class="btn btn-info" type="reset" id="resetObj">重置</button>
              <input name="objOid" type="text" id="objOid" style="display: none">
            </li>
          </ul>
        </form>
      </template>
    </draggablewin>
  </div>
</template>

<script>
import axios from 'axios'
import global from '../../components/common.vue'
import navi from '../../components/navi.vue'
import foot from '../../components/foot.vue'
import leftbar from './leftbar.vue'
import righttab from './righttab.vue'
import draggablewin from '../../components/draggableWin.vue'
import ecssvg from './ecssvg.vue'
import contextmenu from './context-menu.vue'
export default {
  components: {
    navi,
    foot,
    leftbar,
    righttab,
    draggablewin,
    ecssvg,
    contextmenu
  },
  data () {
    return {
      role: '',
      eclist: '',
      // TODO
      ontologyId: 2,
      contextMenuVisible: false,
      contextMenuTarget: '',
      isECSVisible: true,
      isECEditVisible: true,
      selectElmentId: '',
      ec_name: '',
      ec_parentname: '',
      ec_parentid: '',
      ec_id: '',
      ec_x: '',
      selectedElement: '',
      parentElement: ''
    }
  },
  methods: {
    queryECList () {
      axios({
        method: 'get',
        url: global.httpUrl + `api/ontology/${this.ontologyId}/eventclass`,
        withCredentials: true})
      .then(response => {
        this.eclist = response.data.data
        this.role = response.data.role
      })
    },
    displayEC (val) {
      this.isECSVisible = val
    },
    bindContext () {
      this.contextMenuTarget = document.getElementsByClassName('ecrect')
    },
    closeECSWin (val) {
      this.isECSVisible = false
    },
    closeECEdit (val) {
      this.isECEditVisible = false
    },
    openContext (isShow) {
      this.contextMenuVisible = isShow
      // console.log(selectElmentId)
      // this.selectElmentId = selectElmentId
    },
    selectSvgElement (val) {
      this.ec_id = val
      this.selectedElement = this.findObjFromList(this.ec_id, this.eclist)
      this.ec_name = this.selectedElement.name
      this.ec_parentid = this.selectedElement.parentid
      this.parentElement = this.findObjFromList(this.ec_parentid, this.eclist)
      this.ec_parentname = this.parentElement.name
      this.ec_x = this.selectedElement.x
    },
    editEventClass (e) {
      this.isECEditVisible = true
      this.contextMenuVisible = false
    },
    addChildEventClass (e) {
      this.isECEditVisible = true
      this.contextMenuVisible = false
      this.ec_parentname = this.ec_name
      this.ec_parentid = this.ec_id
      this.ec_id = null
      this.ec_name = null
    },
    deleteEventClass (e) {
      axios({
        method: 'delete',
        url: global.httpUrl + `api/ontology/${this.ontologyId}/eventclass/${this.ec_id}`,
        withCredentials: true})
      .then(response => {
        if (response.data.code !== 200) {
          console.log('删除失败')
        } else {
          this.refreshECSvg()
        }
      })
      this.refreshECSvg
    },
    postEventClass () {
      /** 新增事件类 */
      axios({
        method: 'post',
        url: global.httpUrl + `api/ontology/${this.ontologyId}/eventclass`,
        data: {
          name: this.ec_name,
          parentid: this.ec_parentid
        },
        withCredentials: true})
      .then(response => {
        if (response.data.code !== 200) {
          console.log('操作失败')
          return false
        } else {
          this.refreshECSvg()
          return true
        }
      })
    },
    refreshECSvg () {
      this.queryECList()
      this.contextMenuVisible = false
      this.isECEditVisible = false
    },
    findObjFromList (id, list) {
      console.log(id)
      if (id.toString === '0') {
        let root = {}
        root.name = 'root'
        root.id = 0
        return root
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i].id.toString() === id.toString()) {
          return list[i]
        }
      }
      return null
    }
  },
  mounted: function () {
    this.refreshECSvg()
  }
}
</script>

<style lang="stylus">
  div#ecsWin{
    width 1002px
    height 560px
  }

  div#ecEditWin{
    width 450px
    height 650px
  }
  .ec_form ul{
    list-style-type none
    margin 0px
    padding 0px
  }
  .ec_form li{
    padding 12px
    border-bottom 1px solid #eee
  }
  .ec_form label{
    width: 120px;
    margin-top: 3px;
    display: inline-block;
    float: left;
    padding: 3px;
    overflow: hidden;
    height: 25px;
  }
  .ec_form input:focus, .ec_form textarea:focus {
    background: #fff;
    border: 1px solid #555;
    box-shadow: 0 0 3px #aaa;
    padding-right: 70px;
  }
  /* === HTML5 validation styles === */

.ec_form input:required:valid, .ec_form textarea:required:valid{
	box-shadow: 0 0 5px #66ddff;
	border-color: #44bbff;
}

.ec_form input:focus:invalid, .ec_form textarea:focus:invalid{
	box-shadow: 0 0 5px #d45252;
	border-color: #b03535
}
</style>
