//此js定义VUE原型链上的方法
import Vue from 'vue'
import axios from 'axios'
import {post,fetch,patch,put} from '@/assets/js/http'             //axios封装
import store from "@/assets/js/store"                             //vuex
let usePrototype = () =>{
    Vue.prototype.$store = store;
    Vue.prototype.$state = store.state;
    Vue.prototype.$http = axios;
    //定义全局变量
    Vue.prototype.$post = post;
    Vue.prototype.$fetch = fetch;
    Vue.prototype.$patch = patch;
    Vue.prototype.$put = put;
    Vue.prototype.$imgPath = 'http://10.7.5.35/';
    //Vue.prototype.$imgPath = 'http://111.230.100.91/teachep/public/';
    /**
     * 请求头设置
     */
    /*Vue.prototype._axios = axios.create({
        headers: {
            'Content-Type': 'application/json',
            timeout: 3000,
        },
    });*/
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

    /*
        * 多个ajax函数的请求方法（对Vue.prototype._ajax的简单封装）
        *
        * 封装目的：多个ajax函数的请求方法时加载动画会在第一个回调中被关闭掉。
        * 这样不符合逻辑，加载框需要在最后一个回调中被关闭掉，未了实现这个目的，我使用了Promise.all()方法；
        *
        *
        * 用法参考如下：
        *   this._allAjax([{
        *       url : '/apis/evaluation/schedules',
        *       params : {
        *       },
        *       success : (data)=>{
        *           console.log(data);
        *       },
        *       fail : (err)=>{
        *           console.log(err);
        *       },
        *   },{
        *       url : '/apis/evaluation/schedules',
        *       params : {
        *       },
        *       success : (data)=>{
        *           console.log(data);
        *       },
        *       fail : (err)=>{
        *           console.log(err);
        *       },
        * }])
        *
        */
    /*Vue.prototype.$PromiseAllAjax = function (arr,fn,type) {
        Promise.all(arr.map(i=>{
                return new Promise(
                    function (resolve, reject) {
                        Vue.prototype.$fetch({
                            url : i.url,
                            params : i.params,
                            success : (data,loading)=>{
                                i.success(data);
                                resolve(loading);
                            },
                            fail : (err,loading)=>{
                                i.fail(err);
                                resolve(loading);
                            },
                            testDelay : i.testDelay,
                            showLoadingClose :false,
                        })
                    })
            })
        ).then(function (results) {
            for (var x=0; x<results.length; x++) {
                if(results[x]){
                    results[x].close();
                    break ;
                }
            }
            fn && fn();
        });
    }*/


}

export default usePrototype;
