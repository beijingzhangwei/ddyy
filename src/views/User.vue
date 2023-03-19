<template>
  <div class="container">
    <ul>
      <li>
        <h5>用户信息</h5>
        <h5>用户名:{{ user.email}}</h5>
        <h5>用户描述:{{ user.description }}</h5>
      </li>
      <post-list :posts="userPosts" title="最近发帖："></post-list>
    </ul>

  </div>
</template>
<script>
import PostList from "@/components/PostList";
export default {
  components: { PostList },
  props: {
    email: { type: String, default: "" }, // 通过站位符 param传递进来 组件参数传递
  },
  data(){
    return{}
  },
  computed: {
    userPosts() {
      // 当前用户
      if (this.email === this.$store.getters["auth/currentUser"].email) {
       return this.$store.getters["posts/myPosts"]
      }
      // 其他作者
      return this.$store.getters["posts/userPosts"];
    },
    user() {
      console.log("用户点击了我的@###@@####@@##",this.email)
      if (this.email === this.$store.getters["auth/currentUser"].email) {
        return this.$store.getters["auth/currentUser"]
      }
      return this.$store.getters["users/getUser"](this.email)
    }
  },
  beforeMount() {
    console.log('beforeMount------>invoked@@@@')
    this.$store.dispatch("users/addUserByEmail", {email: this.email});
    this.$store.dispatch("posts/getAllPostsByEmail",{email: this.email});
    // 我的发帖
    if (this.email !== this.$store.getters["auth/currentUser"].email){
      this.$store.dispatch("posts/getAllPostsByEmail",{email: this.$store.getters["auth/currentUser"].email});
    }
  }
};
</script>