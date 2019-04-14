<template>
  <div id="body">
    <navi></navi>
    <div class="row m-t-20 clearfix w-1140">
      <leftbar @displayEC="displayEC" @displayECR="displayECR"></leftbar>
      <righttab></righttab>
    </div>
    <draggablewin title="事件类层次图" id="ecsWin" :visible="this.isECSVisible" @closeWindow="this.closeECSWin">
      <template slot="content">
        <div class="objOntToolMenu">
          <img id="reloadSvg" class="usefulImg reloadImg" src="/static/images/common/reload.png" @click="this.refreshECSvg"/>
          <img src="/static/images/common/gap.png" class="gap" />
          <img id="saveSvg" class="usefulImg reloadImg" src="/static/images/common/save.png" @click="this.saveSvg"/>
          <img src="/static/images/common/gap.png" class="gap" />
          <img id="printSvg" class="usefulimg printImg" src="/static/images/common/printer.png" />
          <img src="/static/images/common/gap.png" class="gap" />
          <img id="zoomoutSvg" class="usefulimg zoomoutImg" src="/static/images/common/zoomout.png">
          <img src="/static/images/common/gap.png" class="gap" />
          <img id="zoominSvg" class="usefulimg zoominImg" src="/static/images/common/zoomin.png">
          <img src="/static/images/common/gap.png" class="gap" />
			  </div>
        <ecssvg :eclist="this.eclist" :role="this.role" @InitSVGFinished="bindContext"></ecssvg>
      </template>
    </draggablewin>
    <draggablewin title="概念层次图" id="conceptsWin" :visible="this.isConceptsVisible" @closeWindow="this.closeConceptWin">
      <template slot="content">
        <conceptsvg :conceptlist="this.conceptlist" :role="this.role" @InitSVGFinished="bindConceptContext"></conceptsvg>
      </template>
    </draggablewin>
    <draggablewin title="事件非分类关系图" id="ecrsWin" :visible="this.isECRWinVisible" @closeWindow="this.closeECRWin">
      <template slot="content">
        <ecrecharts></ecrecharts>
      </template>
    </draggablewin>
    <foot></foot>
    <contextmenu @selectElement="selectSvgElement" @update:show="openContext" :show="this.contextMenuVisible" :target="this.contextMenuTarget">
      <li id="displayEventClass" class="item">查看事件类</li>
      <li id="editEventClass" class="item" @click="this.editEventClass">编辑事件类</li>
      <li id="addEventClass" class="item" @click="this.addChildEventClass">添加子事件类</li>
      <li id="deleteEventClass" class="item" @click="this.deleteEventClass">删除事件类</li>
    </contextmenu>
    <contextmenu @selectElement="selectConcept" @update:show="openConceptContext" :show="this.conceptContextMenuVisible" :target="this.conceptContextMenuTarget">
      <li id="editConcept" class="item">编辑概念</li>
      <li id="addConcept" class="item">添加子概念</li>
      <li id="deleteConcept" class="item">删除概念</li>
    </contextmenu>
    <draggablewin title="事件类编辑" id="ecEditWin" :visible="this.isECEditVisible" @closeWindow="this.closeECEdit">
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
import ecrecharts from './ecr-echarts.vue'
import conceptsvg from './conceptsvg.vue'
export default {
  components: {
    navi,
    foot,
    leftbar,
    righttab,
    draggablewin,
    ecssvg,
    contextmenu,
    ecrecharts,
    conceptsvg
  },
  data () {
    return {
      role: '',
      eclist: '',
      conceptlist: '',
      // TODO
      ontologyId: 2,
      contextMenuVisible: false,
      contextMenuTarget: null,
      isECSVisible: true,
      isECEditVisible: true,
      selectElmentId: '',
      ec_name: '',
      ec_parentname: '',
      ec_parentid: '',
      ec_id: '',
      ec_x: '',
      selectedElement: '',
      parentElement: '',
      isECRWinVisible: true,
      isConceptsVisible: true,
      conceptContextMenuTarget: null,
      conceptContextMenuVisible: false,
      concept_id: null,
      selectedConcept: null,
      parentConcept: null,
      concept_name: null,
      concept_parentname: null,
      concept_parentid: null,
      concept_x: null
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
    queryConceptList () {
      axios({
        method: 'get',
        url: global.httpUrl + `api/ontology/${this.ontologyId}/concept`,
        withCredentials: true})
      .then(response => {
        this.conceptlist = response.data.data
        this.role = response.data.role
        console.log(this.conceptlist)
      })
    },
    displayEC (val) {
      this.isECSVisible = val
    },
    displayECR (val) {
      this.isECRWinVisible = val
    },
    bindContext () {
      console.log('bind new target')
      this.contextMenuTarget = document.getElementsByClassName('ecrect')
    },
    bindConceptContext (rectclass) {
      this.conceptContextMenuTarget = document.getElementsByClassName(rectclass)
    },
    closeECSWin (val) {
      this.isECSVisible = false
    },
    closeECRWin (val) {
      console.log(val)
      this.isECRWinVisible = false
    },
    closeECEdit (val) {
      this.isECEditVisible = false
    },
    closeConceptWin (val) {
      this.isConceptsVisible = false
    },
    openContext (isShow) {
      this.contextMenuVisible = isShow
      // console.log(selectElmentId)
      // this.selectElmentId = selectElmentId
    },
    openConceptContext (val) {
      this.conceptContextMenuVisible = val
    },
    selectSvgElement (val) {
      this.ec_id = val
      this.selectedElement = this.findObjFromList(this.ec_id, this.eclist)
      this.ec_name = this.selectedElement.name
      this.ec_parentid = this.selectedElement.parentId
      this.parentElement = this.findObjFromList(this.ec_parentid, this.eclist)
      this.ec_parentname = this.parentElement.name
      this.ec_x = this.selectedElement.x
    },
    selectConcept (val) {
      console.log(val)
      this.concept_id = val
      this.selectedConcept = this.findObjFromList(this.concept_id, this.conceptlist)
      this.concept_name = this.selectedElement.name
      this.concept_parentid = this.selectedConcept.parentId
      this.parentConcept = this.findObjFromList(this.concept_parentid, this.conceptlist)
      this.concept_parentname = this.parentElement.name
      this.ec_x = this.selectedConcept.x
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
    },
    postEventClass () {
      /** 新增事件类 */
      axios({
        method: 'post',
        url: global.httpUrl + `api/ontology/${this.ontologyId}/eventclass`,
        data: {
          name: this.ec_name,
          parentId: this.ec_parentid
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
      this.contextMenuTarget = null
      this.queryECList()
      this.contextMenuVisible = false
      this.isECEditVisible = false
    },
    refreshConceptSvg () {
      this.conceptContextMenuTarget = null
      this.queryConceptList()
      this.conceptContextMenuVisible = false
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
    },
    saveSvg () {
      let gNodes = document.getElementsByTagName('g')
      for (let i = 0; i < gNodes.length; i++) {
        let gNode = gNodes[i]
        let ec = ''
        for (let j = 0; j < this.eclist.length; j++) {
          ec = this.eclist[j]
          if (ec.id === parseInt(gNode.getAttribute('id'))) {
            break
          }
        }
        console.log(ec.x)
        console.log(gNode.getAttribute('x'))
        this.ec_id = ec.id
        if (ec.x !== parseInt(gNode.getAttribute('x'))) {
          console.log('update')
          axios({
            method: 'put',
            url: global.httpUrl + `api/ontology/${this.ontologyId}/eventclass/${this.ec_id}`,
            withCredentials: true,
            data: {
              id: ec.id,
              name: ec.name,
              oid: this.ontologyId,
              parentId: ec.parentid,
              x: gNode.getAttribute('x')
            }
          })
        }
        this.refreshECSvg()
      }
    }
  },
  mounted: function () {
    this.refreshECSvg()
    this.refreshConceptSvg()
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
  .ec_form input:required:valid, .ec_form textarea:required:valid{
    box-shadow: 0 0 5px #66ddff;
    border-color: #44bbff;
  }
  .ec_form input:focus:invalid, .ec_form textarea:focus:invalid{
    box-shadow: 0 0 5px #d45252;
    border-color: #b03535
  }
  img.usefulimg:hover{
    color: #123456
  }
  .lielement {
    height 45px
  }
  #lisubmit button {
    margin-left 50px
    margin-right 50px
    width 60px
  }
  .objOntToolMenu {
    margin-left 50px
  }
</style>
