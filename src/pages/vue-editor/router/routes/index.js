const routes = [
    {
        path: '/maker',
        name: 'maker',
        component: () => import('../../views/editor/EditorM.vue'),
    },
    {
        path: '*',
        hidden: true,
        redirect: { name: 'maker' }
    }
];

export default routes;
