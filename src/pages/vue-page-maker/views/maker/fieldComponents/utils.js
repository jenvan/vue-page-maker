import {
    vueUtils,
    formUtils,
    schemaValidate
} from '@lljj/vue-json-schema-form';

export function importComputedFn(arr) {
    const fn = {};
    arr.forEach((field) => {
        fn[field] = {
            get() {
                return this.get(field);
            },
            set(value) {
                if (/color/i.test(field) && value == null) {
                    value = "";
                }
                this.set(field, value);
            }
        };
    });
    return fn;
}

export function importMethodsFn() {
    return {
        getProp(prop, field) {
            const options = {
                schema: (field ? this.schema.properties[field] : this.schema) || {},
                uiSchema: (field ? this.uiSchema[field] : this.uiSchema) || {}
            };
            const result = formUtils.getUiOptions(options);
            return result[prop] || '';
        },
        get(field) {
            const obj = vueUtils.getPathVal(this.rootFormData, this.curNodePath);
            return typeof obj[field] !== 'undefined' ? obj[field] : this.getProp('default', field);
        },
        set(field, value) {
            vueUtils.setPathVal(this.rootFormData, vueUtils.computedCurPath(this.curNodePath, field), value);
        },
        validator(rule, value, callback) {
            let errors = [];
            const validProperties = Object.keys(this.$props.schema.properties);
            const isValidate = validProperties.every((item) => {
                errors = schemaValidate.validateFormDataAndTransformMsg({
                    formData: value[item],
                    schema: this.$props.schema.properties[item],
                    errorSchema: this.$props.errorSchema[item],
                    required: this.$props.schema.required.includes(item),
                    customFormats: this.$props.customFormats,
                    propPath: this.$props.curNodePath
                });
                return errors.length <= 0;
            });
            if (isValidate) { return callback(); }
            return callback(errors[0].message);
        },
    };
}


export function makeTextItem({
    title = '??????',
    placeholder = '?????????????????????',
    content = '',
    color = '',
    hasLink = false,
    required = []
} = { }) {
    return {
        'ui:field': 'TextField',
        title: `${title}`,
        type: 'object',
        properties: {
            text: {
                type: 'string',
                default: `${content}`,
                'ui:options': {
                    placeholder
                }
            },
            color: {
                type: 'string',
                default: `${color}`
            },
            fontSize: {
                type: 'string',
                default: '1em'
            },
            fontWeight: {
                type: 'string',
                default: '400'
            },
            lineHeight: {
                type: 'string',
                default: '150%'
            },
            textAlign: {
                type: 'string',
                default: 'left'
            },
            link: {
                type: 'string',
                default: '',
                'ui:hidden': !hasLink,
            },
        },
        required: `${required}`
    };
}

export function makeImageItem({
    title = '??????',
    placeholder = '??????????????????????????????',
    isBackground = false,
    required = []
} = { }) {
    return {
        'ui:field': 'ImageField',
        title: `${title}`,
        type: 'object',
        properties: {
            image: {
                type: 'string',
                default: '',
                'ui:options': {
                    placeholder
                }
            },
            link: {
                type: 'string',
                default: '',
                'ui:options': {
                    placeholder: '??????????????????????????????'
                }
            },
            backgroundColor: {
                name: '????????????',
                type: 'string',
                default: '',
                'ui:hidden': !isBackground,
            },
            backgroundImage: {
                type: 'string',
                default: '',
                'ui:hidden': true,
            },
            backgroundPosition: {
                name: '??????????????????',
                type: 'string',
                default: 'top left',
                'ui:options': {
                    placeholder: 'top left'
                }
            },
            backgroundRepeat: {
                name: '????????????',
                type: 'string',
                default: 'repeat',
            },
            backgroundAttachment: {
                name: '????????????',
                type: 'string',
                default: 'scroll',
            },
        },
        required: `${required}`
    };
}

export function makeAnimateItem({
    fold = false,
    title = '??????',
    required = []
} = { }) {
    return {
        'ui:field': 'AnimateField',
        'ui:fold': fold,
        title: `${title}`,
        type: 'object',
        properties: {
            animateName: {
                name: '????????????',
                type: 'string',
                default: '',
            },
            animateDelay: {
                name: '????????????',
                type: 'string',
                default: '',
            },
            animateDuration: {
                name: '????????????',
                type: 'string',
                default: '',
            },
            animateRepeat: {
                name: '????????????',
                type: 'string',
                default: '',
            },
        },
        required: `${required}`
    };
}

export function makeStyleItem({
    fold = false,
    cell = false,
    title = '??????',
    required = []
} = { }) {
    return {
        'ui:field': 'StyleField',
        'ui:fold': fold,
        'ui:cell': cell,
        title: `${title}`,
        type: 'object',
        properties: {
            backgroundColor: {
                name: '????????????',
                type: 'string',
                default: '',
            },
            backgroundImage: {
                name: '????????????',
                type: 'string',
                default: '',
            },
            backgroundPosition: {
                name: '??????????????????',
                type: 'string',
                default: 'top left',
                'ui:options': {
                    placeholder: 'top left'
                }
            },
            backgroundRepeat: {
                name: '????????????',
                type: 'string',
                default: 'repeat',
            },
            backgroundAttachment: {
                name: '????????????',
                type: 'string',
                default: 'scroll',
            },

            borderStyle: {
                type: 'string',
                default: 'solid',
                'ui:hidden': true,
            },
            borderColor: {
                type: 'string',
                default: ''
            },
            borderWidth: {
                type: 'string',
                default: '0px',
            },
            borderRadius: {
                type: 'string',
                default: '0px'
            },
            
            margin: {
                type: 'string',
                default: '0px'
            },
            padding: {
                type: 'string',
                default: '0px'
            },
            textAlign: {
                type: 'string',
                default: 'center'
            },
        },
        required: `${required}`
    };
}


export function makeCellItem({
    title = '???????????????',
    required = []
} = { }) {
    return {
        'ui:field': 'CellField',
        title: `${title}`,
        type: 'object',
        properties: {
            direction: {
                name: '????????????',
                type: 'string',
                default: 'row',
            },
            size: {
                name: '????????????',
                type: 'number',
                default: 50,
            },
            image: {
                name: '??????',
                type: 'object',
                default: {}
            },
            text1: {
                name: '??????1',
                type: 'object',
            },
            text2: {
                name: '??????2',
                type: 'object',
            },
            text3: {
                name: '??????3',
                type: 'object',
            },
            link: {
                name: '????????????',
                type: 'string',
                default: '',
            },
            animate: {
                name: '??????',
                type: 'object',
                default: {},
            },
            style: {
                name: '??????',
                type: 'object',
                default: {},
            },
        },
        required: `${required}`
    };
}


export function makeGoodsItem({
    title = '???????????????',
    required = []
} = { }) {
    return {
        'ui:field': 'GoodsField',
        title: `${title}`,
        type: 'object',
        properties: {
            image: {
                name: '??????',
                type: 'object',
                default: {}
            },
            title: {
                name: '??????',
                type: 'string',
            },
            label: {
                name: '??????',
                type: 'string',
            },
            price: {
                name: '?????????',
                type: 'number',
            },
            price_slash: {
                name: '?????????',
                type: 'number',
            },
            extra: {
                name: '????????????',
                type: 'object',
            },
        },
        required: `${required}`
    };
}
