<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="post-list" v-if="showPosts">
      <single-post v-for="post in posts" :key="post.post_id" :post="post">
      </single-post>
    </div>
  </div>
</template>

<script>
import SinglePost from "@/components/SinglePost";
export default {
  components: { SinglePost },
  props: ["posts", "title"],
  computed: {
    showPosts() {
      return this.posts && this.posts.length > 0;
    }
  }
};
</script>
<style></style>