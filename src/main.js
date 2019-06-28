import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import  VueQuillEditor from 'vue-quill-editor'
import VideoPlayer from 'vue-video-player';
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css';

require('@/assets/css/reset.scss');
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false


Vue.use(ElementUI);
Vue.use(VueQuillEditor)
Vue.use(VideoPlayer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
