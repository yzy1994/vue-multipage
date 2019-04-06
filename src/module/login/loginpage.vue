<template>
  <div class="centerLogin" style="background-image: url(/static/images/login/login.png);">
    <ul class="login">
      <form>
        <p>{{ msg }}</p>
        <li><span class="left">用户名：</span> <span style=""> <input v-model="username" id="username" name="username" type="text" class="txt">
        </span></li>
        <li><span class="left">密 码： </span> <span style=""> <input v-model="password" id="password" name="password" type="password" class="txt">
        </span></li>
    </form></ul>
    <input class="btn btn-default" type="submit" value="登录" @click="submitForm">
    
  </div>
</template>

<script>
import axios from 'axios'
import global from '../../components/common.vue'
export default {
  data () {
    return {
      username: 'admin',
      password: '123',
      msg: ''
    }
  },

  methods: {
    submitForm: function (e) {
      axios({
        method: 'post',
        url: global.httpUrl + 'token',
        data: {
          username: this.username,
          password: this.password
        },
        withCredentials: true
      }).then(function (response) {
        console.log(response)
        console.log(response.data.code)
        console.log(response.data.msg)
        if (response.data.code === 200) {
          console.log('login success')
          window.location.href = 'index.html'
        } else {
          this.msg = response.data.msg
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.centerLogin {
    position: absolute;
    width: 664px;
    height: 339px;
    left: 50%;
    top: 50%;
    margin-left: -332px;
    margin-top: -170px;
}
.login {
    margin-top: 100px;
    margin-left: 380px;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.btn {
    margin-left: 435px;
    margin-top: 20px;
}
.login li {
    height: 35px;
    overflow: hidden;
}
.txt {
    width: 150px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    border: 0px;
    padding-left: 3px;
    color: #999999;
    background: url(/static/images/login/txt.png) no-repeat left center;
}
#password {
    margin-left: 10px;
}
.btn-default {
    color: #ffffff;
    background-color: #337ab7;
    border-color: #2e6da4;
    width 80px
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
</style>
