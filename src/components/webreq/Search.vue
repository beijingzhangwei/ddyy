<template>
  <section class="jumbotron">
    <h3 class="jumbortron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter name search" v-model="keyWord"/>&nbsp;
      <button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
import {inject, ref} from "vue";
import axios from "axios";

export default {
  name: "Search",
  setup(){
    let bus = inject('bus')
    let keyWord = ref("")
    return {bus, keyWord}
  },
  methods: {
    searchUsers() {
      this.bus.emit('userList', {users:[], errMsg:"", isFirst: false, isLoading:true})
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
          response => {
            console.log("success", response.data)
            this.bus.emit('userList', {users: response.data.items, errMsg: "", isLoading: false})
          },
          error => {
            console.log("failed", {users:[], errMsg: error.message, isLoading: false})
            this.bus.emit('userList', {users: [], errMsg: error.message, isLoading: false})
          }
      )
    }
  }
}
</script>

<style scoped>

</style>