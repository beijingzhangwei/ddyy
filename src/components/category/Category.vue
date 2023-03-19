<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot name="center"> 默认值 </slot>
    <slot name="footer"> 默认值 </slot>

<!--    <slot :games="games">我是一个作用域插槽</slot>-->
  </div>
</template>

<script>
export default {
  name: "Category",
  props:['title','listData'],
  data(){
    return {
      games:['红色警戒','穿越火线','超级玛丽']
    }
  }
}
</script>

<style scoped>

.category{
  background-color: #139be1;
  width: 200px;
  height: 300px;
}

h3{
  text-align: center;
}
img{
  display: block;
  margin: 0 auto;
  width:75%;
  height: 80%;
  align-items: center;
}
video{
  display: block;
  margin: 0 auto;
  width:100%;
  height: 100%;
}
</style>