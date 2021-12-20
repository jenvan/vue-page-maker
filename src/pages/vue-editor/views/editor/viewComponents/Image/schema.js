import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem } from '../../fieldComponents/utils';

export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'Image',
    title: '单图片组件',
    description: '用于在页面配置一张图片',
    type: 'object',
    required: ['image'],
    properties: {
        image: {
            ...makeImageItem({ title: '图片' })
        },
        animate: {
            ...makeAnimateItem({ title: '动效' })
        },
        style: {
            ...makeStyleItem()
        },
    }
};
