<template>
  <div id="app">
    <my-button/>
    <hr>
    <the-application-bar></the-application-bar>
    <router-view class="content"/>
  </div>
</template>


<script>
import TheApplicationBar from "@/components/UI/TheApplicationBar";
import MyButton from "@/components/test/MyButton"
export default {
  components: {
    TheApplicationBar,
    MyButton
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