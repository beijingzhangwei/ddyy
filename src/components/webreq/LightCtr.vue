<template>
  <div class="m-3 p-3 border border-success">
    <input type="button" @click="lightSwitch" value="卧室灯控开关">
    <img alt="light logo"  :src="imgList[imgIdx]">
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";

export default {
  name: "LightCtr",
  setup(){
    let imgList = ref(["./close.jpeg", "./open.jpeg"])
    let imgIdx = ref(0)
    return {imgList, imgIdx}
  },
  mounted() {
    this.lightSwitch()
  },
  methods:{
     lightSwitch() {
       axios.get('https://ddyydy.tk/ddyy-b/switch_light').then(
           response => {
             console.log("请求成功了",response.data)
             let switchData = response.data
             this.imgIdx = parseInt(switchData.switchCount) % 2
           },
           error => {
             console.log("请求失败了",error.message)
           }
       )
    }
  }
}
</script>

<style scoped>

</style>