<template>
  <div>
    <button @click="isShow=!isShow">显示/隐藏</button>
<!-- appear 标签属性 true 有 ，false 无   -->

    <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__wobble"
        leave-active-class="animate__backOutUp"
        >
      <h1 v-show="isShow" key="2" >欢迎来到多悦网！</h1>
    </transition-group>
  </div>
</template>

<script>
import {ref} from "vue";
// 比较好的动画库
import 'animate.css';

export default {
  name: "MovePic",
  setup(){
    let isShow = ref(true)
    return {isShow}
  }
}
</script>

<style scoped>
  h1{
    background-color: #139be1;
  }
  .hello-enter-active{
    animation: donghua 1s linear;
  }
  .hello-leave-active{
    animation: donghua 1s  linear reverse;
  }
  @keyframes donghua {
    from{
      transform: translateX(-100%);
    }
    to{
      transform: translateX(0px);
    }
  }
</style>