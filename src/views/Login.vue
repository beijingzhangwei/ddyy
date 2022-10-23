<template>
  <div class="content">
    <base-card>
      <form @submit.prevent>
        <label for="Email">邮箱</label>
        <input id="email" type="text" v-model="email" />
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
        <button @click="loginButtonClicked">{{ buttonString }}</button>
        <p v-if="error">{{ error }}</p>
        <a href="#" @click.prevent="toggleLogin">{{ textLoginString }}</a>
      </form>
    </base-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BaseCard from "@/components/UI/BaseCard";
export default {
  components: { BaseCard },
  data() {
    return {
      loginSelected: true,
      email: "",
      password: "",
      error: "",
      user_id:"",
    };
  },
  methods: {
    ...mapActions({ login: "auth/login", signup: "auth/signup" }),
    loginButtonClicked() {
      if (this.loginSelected) {
        this.login({ email: this.email, password: this.password })
            .then(() => {
              this.$router.push({ name: "Posts" });
            })
            .catch(error => {
              this.error = error;
            });
      } else {
        this.signup({ email: this.email, password: this.password })
            .then(() => {
              this.$router.push({ name: "Posts" });
            })
            .catch(error => {
              this.error = error;
            });
      }
    },
    toggleLogin() {
      this.loginSelected = !this.loginSelected;
    }
  },
  computed: {
    buttonString() {
      if (this.loginSelected) {
        return "LOGIN";
      } else {
        return "SIGNUP";
      }
    },
    textLoginString() {
      if (this.loginSelected) {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    }
  }
};
</script>

<style scoped>
button {
  margin-top: 1rem;
  width: 20rem;
  height: 5rem;
  border-radius: 8px;
  background-color: darksalmon;
  padding: 8px;
}
</style>