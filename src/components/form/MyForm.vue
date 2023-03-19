<template v-if="n>=0">
  <div>收集表单数据</div>

  <div v-if="1" id="root">
    <form @submit.prevent="demo">
      <label for="demo">账号：</label>
<!--  v-model= 收集输入框的value值    -->
      <input type="text" id="demo" v-model.trim="userInfo.account"> <br/> <br/>
      <label for="mima">密码：</label>
      <input type="password" id="mima" v-model.trim="userInfo.password"> <br/> <br/>
      <label for="age">年龄：</label>
      <input type="number" id="age" v-model.number="userInfo.age"> <br/> <br/>
      性别：
      <!--  v-model= 收集输入框的value值 所以需要指定value   -->
      男<input type="radio" name="sex"  v-model='userInfo.sex' value="male">
      女<input type="radio" name="sex"  v-model='userInfo.sex' value="female">  <br/> <br/>
      爱好：
      学习<input type="checkbox" v-model='userInfo.hobby' value="study">
      打游戏<input type="checkbox" v-model='userInfo.hobby' value="game">
      睡觉<input type="checkbox" v-model='userInfo.hobby' value="sleep"> <br/> <br/>
      所属校区
      <select  v-model="userInfo.city">
        <option value="请选择校区"></option>
        <option value="beijing" >北京</option>
        <option value="shanghai">上海</option>
        <option value="wuhan" >武汉</option>
        <option value="shenzhen">深圳</option>
      </select>
      <br/> <br/>
      其他信息：
      <textarea v-model.lazy="userInfo.other"></textarea> <br/> <br/>
      <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="https://ddyydy.tk">《用户协议》</a>
<!--      表单提交，跳转-->
      <button>提交</button>
    </form>
  </div>

</template>

<script>

export default {
  name: 'MyForm',
  data() {
    return {
      userInfo:{
        account:'',
        password:'',
        sex:'female',
        hobby:[],
        city:'beijing',
        other:'',
        agree:false,
        age:0,
      }
    }
  },
  methods: {
    demo(){
      // alert('恭喜提交成功！')
      // json 格式数据提交到后端
      console.log(JSON.stringify(this.userInfo))
    }
  },
  computed:{

  },
  watch: {

  }
}
</script>
