// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/common/element_modify.scss';
Vue.use(ElementUI);


//全局scss-在util中引入了---common.scss
//定义全局components
import '@/assets/js/golbalTemplate.js'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
