<template>

</template>

<script>
import {inject} from "vue";

export default {
  name: "MyListen",
  props:['todos'],
  // setup(){
  //   let bus = inject('bus')
  //   bus.on('bro', (value)=>{
  //     console.log('事件总线收到传值-----> '+value)
  //   })
  //   bus.on('deleteItemEvent', (value)=>{
  //     console.log('事件总线收到删除事件-----> id='+value)
  //   })
  //   return {bus}
  // }
}
</script>

<style scoped>

</style>