<template>
  <div class="app-bar">
    <div class="left-links">
      <router-link v-for="link in activeLinks" :key="link.name" :to="link.to" class="app-bar-item">
        {{ link.name }}
      </router-link>
    </div>
    <div class="right-links ">
      <router-link class="app-bar-item" href="#" v-if="!loggedIn" @click.prevent :to="{ name: 'Login' }">登录</router-link>
      <a class="app-bar-item" href="#" v-if="loggedIn" @click.prevent="logoutButtonClicked">退出</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions({
      login: "auth/login", // map `this.login()` to `this.$store.dispatch('auth/login')`
      logout: "auth/logout"
    }),
    logoutButtonClicked() {
      this.logout().then(() => {
        this.$router.push({name: "Login"});
      });
    }
  },
  computed: {
    ...mapGetters({loggedIn: "auth/isLoggedIn"}),
    links() {
      return [
        {
          visibleIfLoggedOut: true,
          name: "博文",
          to: { name: "Posts" }
        },
        {
          visibleIfLoggedOut: false,
          name: "我的",
          to: {
            name: "User",
            params: {
              email: this.currentUser
            }
          }
        }
      ];
    },
    currentUser() {
      const user = this.$store.getters["auth/currentUser"];
      if (user) {
        return user.email;
      }
      return "";
    },
    activeLinks() {
      return this.links.filter(
          link => link.visibleIfLoggedOut || this.loggedIn
      );
    }
  }
};
</script>

<style scoped>
.app-bar {
  height: 5vh;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: burlywood;
  overflow: hidden;
  display: block;
  justify-content: space-between;
}
.left-links {
  padding-left: 10%;
}
.left-links a {
  float: left;
}

a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.right-links {
  float: right;
}
</style>