export default {
    namespaced: true,
    state: {
        user: {
            email: "",
            loggedIn: false,
            token: "",
            user_id: 0,
        }
    },
    mutations: {
        LOGIN(state, { email, token , user_id}) {
            state.user.loggedIn = true;
            state.user.email = email;
            state.user.token = token;
            state.user.user_id = user_id;
        },
        LOGOUT(state) {
            state.user.loggedIn = false;
            state.user.email = "";
            state.user.token = "";
            state.user.user_id = "";
        }
    },
    actions: {
        async login(context, {email, password}) {
            return fetch("https://ddyydy.tk/ddyy-b/api/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email   : email,
                    password: password
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Cannot login!");
                    }
                    return response.json();
                }).then(data => {
                    context.commit("LOGIN",
                        {email: data.email, token: data.token, user_id: data.user_id});
                }).catch(error => {
                    context.commit("LOGOUT");
                    throw error;
                });
        },
        async logout(context) {
            context.commit("LOGOUT");
        },
        async signup(context, { email, password }) {
            return fetch("https://ddyydy.tk/ddyy-b/api/auth/create-user", {
                method: "POST",
                body: JSON.stringify(
                    { email: email, password: password , nickname: "nick:" + new Date().getTime(), description: "des："+ new Date().getTime()})
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Cannot signup!");
                }
                return response.json();
            }).then(data => {
                context.commit("LOGIN",
                    { email: email, token: data.token, });
            }).catch(error => {
                context.commit("LOGOUT");
                error.read().then((data, done) => {
                    throw Error(data);
                });
            });
        }
    },
    getters: {
        currentUser(state) {
            return state.user;
        },
        isLoggedIn(state) {
            if (!state.user) return false;
            return state.user.loggedIn;
        },
        getTokenHeader(state) {
            return "Bearer " + state.user.token;
        }
    }
};