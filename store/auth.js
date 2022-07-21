import {login, getUser, logout, isAccountActivated} from "~/api/auth";

export const state = () => ({
    token: null,
    isAuthenticated: false,
    isLoading: false,
    user: null
});

export const actions = {
    async getUser({commit, state}) {
        let res = await getUser(this.$axios);
        commit("setUser", res);
        return res;
    },
    async login({commit, dispatch}, payload) {
        commit("loading");
        let res = await login(this.$axios, payload).catch(e => {
            // isAccountActivated(this.$axios, payload.username).then(res => {
            if (e.response)
                if (e.response.status === 400)
                    this.$toast.error("رمزعبور اشتباه است");
                else if (e.response.status === 403)
                    this.$toast.error("لطفا ابتدا اکانت خود را فعال نمایید");
                else
                    this.$toast.error("لطفا ابتدا ثبت نام کنید");

            // });
        });
        commit("loaded");
        if (res.token) {
            commit("setToken", res);
            dispatch("getUser");
            commit("formStatus/toggleShow", {}, {root: true});
            this.$router.push("/dashboard");
            this.$cookies.set("token", res.token, {
                maxAge: 60 * 60 * 24 * 7,
                path: "/"
            });
        }
    },
    loadUser({commit, dispatch}, token) {
        commit("setToken", token);
        dispatch("getUser");
    },
    async logout({commit}) {
        this.$cookies.remove("token");
        let res = await logout(this.$axios).catch(e => console.log(e));
        commit("removeToken");
        await this.$router.push("/");
    }
};

export const mutations = {
    setUser(state, data) {
        state.user = data;
    },
    setToken(state, {token}) {
        state.token = token;
        if (token) state.isAuthenticated = true;
        this.$axios.setToken(token, "token");
    },
    removeToken(state) {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        this.$axios.setToken(false);
    },
    loading(state) {
        state.isLoading = true;
    },
    loaded(state) {
        state.isLoading = false;
    }
};
