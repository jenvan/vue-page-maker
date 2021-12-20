/**
 * Created by Liu.Jun on 2019/9/29 15:29.
 */

// bootstrap
import 'demo-common/bootstrap.js';
import Vue from 'vue';
import elementUI from 'demo-common/components/ElementUi/index.js';
import animated from 'animate.css'

import './vue-editor.css';
import router from './router';
import routerGuards from './router/guards';
import App from './App';


Vue.use(elementUI);
Vue.use(animated);

// 添加路由守卫
routerGuards(router); // 路由守卫

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
