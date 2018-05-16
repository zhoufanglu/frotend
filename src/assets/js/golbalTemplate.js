/**
 * 全局组件的定义
 */
import Vue from 'vue'

Vue.component('teach-head',require('@/components/templates/teachHead.vue').default);
Vue.component('teach-foot',require('@/components/templates/foot.vue').default);
Vue.component('login-or-register',require('@/components/templates/login_or_register.vue').default);
Vue.component('no-data-panel',require('@/components/templates/no_data_panel').default);
// 第一个是videoJs的样式，后一个是vue-video-player的样式，因为考虑到我其他业务组件可能也会用到视频播放，所以就放在了main.js内
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
