import { makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem } from '../../fieldComponents/utils';

export default {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "id": "NavTop",
    "type": "object",
    "title": "顶部导航组件",
    "description": "用于在页面顶部配置导航菜单",

    "definitions": {

        "item": {
            "type": "object",
            "properties": {
                "text": {
                    "title": "标题",
                    "type": "string",
                    "default": "test",
                    'ui:labelWidth': '60px',
                },
                "link": {
                    "title": "链接",
                    "type": "string",
                    "default": "test",
                    'ui:labelWidth': '60px',
                }
            }
        },
        
        "node": {
            "title": "一级菜单",
            "type": "object",
            "properties": {
                "self": {
                    "$ref": "#/definitions/item"
                },
                "children": {
                    "title": "二级菜单",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/item"
                    }
                }
            }
        }
        
    },
    "properties": {
        "height": {
            "title": "导航高度",
            "type": "number",
            "default": 10,
            "ui:widget": "ElSlider",
            'ui:labelWidth': '100px',
            "multipleOf": 1,
            "minimum": 5,
            "maximum": 20
        },
        "bgcolor": {
            "title": "背景颜色",
            "type": "string",
            "format": "color",
            "default": "#000",
            'ui:labelWidth': '100px',
        },
        "fgcolor": {
            "title": "文字颜色",
            "type": "string",
            "format": "color",
            "default": "#409EFF",
            'ui:labelWidth': '100px',
        },
        "logo": {
            ...makeImageItem({ title: '', placeholder: '请设置 logo 图标' })
        },
        "list": {
            "type": "array",
            "title": "导航菜单",
            "minItems": 1,
            "maxItems": 8,
            "ui:options": {
                "showIndexNumber": true
            },
            "items": {
                "$ref": "#/definitions/node"
            }
        }
    }
};
