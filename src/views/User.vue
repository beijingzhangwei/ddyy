<template>
  <div class="container">
    <h3>用户信息</h3>
    <h3>用户名:{{ user.username }}</h3>
    <h3>用户描述:</h3>
    <p>{{ user.description }}</p>
    <post-list :posts="userPosts" title="最近发帖："></post-list>
  </div>
</template>
<script>
import PostList from "@/components/PostList";
export default {
  components: { PostList },
  props: {
    username: { type: String, default: "" } // 这里是什么时候初始化的呢？ 列表参数？
  },
  computed: {
    userPosts() {
      console.log("-----###组件computed时-userPosts###username==" + this.$store.getters["posts/userPosts"](this.user.username));
      return this.$store.getters["posts/userPosts"](this.user.username);
    },
    user() {
      console.log("-----###组件computed时-user###username==" + this.$store.getters["users/getUser"](this.username));
      return this.$store.getters["users/getUser"](this.username);
    }
  },
  mounted() {
    console.log("-----###组件mounted时###-----username=" + this.username);
    this.$store.dispatch("users/addUser", {username: this.username});
  }
};
</script>