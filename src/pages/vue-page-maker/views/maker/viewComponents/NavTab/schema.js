import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'NavTab',
    title: '底部导航组件',
    description: '用于在页面底部配置一组导航按钮',
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
                    ...makeTextItem({title:"导航文字", content: "导航", hasLink: true})
                },
            },
            required: [
                "image",
                "text"
            ]
        }
    },
    properties: {
        height: {
            title: "导航高度",
            type: "number",
            default: 3,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 40,
            maximum: 200
        },
        gutter: {
            title: "图标文字间距",
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
            minItems: 3,
            maxItems: 6,
            uniqueItems: false,
            "ui:options": {
                "showIndexNumber": true
            }
        },
    }
};
