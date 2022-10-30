<template>
  <div class="container">
    <h3>用户信息</h3>
    <!--    user 本页面的计算函数-->
    <h3>用户名:{{ user.email}}</h3>
    <h3>用户描述:{{ user.description }}</h3>
    <post-list :posts="userPosts" title="最近发帖："></post-list>
  </div>
</template>
<script>
import PostList from "@/components/PostList";
export default {
  components: { PostList },
  props: {
    email: { type: String, default: "" }, // 这里是什么时候初始化的呢？ 列表参数？
  },
  data(){
    return{}
  },
  computed: {
    userPosts() {
      console.log("------查询个人所有帖子####");
      return this.$store.getters["posts/userPosts"];
    },
    user() {
      return this.$store.getters["users/getUser"](this.email)
    }
  },
  mounted() {
    // 页面渲染出来以后调用
    this.$store.dispatch("users/addUserByEmail", {email: this.email});
    // 页面渲染出来以后调用 -- 页面数据存储
    this.$store.dispatch("posts/getAllPostsByUserId", {
      user_id: this.$store.getters["users/getUser"].user_id,
    });
  }
};
</script>