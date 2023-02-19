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
    <h2>亲，请提交你的问题（等我回复可能需要1分钟左右...耐心等我）</h2>
    <input class="name" type="text" placeholder="请输入你想问AI的问题" v-model="inputStr">
    <p><input type="button" value="提交" @click="showAnswer"></p>
    <h4>AI回答</h4>
    <div>
<!--      cols="150" rows="20"-->
      <textarea  :style="style" v-model="aiAnswer"/>
<!--      <div>{{ output }}</div>-->
    </div>

  </div>

  <div class="m-3 p-3 border border-success">
    <input type="button" @click="lightSwitch" value="卧室灯控开关">
    <!--    <img alt="light logo"  src="../../assets/close.jpeg">-->
    <!--    <img alt="light logo"  :src=this.imgList[imgIdx]>-->
    <img v-if="imgIdx===0" alt="light logo" src="../../assets/close.jpeg">
    <img v-if="imgIdx===1" alt="light logo" src="../../assets/open.jpeg">
    <!--    src="../../assets/close.jpeg"-->
  </div>

  <div v-if="seen" id="show_me:reaPackage" class="m-3 p-3 border border-success">
    <p>
      随机红包数量
      <input v-model="redSize" placeholder='红包数量'/>
      随机红包金额
      <input v-model="money" placeholder='红包大小'/>
    </p>
    <ul>
      <li v-for="my in moneyList">{{ my.value }}</li>
    </ul>
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
      <li v-for="(val, title, i) in game_sfv">{{ i + 1 }}:{{ title }}-->{{ val }}</li>
    </ul>
  </div>

  <!--  form event v-for 综合 循环子组件-->
  <div v-if="seen" id="show_me:v-for-form-total" class="m-3 p-3 border border-success">
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
import TodoItem from "@/components/test/TodoItem";
// import currency from "currency.js";

export default {
  name: "MyButton",
  components: {TodoItem},
  refs: {
    preCode: null
  },
  data() {
    return {
      style: {
        width: '100%',
        height: '50vh'
      },
      imgList: ["../assets/close.jpeg", "../assets/open.jpeg"],
      imgIdx: 0,
      switchCount: 0,
      aikey: '',
      inputStr: '',
      aiAnswer: '',
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
      money: 0,
      redSize: 0,
      moneyList: [],
    }
  },
  watch: {
    question(newQuestion, oldQuestion) {
      if (newQuestion !== oldQuestion) {
        this.answer = this.timestampToTime(newQuestion)
      }
    },
    money(newMoney, oldMoney) {
      if (newMoney !== oldMoney) {
        this.moneyList = this.getRandomMoney(newMoney)
      }
    },
    redSize(newSize, oldSize) {
      if (newSize !== oldSize) {
        this.moneyList = this.getRandomMoney(this.money)
      }
    }
  }
  ,
  computed: {                     // 计算属性（谨慎使用，只是一个辅助工具，业务计算不要使用）  99.9%是只读的 对象属性cache住，作为对象的一个属性，缓存起来
    todayNeedTodosCount() {       // 函数类似
      return this.todos.length
    },
    // output() {
    //   // 如果文本输入中检测到 JavaScript 代码片段，则对其进行格式化输出
    //   if (/const|let|var|function/.test(this.aiAnswer)) {
    //     let formatter = new Intl.NumberFormat("en-US", {
    //       maximumFractionDigits: 2
    //     });
    //     // prettier-ignore
    //     try {
    //       let scriptString = this.aiAnswer;
    //       return JSON.stringify(eval(scriptString), null, 2).replace(/\n/g, "<br>");
    //     } catch (err) {
    //       return err;
    //     }
    //   }
    //   // 否则，将文字直接输出
    //   else return this.aiAnswer;
    // }

  },
  methods: {
    async showAnswer() {
      await this.showKey()
      const {Configuration, OpenAIApi} = require("openai");
      const configuration = new Configuration({
        apiKey: this.aikey,
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 4000,
        prompt: this.inputStr,
      });
      this.aiAnswer = completion.data.choices[0].text
    },
    async lightSwitch() {
      const res = await fetch('https://ddyydy.tk/ddyy-b/switch_light', {
        method: 'GET',
      })
      let switchData = await res.json()
      this.imgIdx = parseInt(switchData.switchCount) % 2
    },
    async showKey() {
      // 使用 await / async 提交到服务器
      const res = await fetch('https://ddyydy.tk/ddyy-b/ai/qa', {
        method: 'POST',
        body: JSON.stringify({ai_input: this.inputStr})
      })
      // 若服务器正常返回， result 为 true
      let aiData = await res.json()
      this.aikey = aiData.answer
    },
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    buyPS100(buy) {
      buy === 1 ? alert("买买买！！！") : alert("不买，不买，不买")
    },
    getRandomMoney(newMoney) {
      const JPY = value => currency(value, {precision: 2, symbol: '￥'})

      let tmpRedSize = this.redSize;
      const totalPeople = this.redSize;
      let tmpNewMoney = newMoney;
      const that = this
      if (tmpRedSize === 0 || newMoney === '0' || newMoney === 0) {
        return ''
      }
      that.moneyList = [{value: "结果"}]
      const min = JPY(0.01)
      if (JPY(newMoney) < min.multiply(tmpRedSize)) {
        console.log("金额不足------", totalPeople);
        that.moneyList.push({value: "金额不足"})
        return that.moneyList
      }

      let remainMoney = JPY(tmpNewMoney)

      if ('1' === totalPeople) {
        // console.log("只有一个红包啊",totalPeople);
        that.moneyList.push({value: JPY(remainMoney).format()})
        return that.moneyList
      }

      for (let i = 0; i < totalPeople; i++) {

        if (1 === totalPeople - i) {
          console.log("last one", totalPeople);
          that.moneyList.push({value: JPY(remainMoney).format()})
          return that.moneyList
        }

        const random = Math.random()

        const max = remainMoney.divide(tmpRedSize * 2)

        let curMoney = max.multiply(random);
        if (curMoney < min) {
          curMoney = min
        }
        console.log("第", i, curMoney);

        tmpRedSize--
        remainMoney = remainMoney.subtract(curMoney)
        that.moneyList.push({value: JPY(curMoney).format()})
      }
      return that.moneyList
    },
    addNewTodo() {
      this.todos.push({
        id: this.nextTodoId++,
        content: this.nextTodoText
      })
      this.nextTodoText = ''
    },
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
  },
  /**
   * 根据类型，标识对应的高亮样式
   * @param {*} codeText
   */
  higlightCls(codeText) {
    const codeTpl = codeText.trim()
    let className = 'hljs'

    if (codeTpl.indexOf('<') === 0) {
      className = 'html xml'
    } else if (codeTpl.indexOf('let') === 0) {
      className = 'javascript'
    } else if (codeTpl.indexOf('#include') === 0) {
      className = 'cpp'
    } else if (codeTpl.indexOf('func') === 0) {
      className = 'go'
    } else if (codeTpl.indexOf('def') === 0) {
      className = 'python'
    }
    return className
  },
  /**
   * 生成对应的高亮代码
   */
  createCode() {
    if (!this.preCode) {
      return
    }
    window.hljs.highlightBlock(this.preCode)
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

.name {
  width: 100%;
  height: 30px;
  border: 1px solid #139be1;
  border-radius: 5px;
  color: blue;
  font-size: 15px;
  font-weight: bold;
  background-color: #faf1d8;
  text-indent: 10px;
}

.hljs {
  background: #fbfdbb;
  padding: 0.5em;
  font-size: 1.3em;
}

</style>