import { makeGoodsItem } from '../../fieldComponents/utils';

export default {
    "$schema": "http://json-schema.org/draft-07/schema#",
    id: "GoodsRecommended",
    type: "object",
    title: "商品推荐组件",
    description: "用于在页面配置一组商品",
    properties: {
        vertical: {
            title: "垂直展示",
            type: "boolean",
            default: false,
        },
        width: {
            title: "图片尺寸",
            type: "number",
            default: 200,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 100,
            maximum: 500
        },
        list: {
            title: "商品列表",
            type: "array",
            items: {
                ...makeGoodsItem({title: ''})
            },
            minItems: 1,
            maxItems: 20,
            uniqueItems: true,
            "ui:options": {
                "showIndexNumber": true
            }
        },
    }
};
