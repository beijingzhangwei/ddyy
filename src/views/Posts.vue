<template>
  <div class="posts">
    <h1>多悦-家园</h1>
    <add-text-form textRequest="Add Post" v-if="loggedIn" :showLabel="true" @text-added="addPost"></add-text-form>
    <post-list :posts="posts" title="" ></post-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import PostList from "@/components/PostList";
import AddTextForm from "@/components/AddTextForm";
export default {
  name: "Posts",
  components: {
    PostList,
    AddTextForm
  },
  computed: {
    ...mapGetters({ loggedIn: "auth/isLoggedIn" }),
    posts() {
      return this.$store.getters["posts/allPosts"];
    }
  },
  methods: {
    addPost(text) {
      console.log("------$$$$$$$$####",this.$store.getters["auth/currentUser"].username);
      this.$store.dispatch("posts/addPost", {
        title: "ts:" + new Date().getTime(),
        author_id: this.$store.getters["auth/currentUser"].user_id,
        content: text
      });
    }
  },
  // 挂在时初始化
  mounted() {
    this.$store.dispatch("posts/getAllPosts");
  }
};
</script>
