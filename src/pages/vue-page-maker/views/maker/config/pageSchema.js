import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../fieldComponents/utils';

export default {
    schema: {
        type: 'object',
        required: [],
        properties: {
            fitMobile: {
                title: '优先适配手机',
                type: 'boolean',
                default: true,
                'ui:hidden': true
            },

            title: {
                title: '页面标题',
                type: 'string',
                default: ''
            },
            name: {
                title: '页面名称',
                type: 'string',
                default: ''
            },
            template: {
                title: '页面模板（要包含的其他子页面的名称）',
                type: 'string',
                default: ''
            },
            width: {
                title: '页面宽度',
                type: 'string',
                default: '98%'
            },
            mwidth: {
                title: '页面最大宽度',
                type: 'string',
                default: '1190px'
            },
            hheight: {
                title: '页头高度（px）',
                type: "number",
                default: 200,
                "ui:widget": "ElSlider",
                multipleOf: 1,
                minimum: 100,
                maximum: 600
            },
            heffect: {
                title: '页头效果',
                type: 'string',
                default: 'inside',
                'ui:widget': 'SelectWidget',
                enum: [
                    'none',
                    'inside',
                    'outside',
                ],
                enumNames: [
                    '无',
                    '内凹',
                    '外凸',
                ]
            },
            hstyle: {
                ...makeImageItem({title: "页头背景", isBackground: true}),
                ...{properties: {backgroundColor: {default: ''}}},
            },
        }
    },
    uiSchema: {},
    formFooter: {
        okBtn: '设置',
        cancelBtn: '还原'
    },
    formProps: {
        inlineFooter: true,
        labelPosition: 'top',
        labelSuffix: '：'
    }
};
