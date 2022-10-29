<template>
  <div class="container">
    <h3>用户信息 {{user}}</h3>
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
  computed: {
    userPosts() {
      console.log("------查询个人所有帖子####");
      return this.$store.getters["posts/userPosts"];
    },
    user() {
      // console.log("-----###组件mounted时###-----user_id=" + this.$store.getters["auth/currentUser"].user_id);
      // const xx =  this.userFetch(this.email)
      // console.log("----xxxxxxxxxxxxxxxxxxxxxxxxl==" + xx.email);
      return this.$store.getters["auth/currentUser"]
      // return xx;
    }
  },
  methods: {
    async userFetch(email) {
      console.log("----xxxxxxxxxxxxxxxxxxxxxxxxl==" + email);
      const u = await fetch("https://ddyydy.tk/ddyy-b/api/user_by_email/" + email, {
        method: "GET"
      })
          .then(response => {
            if (!response.ok) throw new Error("Cannot get user");
            return response.json();
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
      await u
      console.log("----qqqqqqqqqqqyyyyyyyyyyyyy==" + u);
      console.log("----qqqqqqqqqqqyyyyyyyyyyyyy==" + u.email);
      return u;
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