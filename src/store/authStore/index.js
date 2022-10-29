export default {
    namespaced: true,
    state: {
        user: {
            email: "",
            loggedIn: false,
            token: "",
            user_id: 0,
            description:''
        }
    },
    mutations: {
        LOGIN(state, { email, token , user_id, description}) {
            state.user.loggedIn = true;
            state.user.email = email;
            state.user.token = token;
            state.user.user_id = user_id;
            state.user.description = description;
        },
        LOGOUT(state) {
            state.user.loggedIn = false;
            state.user.email = "";
            state.user.token = "";
            state.user.user_id = "";
            state.user.description = '';
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
                        {email: data.email, token: data.token, user_id: data.user_id, description: data.description});
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
                    { email: email, token: data.token, description: data.description});
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