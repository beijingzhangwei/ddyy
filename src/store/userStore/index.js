export default {
    namespaced: true,
    state: {
        loadedUsers: []
    },
    mutations: {
        ADD_USER(state, user) {
            // 新的user overwrite 历史存储 by username
            if (state.loadedUsers.some(u => u.email == user.email)) {
                state.loadedUsers.splice(
                    state.loadedUsers.indexOf(u => u.email == user.email),
                    1
                );
            }
            state.loadedUsers.push(user);
        }
    },
    actions: {
        async addUser(context, {user_id}) {
            return fetch("http://localhost:3000/api/users/" + user_id, {
                headers: {
                    Authorization: context.rootGetters["auth/getTokenHeader"]
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error("Cannot get user");
                    return response.json();
                })
                .then(data => {
                    context.commit("ADD_USER", data);
                })
                .catch(error => {
                    console.log(error);
                    throw error;
                });
        }
    },
    getters: {
        getUser: state => email => {
            if (state.loadedUsers.some(user => user.email == email)) {
                console.log(state.loadedUsers.find(user => user.email == email));
                return state.loadedUsers.find(user => user.email == email);
            } else {
                //Here I'll have to request from the server!!
                return {};
            }
        }
    }
};