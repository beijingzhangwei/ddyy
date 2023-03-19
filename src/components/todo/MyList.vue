<template>
  <ul class="todo-main">
    <transition-group name="todo" appear>
      <MyItem v-for="todoObj in todos"
              :key="todoObj.id"
              :changeTdoDoneById="changeTdoDoneById"
              :deleteOneTodo="deleteOneTodo"
              :todo="todoObj"/>
    </transition-group>
  </ul>
</template>

<script>
import MyItem from "@/components/todo/MyItem";

export default {
  name: "MyList",
  components: {MyItem},
  data() {

  },
  props: ['todos', 'changeTdoDoneById', 'deleteOneTodo'],
  mounted() {

  }
}

</script>

<style>

.todo-enter-active {
  animation: donghua 0.5s linear;
}

.todo-leave-active {
  animation: donghua 0.5s linear reverse;
}

@keyframes donghua {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>