import propsSchema from './schema.js';
const View = () => import('./View.vue');

export default {
    View,
    propsSchema,
    uiSchema: {},
    formProps: {
        labelPosition: "right",
        labelWidth: "0px",
        labelSuffix: "："
    }
};
