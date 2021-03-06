import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'ImageWall',
    title: '图片墙',
    description: '用于在页面配置一组图片',
    type: 'object',
    required: [],
    properties: {
        layout: {
            title: "布局",
            type: "string",
            default: "12,12",
            "ui:widget": "SelectWidget",
            enum: [
                "24",
                "12,12",
                "16,8",
                "8,16",
                "8,8,8",
                "6,12,6",
                "12,6,6",
                "6,6,12",
                "6,6,6,6",
                "4,4,4,4,4,4",
                "24,12,12",
                "24,8,8,8",
                "16,8,8,8,8",
                "8,16,8,8,8",
            ],
            enumNames: [
                "一行 一栏",
                "一行 两栏（1:1）",
                "一行 两栏（2:1）",
                "一行 两栏（1:2）",
                "一行 三栏（1:1:1）",
                "一行 三栏（1:2:1）",
                "一行 三栏（2:1:1）",
                "一行 三栏（1:1:2）",
                "一行 四栏（1:1:1:1）",
                "一行 六栏（1:1:1:1:1:1）",
                "两行 一二栏（2/1:1）",
                "两行 一三栏（3/1:1:1）",
                "两行 二三栏（2:1/1:1:1）",
                "两行 二三栏（1:2/1:1:1）",
            ]
        },
        gutter: {
            title: "栏间距",
            type: "number",
            default: 0,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 0,
            maximum: 20
        },
        width: {
            title: "图片最小宽度",
            description: "保证图片在小分辨率屏能自动换行",
            type: "number",
            default: 100,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 0,
            maximum: 1000
        },
        list: {
            title: "图片列表",
            type: "array",
            items: {
                ...makeImageItem(),
            },
            minItems: 1,
            maxItems: 6,
            uniqueItems: false,
            "ui:options": {
                "showIndexNumber": true
            }
        },
    }
};
