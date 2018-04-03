import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user:{
            nick_name:'vuex',
            head_img:'path'
        }
    },
    mutations: {
        setUserInfo(state,name,img_path){
            state.user.nick_name = name;
            state.user.head_img = img_path;
        }
    },
    getters: {
        getUserInfo(state) {
            return state.user;
        }
    }
});

export default store;