<template>
<base-card :expandable="post.comments && post.comments.length > 0">
  <template v-slot:header>
    <h3>
      <!--      NOTE 页面路由设置的站位符号，需要完全匹配-->
     <router-link :to="linkUser(post.post_author.email)">{{postTitle(post) }}</router-link>
    </h3>
    <button v-if="loggedIn && currentUser.email === post.post_author.email" class="delete-button"
            @click.prevent="deletePost">Delete</button>
  </template>
  <div id="sp" class="text-wrapper">Say：{{post.content }}</div>
  <template v-slot:footer>
    <base-card v-for="comment in post.comments" :key="comment.comment_id" :expandable="false">
      <template v-slot:header>
        <h3>
          <router-link :to="linkUser(comment.comment_author.email)">{{commentTitle(comment)}}</router-link>
        </h3>
        <button v-if="loggedIn && (currentUser.email === post.post_author.email || currentUser.email === comment.comment_author.email) " class="delete-button"
                @click.prevent="deleteComment(comment)">Delete</button>
      </template>
      {{ comment.content }}
    </base-card>
  </template>
  <template v-if="loggedIn" v-slot:actions>
    <add-text-form textRequest="Add comment" :showLabel="false" @text-added="text => addComment(text, post)"></add-text-form>
  </template>
</base-card>
</template>

<script>
import {mapGetters} from "vuex";
import BaseCard from "@/components/UI/BaseCard";
import AddTextForm from "@/components/AddTextForm";
export default {
  components: { BaseCard, AddTextForm },
  props: ["post"],
  name: "SinglePost",
  computed: {
    ...mapGetters({
      loggedIn: "auth/isLoggedIn",
      currentUser: "auth/currentUser"
    })
  },
  methods: {
    postTitle(post) {
      return post.post_author.email + "  发布于" + post.created_at;
    },
    commentTitle(comment) {
      return comment.comment_author.email + "  点评于" + comment.created_at;
    },
    linkUser(email) {
      return {
        name: "User",
        params: {
          email: email
        }
      };
    },
    addComment(text, post) {
      this.$store.dispatch("posts/addComment", {
        postId: post.post_id,
        comment: {
          post_id: post.post_id,
          email: this.currentUser.email,
          author_id: this.currentUser.user_id,
          content: text
        }
      });
    },
    deletePost() {
      this.$store.dispatch("posts/deletePost", {post: this.post});
    },
    deleteComment(comment) {
      this.$store.dispatch("posts/deleteComment", {comment: comment});
    }
  }
};
</script>
<style>
.text-wrapper {
  white-space: pre-wrap;
}
#sp{
  background: url("../assets/bg.jpeg");
  width: 100%;
  height: 100%;
  position: center;
  background-size: 100% 100%;
}
</style>