<template>
  <button v-if="seen" @click="increment" class="access_button">
    <div id="bt" v-bind:title="message + ':你是第' +state.count+'位访问的幸运用户！！！'">
      鼠标放上有惊喜 <br/>
    </div>
    <!--    算数*2：{{ state.double }}-->
  </button>

  <!--v-on 点击事件-->
  <div v-if="seen" id="show_me:v-on" class="m-3 p-3 border border-success">
    <h3>{{ message }}</h3>
    <button class="btn btn-success" v-on:click="reverseMessage">反转字符串</button>
  </div>
  <!--v-model 双向绑定-->
  <div v-if="seen" id="show_me:v-model" class="m-3 p-3 border border-success">
    <h3>{{ message }}</h3>
    <input class="form-control" v-model="message"/>
  </div>
  <!--v-if 控制显示-->
  <div v-if="seen" id="show_me:v-if" class="m-3 p-3 border border-success">
    <p>
      <button class="btn btn-success" v-on:click="this.seen = !this.seen">
        隐藏 {{ !this.seen }}
      </button>
    </p>
    <div v-if="seen"> 看到我了吗？</div>
  </div>
  <!--  v-for 循环一个数组-->
  <div v-if="seen" id="show_me:v-for" class="m-3 p-3 border border-success">
    <button class="btn btn-success" v-on:click="this.seen = !this.seen">
      今天的预定
    </button>
    <hr>
    <ol>
      <!--      li == list-->
      <li v-for="todo in todos" v-if="seen">
        {{ todo.content }}
      </li>
    </ol>
  </div>
  <!--  插值语法-->
  <div v-if="seen" id="show_me:insert-value" class="m-3 p-3 border border-success">
    <h3>插值语法</h3>
    <span class="text-primary">{{ message }}</span>

    <h3>插值语法-只渲染一次</h3>
    <span v-once class="text-danger">{{ message }}</span>
    <button class="btn btn-success" v-on:click="this.message = '变天了'">
      改变Message
    </button>

    <!--原始html  有安全隐患-->
    <hr>
    <h3>原始HTML - v-html</h3>
    {{ rawHtml }}
    <br>
    <span v-html="rawHtml"></span>

    <!--    绑定属性 - v-bind:xxx-->
    <h3>绑定属性 - v-bind:xxx</h3>
    <button v-bind:disabled="isDisabledButton" v-on:click="this.isDisabledButton=true" class="btn btn-info">
      按我一下下
    </button>
  </div>

  <!--  v-bind:attr -> :attr   v-on:xx -->
  <div v-if="seen" id="show_me:simple_syn" class="m-3 p-3 border border-success">
    <h3>属性绑定</h3>
    <a v-bind:href="ddyy" class="link" target="_blank">多悦欢乐</a>
    <!-- 简写    target="_blank"  新的页面打开 -->
    <a :href="ddyy" class="link" target="_top">多悦欢乐</a>
    <a :href="ddyy" class="link" target="_parent">多悦欢乐</a>
    <a :href="ddyy" class="link" target="_self">多悦欢乐</a>

    <h3>事件绑定</h3>
    <button class="btn btn-success" v-on:click="buyPS100(1)">
      买PS100
    </button>
    <!-- 简写-->
    <button class="btn btn-success" @click="buyPS100(0)">
      买PS100
    </button>
  </div>

  <!--  computed -->
  <div v-if="seen" id="show_me:simple_syn" class="m-3 p-3 border border-success">
    <h3>今天要做的事情</h3>
    <ol>
      <li v-for="todo in todos">{{ todo }}</li>
    </ol>
    <div class="lead"> 今天总共要做 <b class="text-danger">{{ todayNeedTodosCount }}</b></div>
  </div>

  <!--  检测属性变化-->
  <div id="show_me:watch" class="m-3 p-3 border border-success">
    <p>
      时间戳转换
      <input v-model="question" placeholder='秒级时间戳'/> {{ answer }}
    </p>
  </div>

  <!--  样式单绑定-->
  <div v-if="seen" id="show_me:css-boot" class="m-3 p-3 border border-success">
    <div class="text-danger border display-5">编译发布</div>
    <hr>
    <div :class="{'text-danger': isLoveCBA, 'birder': isLoveCBA, 'display-5':isLoveCBA}">我爱CBA</div>
    <button @click="this.isLoveCBA=!this.isLoveCBA" class="btn btn-info">❤️CBA?</button>
    <hr>
    <div :class="cssCtrCBA">我爱CBA</div>
    <button @click="this.cssCtrCBA=this.cssTitle" class="btn btn-info">❤️CBA!</button>
    <div :style="cssNBAStyle">我爱BCC</div>
  </div>
  <!--  循环对象-->
  <div v-if="seen" id="show_me:v-for-obj" class="m-3 p-3 border border-success">
    <div class="text-danger border display-5">循环对象</div>
    <ul>
      <li v-for="(val, title, i) in game_sfv">{{i+1}}:{{title}}-->{{val}}</li>
    </ul>
  </div>

  <!--  form event v-for 综合 循环子组件-->
  <div id="show_me:v-for-form-total" class="m-3 p-3 border border-success">
    <form v-on:submit.prevent="addNewTodo">
      <label for="new-todo">添加todo：</label>
      <input v-model="nextTodoText" id="new-todo" placeholder="例如：一起吃鸡"/>
      <button>添加</button>
    </form>
    <hr/>
    <ul class="p-3">
      <!--      @remove="todos.splice(index,1) 接受子组件的事件并处-->
      <todo-item v-for="(todo,index) in todos" :key="todo.id" :title="todo.content"
                 @remove="todos.splice(index,1)"></todo-item>
    </ul>
  </div>

  <!--  继续学习 ToDo https://www.youtube.com/watch?v=DPmscg3Ggko&list=PLliocbKHJNwuozzzF3gWnRjVOrX1tA9k5&index=19-->

</template>

<script>
import {computed, reactive} from "vue"; // 交互 和 计算属性
import TodoItem from "@/components/test/TodoItem";

export default {
  name: "MyButton",
  components: {TodoItem},
  data() {
    return {
      message: 'work hard, play hard!',
      seen: false,
      nextTodoText: '',
      todos: [
        {content: '睡觉', id: 1},
        {content: '洗刷', id: 2},
        {content: '吃饭', id: 3},
        {content: '跑步', id: 4},
      ],
      nextTodoId: 4,
      rawHtml: '<b class=text-danger>恒大衰落了</b>',
      isDisabledButton: false,
      ddyy: 'https://ddyydy.tk',
      question: '',
      answer: '',
      isLoveCBA: false,
      cssCtrCBA: {},
      cssTitle: {
        'text-danger': true,
        'border': true,
        'display-5': true,
      },
      cssNBAStyle: {
        color: 'red',
        fontSize: '36px'
      },
      game_sfv: {
        name: "Streat Fighter 5",
        platform: "PS4",
        developer: "Capcom",
        release: "2019/09/01",
        genre: "格斗",
      },

    }
  },
  watch: {
    question(newQuestion, oldQuestion) {
      if (newQuestion !== oldQuestion) {
        this.answer = this.timestampToTime(newQuestion)
      }
    }
  }
  ,
  computed: {                     // 计算属性（谨慎使用，只是一个辅助工具，业务计算不要使用）  99.9%是只读的 对象属性cache住，作为对象的一个属性，缓存起来
    todayNeedTodosCount() {       // 函数类似
      return this.todos.length
    }
  },
  setup() {
    const state = reactive({ // 响应式函数
          count: 0,                // 数值属性（初始化值）
          double: computed(() => state.count * 2) // 计算属性 永远乘以2
        }
    );

    function increment() {
      state.count++;
    }

    return {
      state,
      increment // 返回，即可使用
    };
  },
  methods: {    // 函数，动态实时计算
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    buyPS100(buy) {
      buy === 1 ? alert("买买买！！！") : alert("不买，不买，不买")
    },
    addNewTodo(){
      this.todos.push({
        id: this.nextTodoId++,
        content: this.nextTodoText
      })
      this.nextTodoText=''
    }
    ,
    timestampToTime(timestamp) {
      if (timestamp <= 2147483648) {
        timestamp = timestamp * 1000
      }

      var date = new Date(timestamp);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  }
};
</script>

<style scoped>
.access_button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  collapse: #553030;
  margin-top: 10px;
}

#bt {
  background: url("../../assets/bg.jpeg");
  width: 100%;
  height: 100%;
  position: center;
  background-size: 100% 100%;
}
</style>