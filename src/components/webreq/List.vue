<template>
  <div class="row">
    <div v-show="info.users.length" class="card" v-for="user in info.users" :key="user.login">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style='width: 100px'/>
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
    <h1 v-show="info.isFirst">欢迎使用！</h1>
    <h1 v-show="info.isLoading">加载中..................</h1>
    <h1 v-show="info.errMsg">出错了{{info.errMsg}}</h1>
  </div>
</template>

<script>
import {inject, ref} from "vue";

export default {
  name: "List",
  setup() {
    let info = ref({
      isFirst:true,
      isLoading:false,
      errMsg:'',
      users:[]
    })
    let bus = inject('bus')

    bus.on('userList', (result) => {
      console.log('接收到所有用户-----> result=' + JSON.stringify(result))
      // es6合并语法
      info.value = {...info.value, ...result}
    })
    return {bus, info}
  }
}
</script>

<style scoped>
  .album {
    min-height: 50rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f2f2f2;
  }
  .card{
    float: left;
    width: 33.33%;
    padding: .75rem;
    margin-bottom:2rem;
    border: 1px solid #f2f2f2;
    text-align: center;
  }
  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }
  .card-text{
    font-size: 85%;
  }
</style>