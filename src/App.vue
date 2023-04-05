<template>
  <div id="app">
    <!--    表单处理 ------------------>
    <!--    <MyHeader :addTodo="addTodo"/>-->
    <!--    <MyList :todos="todos"-->
    <!--            :deleteOneTodo="deleteOneTodo"-->
    <!--            :changeTdoDoneById="changeTdoDoneById"/>-->
    <!--    &lt;!&ndash;    <MyListen :todos="todos" />&ndash;&gt;-->
    <!--    &lt;!&ndash;      ref="footer"        &ndash;&gt;-->
    <!--    &lt;!&ndash;    @clearAllTodo 自定义事件&ndash;&gt;-->
    <!--    <MyFooter :todos="this.todos"-->
    <!--              @getTotalCnt="getTotalCnt"/>-->
    <!--    表单处理------------------ -->

    <!--    网络请求--------------------->
    <!--    <Search/>-->
    <!--    <List/>-->
    <!--    网络请求--------------------->

    <!--    插槽------------------------>
<!--    <hr>-->
<!--    <hr>-->
    <div  class="container">
      <Category title="电影">
        <template v-slot:center class="foot">
          <video controls src="../public/big_buck_bunny.mp4"></video>
        </template>
        <template v-slot:footer >
          <a  class="foot" href="https://ddyydy.tk">更多电影</a>
        </template>
      </Category>
      <Category title="美食">
        <template v-slot:center class="foot">
          <img src="https://img.zcool.cn/community/0198055ab33d70a80120be140429de.JPG@3000w_1l_0o_100sh.jpg"
               alt="">
        </template>
        <template v-slot:footer >
          <a  class="foot" href="https://ddyydy.tk">更多美食</a>
        </template>
      </Category>

      <Category title="游戏">
        <template v-slot:center class="foot">
          <ul>
            <li v-for="(g, index) in games" :key="index">{{ g }}</li>
          </ul>
        </template>
        <template v-slot:footer >
          <div class="foot">
            <a href="https://ddyydy.tk">网络游戏</a>
            <a href="https://ddyydy.tk">单机游戏</a>
          </div>
        </template>
      </Category>

<!--      <Category title="游戏">-->
<!--        <template slot-scope="{games}" class="foot">-->
<!--          <ul>-->
<!--            <li v-for="(g, index) in games" :key="index">{{ g }}</li>-->
<!--          </ul>-->
<!--        </template>-->
<!--      </Category>-->

    </div>
    <Topology/>
    <GifMake/>

    <!--    插槽------------------------>

    <!--    <LightCtr/>-->

    <!--    动画处理--------------->
    <!--    <MovePicV2/>-->
    <!--    动画处理--------------->

    <!--    <my-filter/>-->
    <my-button/>
    <!--    <my-menu/>-->
    <!--    <my-form/>-->
    <hr>
    <the-application-bar></the-application-bar>
<!--    路由器的视图-->
    <router-view class="content"/>
  </div>
</template>
<!--接下来我们在主页的App.vue文件中完成路由加载操作：-->

<script>
import TheApplicationBar from "@/components/UI/TheApplicationBar";
import MyButton from "@/components/test/MyButton"
import MyMenu from "@/components/menu/MyMenu"
import MyForm from "@/components/form/MyForm"
import MyFilter from "@/components/filter/MyFilter"
import MyList from "@/components/todo/MyList"
import MyHeader from "@/components/todo/MyHeader"
import MyFooter from "@/components/todo/MyFooter"
import MyListen from "@/components/todo/MyListen"
import MovePic from "@/components/dynamicPic/MovePic"
import MovePicV2 from "@/components/dynamicPic/MovePicV2"
import GifMake from "@/components/dynamicPic/GifMake"
import LightCtr from "@/components/webreq/LightCtr"
import Search from "@/components/webreq/Search"
import List from "@/components/webreq/List"
import Category from "@/components/category/Category"
import Topology from "@/components/topology/Topology"
import {getCurrentInstance, provide, ref, watch, watchEffect} from "vue";

export default {
  components: {
    MyFooter,
    TheApplicationBar,
    MyButton,
    MyMenu,
    MyFilter,
    MyList,
    MyHeader,
    MyListen,
    MovePic,
    MovePicV2,
    LightCtr,
    Search,
    List,
    Category,GifMake,
    Topology
  },
  // 旧的 2.0 实现方式
  // data(){
  //   return {
  //     todos : JSON.parse(localStorage.getItem("Items")) || []
  //   }
  // },
  // watch: {
  //   // 对象形式
  //   todos: {
  //     deep:true,
  //     handler(value,old) {
  //       console.log('深度监视触发-----> id=' + value)
  //       localStorage.setItem('Items', JSON.stringify(value))
  //     }
  //   }
  // },
  setup() {
    // 2.0+ 会报错
    // this.$refs.footer.$once('atFooter',
    //     this.getTotalCnt )
    // 引用实例
    let todos = ref(JSON.parse(localStorage.getItem("Items")) || [])
    console.log('初始化全局事件总线-----> id=')

    const instance = getCurrentInstance()
    const bus = instance.appContext.config.globalProperties.$bus
    bus.on('bro', (value) => {
      console.log('准备清理所有已经完成的todos-----> ' + value)
      clearAllTodo()
    })
    bus.on('deleteItemEvent', (value) => {
      console.log('事件总线收到删除事件-----> id=' + value)
      todos.value = todos.value.filter((todo) => {
        return todo.id !== value
      })
      console.log('完成删除操作后-----> todos=' + JSON.stringify(todos))
    })
    bus.on('checkAllTodo', (isCheckOrUncheck) => {
      console.log('全选或者反选-----> isCheckOrUncheck=' + isCheckOrUncheck)
      checkAllTodo(isCheckOrUncheck)
    })
    bus.on('updateTodo', (obj) => {
      console.log('事件总线收到编辑事件-----> id=' + obj.id + " title=", obj.title)
      // 修改原数组，不会返回变更后的数组 forEach
      todos.value.forEach((todo) => {
            if (todo.id === obj.id) {
              // console.log("@@@@@"+id)
              todo.title = obj.title
            }
          }
      )
    })

    provide('bus', bus)

    function addTodo(todoObj) {
      console.log('todos列表增加元素-----> todoObj=', JSON.stringify(todoObj))
      todos.value.unshift(todoObj)
    }

    function changeTdoDoneById(id) {
      console.log('changeTdoDoneById app', id)
      todos.value.forEach((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done
        }
      })
    }

    // 组合PAI就是函数 3.0监视对象
    //   todos: {
    //     deep:true,
    //     handler(value,old) {
    //       console.log('深度监视触发-----> id=' + value)
    //       localStorage.setItem('Items', JSON.stringify(value))
    //     }
    //   }
    watch(todos, (value, oldValue) => {
          console.log('监视todos-----> value=', JSON.stringify(value))
          localStorage.setItem('Items', JSON.stringify(value))
        }, {deep: true}
    )

    function deleteOneTodo(id) {
      todos.value = todos.value.filter((todo) => {
        return todo.id !== id
      })
    }

    function checkAllTodo(done) {
      todos.value.forEach((todo) => {
        todo.done = done
      })
    }

    function clearAllTodo() {
      todos.value = todos.value.filter((todo) => {
        return !todo.done
      })
    }

    function getTotalCnt(cnt) {
      console.log('获取到了总的todo数量', cnt)
    }

    let foods = ref(['火锅', '烧烤', '带鱼', '小龙虾', '牛排'])
    let games = ref(['红色警戒', '穿越火线', '劲舞团', '超级玛丽'])
    let films = ref(['《火锅》', '《烧烤》', '《带鱼》', '《迷你》', '《你好，李焕英》'])
    return {
      todos, addTodo, changeTdoDoneById, deleteOneTodo, getTotalCnt,
      foods, games, films
    }
  }
}
</script>

<style>

#app {
  /*background: url("./assets/bg.jpeg");*/
  width: 100%;
  height: 100%;
  position: center;
  background-size: 100% 100%;
}

/*body {*/
/*  margin: 0;*/
/*  font-family: Arial, Helvetica, sans-serif;*/
/*}*/

/*.content {*/
/*  padding-top: 5.5vh;*/
/*  padding-left: 10%;*/
/*}*/

.btn-edit {
  color: #139be1;
  background-color: #2c3e50;
  border: 1px solid #553030;
  margin-right: 5px;
}

.container, .foot {
  display: flex;
  /*中间间距 缝隙*/
  justify-content: space-around;
}

img {
  display: block;
  margin: 0 auto;
  width: 55%;
  height: 60%;
  align-items: center;
}

video {
  width: 100%;
  height: 50%;
}
</style>