import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user:{
            user_id:'',
            nick_name:'vuex',
            head_img:'path',
            is_login:false,
        },
        current:{
            course_id:'',
            chapter_id:'',
            chapter_child_id:'',
        },
        isShowLoginMask:false,//是否显示登录注册弹窗
        maskType:'login'
    },
    mutations: {
        setIsShowLoginMask(state,status){
            state.isShowLoginMask = status;
        },
        setMaskType(state,type){
            state.maskType = type;
        },
        setUserInfo(state,user_data){
            state.user.user_id = user_data.id,
            state.user.nick_name = user_data.user_name;
            state.user.head_img = user_data.user_headimg;
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