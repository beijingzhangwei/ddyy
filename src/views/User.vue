<template>
  <div class="container">
    <h3>用户信息</h3>
    <!--    user 本页面的计算函数-->
    <h3>用户名:{{ user.email }}</h3>
    <h3>用户描述:{{ user.description }}</h3>
    <post-list :posts="userPosts" title="最近发帖："></post-list>
  </div>
</template>
<script>
import PostList from "@/components/PostList";
export default {
  components: { PostList },
  props: {
    email: { type: String, default: "" } // 这里是什么时候初始化的呢？ 列表参数？
  },
  computed: {
    userPosts() {
      console.log("------查询个人所有帖子####");
      return this.$store.getters["posts/userPosts"];
    },
    user() {
      console.log("-----###组件computed时（有缓存）-user###email==" + this.$store.getters["users/getUser"](this.email));
      return this.$store.getters["users/getUser"](this.email);
    }
  },
  mounted() {
    // 从存储中获取用户 this.$store.getters["auth/currentUser"]
    console.log("-----###组件mounted时###-----user_id=" + this.$store.getters["auth/currentUser"].user_id);
    this.$store.dispatch("users/addUser", {user_id: this.$store.getters["auth/currentUser"].user_id});
    this.$store.dispatch("posts/getAllPostsByUserId", {
      user_id: this.$store.getters["auth/currentUser"].user_id,
    });
  }
};
</script>