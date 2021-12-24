import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'Carousel',
    title: '图文跑马灯',
    description: '用于在页面配置一组图文跑马灯',
    type: 'object',
    required: [],
    properties: {
        isCard: {
            title: "卡片形式",
            type: "boolean",
            default: false,
        },
        height: {
            title: "图片高度",
            type: "number",
            default: 120,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 100,
            maximum: 500
        },
        list: {
            title: "图文列表",
            type: "array",
            items: {
                type: "object",
                required: [],
                properties: {
                    image: makeImageItem(),
                    text: makeTextItem({title: "描述", required: []}),
                    label: {
                        "title": "标题（非卡片形式不显示）",
                        "type": "string",
                    },
                }
            },
            minItems: 2,
            maxItems: 6,
            uniqueItems: true,
            "ui:options": {
                "showIndexNumber": true
            }
        },
    }
};
