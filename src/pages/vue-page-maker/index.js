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

Vue.prototype.$host = process.env.NODE_ENV === "production" ? "//api.fuchijihua.com" : "//app.fuchijihua.com";
Vue.prototype.$http = http;
http.defaults.baseURL = Vue.prototype.$host + "/maker";

Vue.prototype.$forward = function(action, id, name) {
    let query = router.currentRoute.query;
    let path = action;
    if (typeof id != "undefined") {
        path += (path.indexOf("?") > -1 ? "&" : "?") + (id.length > 0 ? "id=" + id : (query["id"] ? "id=" + query["id"] : ""));
    }
    if (typeof name != "undefined"){
        path += (path.indexOf("?") > -1 ? "&" : "?") + (name.length > 0 ? "name=" + name : (query["name"] ? "name=" + query["name"] : ""));
    }
    console.log("-=> forward:", path);
    return router.push(path);
}
Vue.prototype.$redirect = function(link) {
    if (typeof link != "string" || link.length == 0 || document.querySelector(".editMode") != null)
        return ;
    console.log("-=> redirect:", link);
    if (link.substring(0, 4) == "http")
        return window.open(link, "_blank");
    if (/^[\w]{20,}$/.test(link))
        return this.$forward("", link);
    if (/^[\w]{1,10}$/.test(link))
        return this.$forward("", "", link);
    return router.push(link);
};
