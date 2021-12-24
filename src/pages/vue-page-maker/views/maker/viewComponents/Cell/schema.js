import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem, makeCellItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'Cell',
    title: '图文单元格组件',
    description: '用于在页面配置一个图文混排的卡片',
    type: 'object',
    required: [],
    properties: {
        cell: {
            ...makeCellItem({title:""})
        },
    }
};
