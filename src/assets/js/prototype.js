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
    /*
        * 项目的comfirm弹出框
        * 将element组件里的MessageBox弹框适当封装的方法
        *
        * @param {string} msg 消息内容
        * @param {string} type 消息类型，用于显示图标 可选值有 success / info / warning / error
        * @param {funtion} confirm 确认按钮的回调方法
        * @param {funtion} cancel 取消按钮的回调方法
        */
    Vue.prototype._confirm = function({msg = '暂无内容', type = '', confirm = ()=>{} , cancel = ()=>{}} = {}){
        Vue.prototype.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,
            center: true,
            roundButton:true,
            closeOnClickModal:true,
            showClose:false,
            confirmButtonClass:'confirmButtonClass',
            cancelButtonClass:'cancelButtonClass',
            customClass:'customClass',
        }).then(
            confirm
        ).catch(
            cancel
        );
    }

    /*
    * 项目的alert弹出框
    * 将element组件里的MessageBox弹框适当封装的方法
    *
    * @param {string} msg 消息内容
    * @param {string} type 消息类型，用于显示图标 可选值有 success / info / warning / error
    * @param {funtion} confirm 确认按钮的回调方法
    */
    Vue.prototype._alert = function({title = '提示', msg = '暂无内容', type = '', confirm = ()=>{}} = {}){
        Vue.prototype.$alert(msg, title, {
            confirmButtonText: '确定',
            type: type,
            center: true,
            roundButton:true,
            closeOnClickModal:true,
            showClose:false,
            confirmButtonClass:'confirmButtonClass',
            customClass:'customClass',
            callback:confirm,
        });
    }

    /*
    * 项目的message弹出框
    * 将element组件里的Message弹框适当封装的方法
    * @param {string} type 消息类型，用于显示图标 可选值有 success / info / warning / error
    * @param {string} msg 消息内容
    * @param {funtion} duration 显示时间 默认800
    */
    Vue.prototype._message = function(msg = '暂无内容',{type='info' ,duration = 1200}={}){
        Vue.prototype.$message({
            message : msg ,
            type : type,
            duration : duration
        })
    }

}

export default usePrototype;
