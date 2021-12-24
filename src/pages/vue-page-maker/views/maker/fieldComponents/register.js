import Vue from 'vue';

const ExtraComponents = {
    TextField: () => import('./TextField/Form.vue'),
    TextView: () => import('./TextField/View.vue'),
    ImageField: () => import('./ImageField/Form.vue'),
    ImageView: () => import('./ImageField/View.vue'),
    StyleField: () => import('./StyleField/Form.vue'),
    AnimateField: () => import('./AnimateField/Form.vue'),
    CellField: () => import('./CellField/Form.vue'),
    CellView: () => import('./CellField/View.vue')
};

Object.entries(ExtraComponents).forEach(([key, value]) => {
    Vue.component(key, value);
});
