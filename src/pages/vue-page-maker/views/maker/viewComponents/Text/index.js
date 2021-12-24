import propsSchema from './propsSchema';
import uiSchema from './uiSchema.js';

const View = () => import('./View.vue');

export default {
    View,
    propsSchema,
    uiSchema: {}
};
