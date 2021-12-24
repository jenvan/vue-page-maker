import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './views/maker/css/bootstrap.css';
import animated from 'animate.css'

import router from './router.js';
import http from './http.js'
import App from './App';

Vue.use(animated);

const {
    Loading,
    MessageBox,
    Message
} = ElementUI;

Vue.use(ElementUI);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;

Vue.prototype.$host = "//app.fuchijihua.com";
Vue.prototype.$http = http;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');


http.defaults.baseURL = Vue.prototype.$host + "/maker";
