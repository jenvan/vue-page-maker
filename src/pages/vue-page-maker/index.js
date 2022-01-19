import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './views/maker/css/bootstrap.css';
import animated from 'animate.css'

import router from './router.js';
import http from './http.js'
import App from './App';

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

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

Vue.prototype.$host = process.env.API_BASE_URL;
Vue.prototype.$http = http;
http.defaults.baseURL = Vue.prototype.$host + "/maker";

Vue.prototype.$redirect = function(link) {
    if (typeof link != "string" || link.length == 0 || document.querySelector(".editMode") != null)
        return ;
    console.log("-=>", link);
    if (link.substring(0, 4) == "http")
        return window.open(link, "_blank");
    return router.push(link);
};
