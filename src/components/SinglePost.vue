<template>
<base-card :expandable="post.comments && post.comments.length > 0">
  <template v-slot:header>
    <h3>{{postTitle(post)}}</h3>
  </template>
  <div class="text-wrapper">Say：{{post.post }}</div>
  <template v-slot:footer>
    <base-card v-for="comment in post.comments" :key="comment.id" :expandable="false">
      <template v-slot:header>
        <h3>{{ postTitle(comment) }}</h3>
      </template>
      {{ comment.post }}
    </base-card>
  </template>
</base-card>
</template>

<script>
import BaseCard from "@/components/UI/BaseCard";
export default {
  components: { BaseCard },
  props: ["post"],
  name: "SinglePost",
  methods:{
    postTitle(post) {
      return post.user + "@" + post.date;
    }
  }
};
</script>
<style>
.text-wrapper {
  white-space: pre-wrap;
}
</style>