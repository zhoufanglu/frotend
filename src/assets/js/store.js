import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user:{
            nick_name:'vuex',
            head_img:'path'
        },
        is_login:false
    },
    mutations: {
        setUserInfo(state,name,img_path){
            state.user.nick_name = name;
            state.user.head_img = img_path;
        },
        setLoginState(state,status){
            state.is_login = status;
            window.localStorage.setItem('is_login',status);
        }
    },
    getters: {
        getUserInfo(state) {
            return state.user;
        },
        getLoginState(state) {
            return state.is_login;
        }
    }
});

export default store;