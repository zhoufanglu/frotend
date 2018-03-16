//此js定义VUE原型链上的方法
import Vue from 'vue'
import axios from 'axios'
import {post,fetch,patch,put} from '@/assets/js/http'             //axios封装

let usePrototype = () =>{

    Vue.prototype.$http = axios;
    //定义全局变量
    Vue.prototype.$post = post;
    Vue.prototype.$fetch = fetch;
    Vue.prototype.$patch = patch;
    Vue.prototype.$put = put;
    /**
     * 请求头设置
     */
    Vue.prototype._axios = axios.create({
        headers: {
            'Content-Type': 'application/json',
            timeout: 3000,
        },
    });
}

export default usePrototype;
