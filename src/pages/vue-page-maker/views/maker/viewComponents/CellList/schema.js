import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'CellList',
    title: '图文混排单元格列表组件',
    description: '用于在页面配置一组图文混排的卡片',
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
        title: {
            ...makeTextItem({ title: '列表标题' })
        },
        column: {
            title: "每行单元格数",
            description: "受屏幕分辨率和单元格最小宽度影响",
            type: "number",
            default: 3,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 1,
            maximum: 6
        },
        width: {
            title: "单元格最小宽度",
            description: "保证单元格在小分辨率屏能正常显示",
            type: "number",
            default: 100,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 10,
            maximum: 1000
        },
        height: {
            title: "单元格最小高度",
            type: "number",
            default: 160,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 10,
            maximum: 1000
        },
        gutter: {
            title: "单元格间距",
            type: "number",
            default: 2,
            "ui:widget": "ElSlider",
            multipleOf: 1,
            minimum: 0,
            maximum: 50
        },
        list: {
            title: "单元格列表",
            type: "array",
            items: {
                ...makeCellItem()
            },
            minItems: 1,
            maxItems: 12,
            uniqueItems: false,
            "ui:options": {
                "showIndexNumber": true
            }
        },
    }
};
