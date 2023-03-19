<template>
  <div class="todo-header">
    <input type="text" placeholder="输入任务，回车确认"
           v-model="title" @keyup.enter="add"/>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name: "MyHeader",
  data() {
    return {
      title: ''
    }
  },
  props:["addTodo"],
  methods: {
    add() {
      // 将用户输入包装
      if (!this.title.trim()){
        return alert("输入不能为空")
      }
      const todoObj = {id:nanoid(), title:this.title, done:false, isEdit: false}
      // console.log(todoObj)
      this.addTodo(todoObj)
      this.title= ''
    },
  }
}
</script>

<style scoped>

</style>