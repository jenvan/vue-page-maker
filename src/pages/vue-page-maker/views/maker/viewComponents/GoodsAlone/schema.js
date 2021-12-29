import { makeStyleItem, makeGoodsItem } from '../../fieldComponents/utils';

export default {
    "$schema": "http://json-schema.org/draft-07/schema#",
    id: "GoodsAlone",
    type: "object",
    title: "商品单元格组件",
    description: "用于在页面配置一个商品",
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
            maximum: 600
        },
        item: {
            ...makeGoodsItem({title:""})
        },
        style: {
            ...makeStyleItem({title:"样式"})
        }
    }
};
