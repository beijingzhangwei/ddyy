<template>
  <div id="app">
    <my-button/>
    <my-menu/>
    <hr>
<!--    <the-application-bar></the-application-bar>-->
<!--    <router-view class="content"/>-->
  </div>
</template>
<!--接下来我们在主页的App.vue文件中完成路由加载操作：-->

<script>
import TheApplicationBar from "@/components/UI/TheApplicationBar";
import MyButton from "@/components/test/MyButton"
import MyMenu from "@/components/menu/MyMenu"
export default {
  components: {
    TheApplicationBar,
    MyButton,
    MyMenu
  }
};
</script>

<style>

#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  collapse: #2c3e50;
  margin-top: 60px;

  background: url("./assets/bg.jpeg");
  width: 100%;
  height: 100%;
  position: center;
  background-size: 100% 100%;
}
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.content {
  padding-top: 5.5vh;
  padding-left: 10%;
}

</style>