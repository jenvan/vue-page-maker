import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'NavGrid',
    title: '宫格导航组件',
    description: '用于在页面配置一组按照宫格方式排列的导航按钮',
    type: 'object',
    required: [],
    definitions: {
        item: {
            title: "",
            type: "object",
            properties: {
                image: {
                    ...makeImageItem({title:"导航图标"})
                },
                text: {
                    ...makeTextItem({title:"导航文字", hasLink: true})
                },
            },
            required: [
                "image",
                "text"
            ]
        }
    },
    properties: {
        width: {
            title: "每格宽度",
            type: "number",
            default: 100,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 1,
            maximum: 200
        },
        gutter: {
            title: "图标间距",
            type: "number",
            default: 3,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 0,
            maximum: 20
        },
        list: {
            title: "",
            type: "array",
            items: {
                "$ref": "#/definitions/item"
            },
            minItems: 4,
            maxItems: 20,
            uniqueItems: false,
            "ui:options": {
                "showIndexNumber": true
            }
        },
    }
};
