//此js定义VUE原型链上的方法
import Vue from 'vue'
import axios from 'axios' //axios

let usePrototype = () =>{

    Vue.prototype.$http = axios;
    //需要使用axios的其他组件调用时可以通过两种方法
    //Vue.$http.get(`url${params}`)
    //this.$http.get(`url${params}`)
    //但是这样使用会出现一个问题，在单独的js文件中这样做调用不了$http,原因是没有Vue的实例。大多数情况下用这种方法就可以满足大部分需求了
}

export default usePrototype;
