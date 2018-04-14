import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user:{
            nick_name:'vuex',
            head_img:'path',
            is_login:false,
        },
        current:{
            course_id:'',
            chapter_id:'',
            chapter_child_id:'',
        }
    },
    mutations: {
        setUserInfo(state,name,img_path){
            state.user.nick_name = name;
            state.user.head_img = img_path;
        },
        setLoginState(state,status){
            state.user.is_login = status;
        },
        setCourseId(state,course_id){
            state.current.course_id = course_id;
        },
        setChapterId(state,chapter_id){
            state.current.chapter_id = chapter_id;
        },
        setChapterChildId(state,chapter_child_id){
            state.current.chapter_child_id = chapter_child_id;
        },
    },
    getters: {
        getState(state){
            return state;
        },
        getUserInfo(state) {
            return state.user;
        },
        getLoginState(state) {
            return state.is_login;
        },
        getCurrentId(state) {
            return state.current;
        },
        getCourseId(state){
            return state.course_id;
        },
        getChapterId(state){
            return state.chapter_id;
        },
    }
});

export default store;