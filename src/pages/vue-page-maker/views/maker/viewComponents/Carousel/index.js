import propsSchema from './schema';

const View = () => import('./View.vue');

export default {
    View,
    propsSchema,
    uiSchema: {}
};
