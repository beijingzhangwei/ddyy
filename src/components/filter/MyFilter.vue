<template v-if="n>=0">
  <div>显示格式化数据</div>
<!--  bootCDN 前端库-->
<!--  moment.js day.js -->
  <div v-if="1" id="root">
    <h3 :style="{opacity}"  >现在是：{{time}}</h3>
    <h3>格式化后：{{fmtTime}}</h3>
<!--    <h3>格式化后：{{ time | timeFormator('YYYY年MM月DD日 HH:mm:ss')|capitalize }}</h3>-->
<!--    <h3>格式化后：{{ dog | capitalize}}</h3>-->
  </div>

</template>

<script>
import day from "../../../js/day.js";
import * as date from "element-plus/es/components/countdown/src/utils";
const capitalize = (value) => {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};
const timeFormator = (value, fmat='YYYY年MM月DD日 HH:mm:ss')=>{
  console.log(value, fmat)
  return day(1678505697435).format(fmat)
  // return '不行啊'
}
export default {
  name: 'MyFilter',
  data() {
    return {
      dog:'xiaogou',
      time:1678505697435,
      opacity:1
    }
  },
  methods: {
  },
  // vue 完成模版的解析 真实的dom元素放入元素后
  mounted() {
    console.log("mounted....")
    setInterval(()=>{
      this.opacity -= 0.01
      if (this.opacity <= 0) {

        this.time = new Date().getTime()
        this.opacity = 1
      }
    }, 16)
  },
  computed:{
    fmtTime(){
        return day(this.time).format('YYYY年MM月DD日 HH:mm:ss')
    }
  },
  watch: {

  },
  // 过滤器---配置项 局部使用
  filters: {
    capitalize,timeFormator
  }

}

</script>
