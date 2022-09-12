<template>
  <div class="posts">
    <h1>多悦-家园</h1>
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
export default {
  name: "论坛-多多",
  components: {
    PostList
  },
  data: function() {
    return {
      posts: [
        {
          id: 1,
          user: "idalmasso",
          date: "2021-01-19 15:30:30",
          post:
              "Today I'm feeling sooooo well. I will GO to see a nice Vue!!! (LOL)",
          comments: [
            {
              id: 3,
              user: "Nostradamus",
              date: "2021-01-20 20:30:34",
              post: "LOL"
            },
            {
              id: 4,
              user: "FinnishMan",
              date: "2021-01-20 20:30:34",
              post: "Please..."
            }
          ]
        },
        {
          id: 2,
          user: "cshannon",
          date: "2021-01-19 15:25:20",
          post: "I think that someone make some really   bad puns...",
          comments: [
            {
              id: 3,
              user: "Nostradamus",
              date: "2021-01-20 20:30:34",
              post: "LOL"
            },
          ]
        }
      ]
    };
  }
};
</script>