import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../fieldComponents/utils';

export default {
    schema: {
        type: 'object',
        required: [],
        properties: {
            device: {
                title: '适配设备',
                type: 'boolean',
                default: true,
                'ui:options': {
                    activeText: '手机',
                    inactiveText: '电脑'
                },
                'ui:hidden': true
            },

            width: {
                title: '页面宽度',
                type: 'string',
                default: '97%'
            },

            hheight: {
                title: '页头高度',
                type: 'number',
                default: '200',
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
                ...{properties: {backgroundColor: {default: '#900'}}},
            },

            gstyle: {
                title: '全局样式',
                type: 'string',
                'ui:options': {
                    placeholder: '请输入 css 的 渐变色 样式, before 的 border 加灰色边框',
                    type: 'textarea'
                }
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
