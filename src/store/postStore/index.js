import user from "@/views/User";

function getFormattedDate() {
    var d = new Date();

    d =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + d.getDate()).slice(-2) +
        " " +
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2) +
        ":" +
        ("0" + d.getSeconds()).slice(-2);

    return d;
}
export default {
    namespaced: true,
    state: {
        posts: [],
        one_user_posts: [],
    },

    mutations: {
        ADD_POST(state, post) {
            state.posts.push(post);
        },
        SET_ALL_POSTS(state, posts) {
            state.posts = posts;
        },
        SET_ONE_USER_POSTS(state, posts) {
            state.one_user_posts = posts;
        },
        DELETE_POST(state, post_id) {
            state.posts = state.posts.filter(post => post.post_id != post_id);
        },
        SET_POST_COMMENTS(state, { postId, post }) {
            const oldPost = state.posts.find(post => post.post_id == postId);
            oldPost.comments = post.comments;
        },
        DELETE_COMMENT(state, { postId, comments }) {
            const oldPost = state.posts.find(post => post.post_id == postId);
            oldPost.comments = comments;
        },
    },
    actions: {
        async addPost(context, post) {
            // console.log(JSON.stringify(post));
            fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: context.rootGetters["auth/getTokenHeader"]
                },
                body: JSON.stringify(post)
            })
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.body);
                    }
                    return response.json();
                })
                .then(data => {
                    context.commit("ADD_POST", data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async deletePost(context, {post}) {
            fetch("http://localhost:3000/api/posts/" + post.post_id, {
                headers: {
                    "Content-Type": "application/json",
                    // 鉴权请求需要携带token 去请求
                    Authorization: context.rootGetters["auth/getTokenHeader"]
                },
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) {
                        console.log(response);
                        context.commit("DELETE_POST", post.post_id);
                        return;
                    }
                    throw Error(response);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async addComment(context, { postId, comment }) {
            fetch("http://localhost:3000/api/posts/" + postId + "/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: context.rootGetters["auth/getTokenHeader"]
                },
                body: JSON.stringify(comment)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else throw Error(response.body);
                })
                .then(data => {
                    context.commit("SET_POST_COMMENTS", { postId: postId, post: data });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async getAllPosts(context) {
            fetch("http://localhost:3000/api/posts")
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error(response.body);
                    }
                })
                .then(data => {
                    console.log(data);
                    context.commit("SET_ALL_POSTS", data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async getAllPostsByUserId(context, {user_id}) {
            fetch("http://localhost:3000/api/one_user_posts/" + user_id, {
                method: "GET",
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error(response.body);
                    }
                })
                .then(data => {
                    console.log(data);
                    context.commit("SET_ONE_USER_POSTS", data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async deleteComment(context, {comment}) {
            fetch("http://localhost:3000/api/comments/" + comment.comment_id + "/del", {
                headers: {
                    "Content-Type": "application/json",
                    // 鉴权请求需要携带token 去请求
                    Authorization: context.rootGetters["auth/getTokenHeader"]
                },
                method: "POST"
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw Error(response);
                })
                .then(data => {
                    console.log(data);
                    context.commit("DELETE_COMMENT", { postId: comment.post_id, comments: data });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    getters: {
        allPosts(state) {
            return state.posts;
        },
        // 此处应该查询db
        // userPosts: state => user_id => {
        //     return state.posts.filter(post => post.post_author.user_id === user_id);
        // }
        // 有没有并发问题呢？
        userPosts(state) {
            return state.one_user_posts;
        }
    }
};