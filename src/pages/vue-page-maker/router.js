import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/:action(view|edit|new)?',
        name: 'maker',
        component: () => import('./views/maker/Main.vue'),
        props: route => ({ action: route.params.action, id: route.query.id }),
    },
    {
        path: '*',
        hidden: true,
        redirect: { name: 'maker' }
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes: [...routes],
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

router.afterEach((to, from) => {
    const baseTitle = 'VUE-PAGE-MAKER';
    if (to.meta.title) {
        document.title = `${to.meta.title} | ${baseTitle}`;
    }
});

export default router;
