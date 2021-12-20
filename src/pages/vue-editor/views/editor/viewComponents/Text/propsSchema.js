import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem} from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'Text',
    title: '单文本组件',
    description: '用于在页面配置一条文字信息',
    type: 'object',
    required: ['title'],
    properties: {
        title: {
            ...makeTextItem({ title: '文本' })
        },
        animate: {
            ...makeAnimateItem()
        },
        style: {
            ...makeStyleItem(),
            ...{properties: {padding: {default: '20px'}}},
        },
    }
};
