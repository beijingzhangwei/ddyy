export default {
    namespaced: true,
    state: {
        loadedUsers: []
    },
    mutations: {
        ADD_USER(state, user) {
            // 新的user overwrite 历史存储 by username
            if (state.loadedUsers.some(u => u.email === user.email)) {
                state.loadedUsers.splice(
                    state.loadedUsers.indexOf(u => u.email === user.email),
                    1
                );
            }
            state.loadedUsers.push(user);
        }
    },
    actions: {
        async addUser(context, {user_id}) {
            return fetch("https://ddyydy.tk/ddyy-b/api/users/" + user_id, {
                headers: {
                    Authorization: context.rootGetters["auth/getTokenHeader"]
                },
                method: "GET"
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
        },
        async addUserByEmail(context, {email}) {
            return fetch("https://ddyydy.tk/ddyy-b/api/user_by_email/" + email, {
                method: "GET"
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
            console.log("----qemailemailemailemailemailemailemailemailemailemailemail==" + email);
            if (state.loadedUsers.some(user => user.email === email)) {
                console.log(state.loadedUsers.find(user => user.email === email));
                return state.loadedUsers.find(user => user.email === email);
            }else{
                return  {
                    "email":"？？？？？",
                    "description":"description?????",
                }
            }
        }
    }

};