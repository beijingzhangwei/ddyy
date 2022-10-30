<template>
  <li class='p-2'>
    {{ title }}
    <!--  把删除remove事件传给父组件-->
    <button @click="$emit('remove')">删除</button>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    title:''
  }
}
</script>

<style scoped>

</style>