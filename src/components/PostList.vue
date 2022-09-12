<template>
  <div class="post-list">
    <signle-post v-for="post in posts" :key="post.id" :post="post">

    </signle-post>
  </div>
</template>

<script>
import SinglePost from "@/components/SinglePost";
export default {
  components: { SinglePost },
  props: ["posts"]
};
</script>
<style></style>