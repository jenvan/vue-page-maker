import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'CellList',
    title: '图文单元格列表组件',
    description: '用于在页面配置一组图文混排的卡片',
    type: 'object',
    required: [],
    properties: {
        column: {
            title: "每行栏数",
            type: "number",
            default: 12,
            "ui:widget": "SelectWidget",
            enum: [
              24,
              12,
              8,
              6,
              4,
            ],
            enumNames: [
              "一栏",
              "二栏",
              "三栏",
              "四栏",
              "六栏",
            ]
        },
        gutter: {
            title: "栏间距",
            type: "number",
            default: 2,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 0,
            maximum: 20
        },
        list: {
            title: "",
            type: "array",
            items: {
                ...makeCellItem()
            },
            minItems: 1,
            maxItems: 10,
            uniqueItems: false,
            "ui:options": {
                "showIndexNumber": true
            }
        },
    }
};
