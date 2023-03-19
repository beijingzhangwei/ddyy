<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox"
             v-model="isAll"
      >
    </label>
    <span>
      <span>已完成{{doneTotal}}</span> / 全部 {{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
    <button class="btn btn-danger" @click="sendTotalCnt">发送总任务数</button>
    <button class="btn btn-danger" @click="offBind">解绑</button>
  </div>
</template>

<script>
import {computed, inject} from "vue";

export default {
  name: "MyFooter",
  setup(){
    let bus = inject('bus')
    return {bus}
  },
  props: ['todos'],
  computed: {
    doneTotal() {
      console.log(this.todos)
      console.log(this)
      return this.todos.reduce((pre, current) => {
        return pre + (current.done === true ? 1 : 0)
      }, 0)
    },
    total() {
      return this.todos.length
    },
    isAll: {
      get(){
        return this.doneTotal > 0 && this.doneTotal === this.total
      },
      set(isCheckOrUncheck){
        // this.$emit('checkAllTodo', isCheckOrUncheck)
        this.bus.emit("checkAllTodo", isCheckOrUncheck)
      }
    }
  },
  methods: {
    clearAll(){
      // this.$emit('clearAllTodo')
      this.bus.emit('bro', '一个大傻帽')
    },
    // 保留一个原始做法
    sendTotalCnt(){
      this.$emit('getTotalCnt', this.total)
    },
    offBind(){
      // 2.0 报错
      // this.$off('footer')
    }
  }
}
</script>

<style scoped>

</style>