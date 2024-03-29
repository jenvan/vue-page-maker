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
    title = '文本',
    placeholder = '请输入文字内容',
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
    title = '图片',
    placeholder = '请选择或输入图片地址',
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
                    placeholder: '请输入图片链接或留空'
                }
            },
            backgroundColor: {
                name: '背景颜色',
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
                name: '背景图像位置',
                type: 'string',
                default: 'top left',
                'ui:options': {
                    placeholder: 'top left'
                }
            },
            backgroundRepeat: {
                name: '背景重复',
                type: 'string',
                default: 'repeat',
            },
            backgroundAttachment: {
                name: '背景滚动',
                type: 'string',
                default: 'scroll',
            },
        },
        required: `${required}`
    };
}

export function makeAnimateItem({
    fold = false,
    title = '动效',
    required = []
} = { }) {
    return {
        'ui:field': 'AnimateField',
        'ui:fold': fold,
        title: `${title}`,
        type: 'object',
        properties: {
            animateName: {
                name: '动效名称',
                type: 'string',
                default: '',
            },
            animateDelay: {
                name: '延时执行',
                type: 'string',
                default: '',
            },
            animateDuration: {
                name: '执行速度',
                type: 'string',
                default: '',
            },
            animateRepeat: {
                name: '执行次数',
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
    title = '样式',
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
                name: '背景颜色',
                type: 'string',
                default: '',
            },
            backgroundImage: {
                name: '背景图像',
                type: 'string',
                default: '',
            },
            backgroundPosition: {
                name: '背景图像位置',
                type: 'string',
                default: 'top left',
                'ui:options': {
                    placeholder: 'top left'
                }
            },
            backgroundRepeat: {
                name: '背景重复',
                type: 'string',
                default: 'repeat',
            },
            backgroundAttachment: {
                name: '背景滚动',
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
    title = '图文单元格',
    required = []
} = { }) {
    return {
        'ui:field': 'CellField',
        title: `${title}`,
        type: 'object',
        properties: {
            direction: {
                name: '布局方向',
                type: 'string',
                default: 'row',
            },
            size: {
                name: '图片尺寸',
                type: 'number',
                default: 50,
            },
            image: {
                name: '图片',
                type: 'object',
                default: {}
            },
            text1: {
                name: '文字1',
                type: 'object',
            },
            text2: {
                name: '文字2',
                type: 'object',
            },
            text3: {
                name: '文字3',
                type: 'object',
            },
            link: {
                name: '文字链接',
                type: 'string',
                default: '',
            },
            animate: {
                name: '动效',
                type: 'object',
                default: {},
            },
            style: {
                name: '样式',
                type: 'object',
                default: {},
            },
        },
        required: `${required}`
    };
}


export function makeGoodsItem({
    title = '商品单元格',
    required = []
} = { }) {
    return {
        'ui:field': 'GoodsField',
        title: `${title}`,
        type: 'object',
        properties: {
            image: {
                name: '图片',
                type: 'object',
                default: {}
            },
            title: {
                name: '标题',
                type: 'string',
            },
            label: {
                name: '卖点',
                type: 'string',
            },
            price: {
                name: '售卖价',
                type: 'number',
            },
            price_slash: {
                name: '划线价',
                type: 'number',
            },
            extra: {
                name: '扩展字段',
                type: 'object',
            },
        },
        required: `${required}`
    };
}
