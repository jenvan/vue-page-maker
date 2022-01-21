import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'Cell',
    title: '图文混排单元格组件',
    description: '用于在页面配置一个图文混排的卡片',
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
            ...makeTextItem({ title: '单元格标题' })
        },
        cell: {
            ...makeCellItem({title:"单元格内容"})
        },
    }
};
