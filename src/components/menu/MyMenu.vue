<template v-if="n>=0">
<!--    <div v-for="(item, index) in items" :key="index" class="menu-item">-->
<!--      <hr>-->
<!--      <hr>-->
<!--      <hr>-->
<!--      <span @click="toggleChildren(item)">{{ item.name }}</span>-->
<!--      <div v-if="isOpen(item)" class="children-container">-->
<!--        <div v-for="(chilItem, chilIndex) in item.children" :key="chilIndex" class="menu-item">-->
<!--          <span>{{ chilItem.name }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  <div v-if="0" id="root">
    姓：<input type="text" v-model="firstname"> <br><br>
    名: <input type="text" v-model="lastname">  <br><br>
    姓名：<span>{{fullName}}</span>

    <h2>今天天气{{info}}</h2>
    <button @click="changeWeather">切换天气</button>
    <button @click="isHot=!isHot; window.alert('(哈哈')">切换天气</button>
    <h2>当前n的值{{n}}</h2>
    <button @click="n++">计数器加1</button>
    <button @click.once="add"> 添加一个老刘</button>
<!--    遍历列表-->
    <ul>
<!--      key的正确使用方式：使用逻辑数据id 内存中的虚拟dom对比 根据key值一一比较-->
<!--      不一样的地方重新生成（虚拟dom->真实dom） index为列表序号，0，1，2，3...-->
<!--      p.id 为逻辑唯一id-->
      <input type="text" placeholder="输入s搜索模糊词" v-model="keyword">
      <button @click="sortType=1">升序</button>
      <button @click="sortType=2">降序</button>
      <button @click="sortType=0">原顺序</button>
      <li v-for="(p,index) in resultPerson" :key="p.id">
<!--      <li v-for="(p,index) in persons" :key="index"> 有问题-->
        {{p.name}}-{{p.age}}--{{index}}
        <input type="text">
      </li>
    </ul>
    <button @click="addSex">添加老刘性别</button>
    <h2 v-if="laoliu.sex">老刘性别 {{laoliu}}</h2>
<!--    遍历对象-->
<!--    <ul>-->
<!--      &lt;!&ndash;      <li v-for="(p,index) in persons" :key="p.id">&ndash;&gt;-->
<!--      <li v-for="(value,key) in persons[0]" :key="key">-->
<!--        {{key}}-&#45;&#45;{{value}}-->
<!--      </li>-->
<!--    </ul>-->
<!--    遍历字符串-->
<!--    <ul>-->
<!--      &lt;!&ndash;      <li v-for="(p,index) in persons" :key="p.id">&ndash;&gt;-->
<!--      <li v-for="(value,key) in persons[0].name" :key="key">-->
<!--        {{key}}-&#45;&#45;{{value}}-->
<!--      </li>-->
<!--    </ul>-->

  </div>

</template>

<script>

export default {
  name: 'MyMenu',
  data() {
    return {
      sortType:0,
      keyword:'',
      laoliu:{
        id:"004",name:"老刘", age:33
      },
      persons:[
        {id:"001",name:"张三", age:10},
        {id:"002",name:"张四", age:11},
        {id:"003",name:"王五", age:12},
      ],
      resultPerson:[],
      n:0,
      window,
      isHot:true,
      firstname:'',
      lastname:'',
      openMap: {
        1: true
      },
      items: [{
        id: 1,
        name: '一级菜单1',
        children: [{
          id: 11,
          name: '二级菜单1-1',
        }, {
          id: 12,
          name: '二级菜单1-2',
        }, {
          id: 13,
          name: '二级菜单1-3',
        }],
      }, {
        id: 2,
        name: '一级菜单2',
        children: [{
          id: 21,
          name: '二级菜单2-1',
        }, {
          id: 22,
          name: '二级菜单2-2',
        }, {
          id: 23,
          name: '二级菜单2-3',
        }],
      }],
    }
  },
  methods: {
    addSex(){
      // this.$set(this.laoliu,'sex','男')  3.0不适用了
    },
    add(){
      this.persons.unshift(this.laoliu)
    },
    changeWeather(){
      this.isHot = !this.isHot
    },
    toggleChildren(item) {
      if (this.isOpen(item)) {
        this.$delete(this.openMap, item.id);
      } else {
        this.$set(this.openMap, item.id, true);
      }
    }
    ,
    isOpen(item) {
      return this.openMap[item.id];
    }
    ,
  },
  computed:{
    fullName(){
      console.log(this)
      return this.firstname + this.lastname
    },
    info(){
      return this.isHot?'炎热':'寒冷'
    },
    // 列表排序 -- 一切逻辑在计算属性中
    resultPerson() {
      const arr = this.persons.filter((p) => {
        return p.name.indexOf(this.keyword) != -1
      })
      if (this.sortType) {
        arr.sort((a, b) => {
          return this.sortType == 1 ? a.age - b.age : b.age - a.age
        })
      }
      return arr
    }
  },
  watch: {
    isHot: {
      handler(nv, ov) {
        window.alert("被改了" + nv + ov)
      }
    },
    // 监视器方式实现
    // keyword: {
    //   immediate: true,
    //   handler(searchWord) {
    //     this.resultPerson = this.persons.filter((p) => {
    //       return p.name.indexOf(searchWord) != -1
    //     })
    //   }
    // }
  }
}
</script>

<style>
.root{
  text-align: center;
}
</style>