<template>
  <div>
    <div class="list-wrap m-t-20 h-600 w-1140">
      <b class="top-title">本体操作</b>
      <div class="ontform m-t-20">
        <button type="button" @click="showModal" class="button btn-success">新建本体</button>
        <button type="button" class="button btn-success" id="importOnt">导入本体</button>
      </div>
      <div class="ontform m-t-20">
        <table class="table table-hover">
          <tbody id="tbo">
            <tr class="success">
              <td>本体名称</td>
              <td>应用领域</td>
              <td>本体操作</td>
            </tr>
            <tr v-for="ont in ontlist" :key="ont.oid">
              <td>{{ ont.name }}</td>
              <td>{{ ont.field }}</td>
              <td>
                <button v-if="role==='admin'" type="button" class="button btn-danger">删除本体</button>
                <button v-if="role==='admin'" type="button" class="button btn-info">编辑本体</button>
                <button v-if="role==='user'" type="button" class="button btn-info">查看本体</button>
                <button type="button" class="button btn-primary">导出本体</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <modal title="事件本体" :show.sync="show" @close="closeModal">
      <div>
        <form class="form-horizontal" role="form" id="ontInfoForm" >
          <div class="form-group">
            <label for="name" class="col-sm-2 control-label">本体名称:</label>
            <div class="col-sm-10">
              <input type="text" name="name" v-model="name" class="form-control" id="name" placeholder="例如突发事件本体">
            </div>
          </div>
          <div class="form-group">
            <label for="field" class="col-sm-2 control-label">应用领域:</label>
            <div class="col-sm-10">
              <input type="text" name="field" v-model="field" class="form-control" id="field" placeholder="例如环境污染领域">
            </div>
          </div>
          <div class="form-group">
            <label for="latname" class="col-sm-2 control-label">顶层事件类:</label>
            <div class="col-sm-10">
              <input type="text" name="latname" v-model="latname" class="form-control" id="latname" placeholder="例如突发事件">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-8 col-sm-10">
              <button type="reset" class="button btn-info">重置</button>
              &nbsp;
              <button type="button" id="submitForm" class="button btn-success" @click="submitForm">提交</button>
            </div>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import global from '../../components/common.vue'
import modal from '../../components/modal.vue'
export default {
  components: {
    modal
  },
  data () {
    return {
      role: '',
      ontlist: null,
      show: false,
      name: '',
      field: '',
      latname: '',
      form_method: 'post'
    }
  },
  mounted: function () {
    axios({
      method: 'get',
      url: global.httpUrl + 'api/ontology',
      withCredentials: true})
    .then(response => {
      this.ontlist = response.data.data.ontologyList
      this.role = response.data.data.role
    })
  },
  methods: {
    showModal () {
      this.show = true
    },
    closeModal () {
      this.show = false
    },
    submitForm () {
      axios({
        method: 'post',
        url: global.httpUrl + '/api/ontology',
        data: {
          name: this.name,
          field: this.field,
          latname: this.latname
        },
        withCredentials: true
      }).then(function (response) {
        console.log(response)
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
  .ontform {
    margin-left 10px
    margin-right 10px
  }
</style>
