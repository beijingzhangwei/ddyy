<template>
  <li>
    <label>
      <!-- v-model="todo.done" 双向绑定修改对象的属性值-->
      <input type="checkbox"
             :checked="todo.done"
             @click="handleCheck(todo.id)"
      />
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input
          v-show="todo.isEdit"
          type="text"
          :value="todo.title"
          @blur="handleBlur(todo, $event)"
          ref="inputTitle"/>
    </label>
    <button class="btn btn-danger" @click="deleteOneTodo(todo.id)">删除</button>
    <button
        v-show="!todo.isEdit"
        class="btn btn-edit"
        @click="editOneTodo(todo)">编辑
    </button>
  </li>
</template>

<script>
import {inject} from "vue";

export default {
  name: "MyItem",
  setup() {
    let bus = inject('bus')

    function deleteOneTodo(id) {
      if (confirm('确定删除?')) {
        // this.deleteOneTodo(id)
        console.log('MyItem删除事件发送' + id)
        bus.emit('deleteItemEvent', id)
      }
    }

    return {bus, deleteOneTodo}
  },
  // 传值语法
  props: ['todo', 'changeTdoDoneById'],
  methods: {
    handleCheck(id) {
      // 通知app对应id取反
      // console.log('changeTdoDoneById(id)',id)
      this.changeTdoDoneById(id)
    },
    handleBlur(todo, e) {
      todo.isEdit = !todo.isEdit
      console.log('更新事件发送' + JSON.stringify(todo),"@@@@@e-->"+e.target.value)
      this.bus.emit('updateTodo', {id: todo.id, title: e.target.value})
    },
    editOneTodo(todo) {
      todo.isEdit = true
      this.$nextTick(
          function () {
            this.$refs.inputTitle.focus()
          }
      )
    }
  }
}
</script>

<style scoped>
li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:hover {
  background-color: beige;
}

/*悬浮展示删除按钮*/
li:hover button {
  display: block;
}
</style>