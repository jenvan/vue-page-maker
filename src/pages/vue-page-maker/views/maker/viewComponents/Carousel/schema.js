import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'Carousel',
    title: '图文轮播',
    description: '用于在页面配置一组图文跑马灯',
    type: 'object',
    required: [],
    properties: {
        bgcolor: {
            title: "组件背景",
            type: "string",
            default: "",
            "ui:labelWidth": "100px",
            "ui:widget": "el-color-picker",
        },
        isCard: {
            title: "卡片形式",
            type: "boolean",
            default: false,
        },
        isFull: {
            title: "横向铺满",
            type: "boolean",
            default: false,
        },
        height: {
            title: "图片高宽比例",
            description: "图片高度和宽度的千分比（‰）",
            type: "number",
            default: 1,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 1,
            maximum: 1000
        },
        list: {
            title: "图文列表",
            type: "array",
            items: {
                type: "object",
                required: [],
                properties: {
                    image: makeImageItem(),
                    label: {
                        "title": "标题",
                        "type": "string",
                    },
                    text: makeTextItem({title: "描述", required: []}),
                }
            },
            minItems: 2,
            maxItems: 10,
            uniqueItems: true,
            "ui:options": {
                "showIndexNumber": true
            }
        },
    }
};
