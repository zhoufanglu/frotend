//axios 拦截器设置
import {Loading, Message} from 'element-ui';
import axios from 'axios';

let loadinginstace;
axios.defaults.timeout = 5000;
// http请求拦截器
axios.interceptors.request.use(config => {
    // element ui Loading方法
    loadinginstace = Loading.service({fullscreen: true})
    //console.log('加载前',);
    return config
}, error => {
    loadinginstace.close();
    Message.error({
        message: '加载超时'
    })

    console.log('加载超时');
    return Promise.reject(error)
});
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
    //console.log('成功关闭结束',);
    loadinginstace.close();
    return data
}, error => {
    loadinginstace.close();
    Message.error({
        message: '加载失败'
    });

    return Promise.reject(error)
});

export default axios
