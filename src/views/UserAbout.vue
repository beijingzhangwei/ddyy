<template>
  <div class="container">
    <h1>{{ user.username }}</h1>
    <p>{{ user.description }}</p>
    <post-list :posts="posts" title="Last Posts">
    </post-list>
  </div>
</template>
<script>
import PostList from "@/components/PostList";
export default {
  components: { PostList },
  data() {
    return {
      user: {
        username: "多多姐姐",
        description: "漂漂亮亮的小仙女"
      },
      posts: [
        {
          id: 2,
          user: "多多姐姐",
          date: "2021-01-19 15:25:20",
          post: "爸爸什么时候回来呢？谁知道呢？",
          comments: [
            {
              id: 3,
              user: "悦悦妹妹",
              date: "2021-01-20 20:30:34",
              post: "多多姐姐你再坚持下！爸爸很快就回来了！！"
            },
          ]
        }
      ]
    };
  }
};
</script>