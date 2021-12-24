/**
 * Created by Liu.Jun on 2020/3/31 11:30 上午.
 */

import { getDefaultFormState } from '@lljj/vue-json-schema-form';
import { genId } from './utils/id';
import { isEmptyObject } from './utils/obj';

export function deepFreeze(obj) {
    // 取回定义在obj上的属性名
    const propNames = Object.getOwnPropertyNames(obj);

    // 在冻结自身之前冻结属性
    propNames.forEach((name) => {
        const prop = obj[name];

        // 如果prop是个对象，冻结它
        if (typeof prop === 'object' && prop !== null) deepFreeze(prop);
    });

    // 冻结自身(no-op if already frozen)
    return Object.freeze(obj);
}

// 初始化配置数据并返回所有组件
export function getComponentsAndInitToolsConfig(configTools) {
    // 平铺开所有组
    const componentList = configTools.reduce((preVal, curVal) => [
        ...preVal,
        ...curVal.componentList
    ], []);

    // 注册组件结构
    const data = componentList.reduce((preVal, { componentPack }) => {
        // 修改原数据
        // 生成 From组件和View组件 Name
        const needViewName = !componentPack.componentViewName;
        const needFormName = componentPack.Form && !componentPack.componentFormName;

        // 需要生成viewName 或者 formName
        if (needViewName || needFormName) {
            const id = ((componentPack.propsSchema && (componentPack.propsSchema.id || componentPack.propsSchema.$id)) || genId());
            if (needViewName) componentPack.componentViewName = `View${id}`;
            if (needFormName) componentPack.componentFormName = `Form${id}`;
        }

        if (componentPack.componentFormName) {
            preVal[componentPack.componentFormName] = componentPack.Form;
        }
        preVal[componentPack.componentViewName] = componentPack.View;

        Object.freeze(componentPack);
        return preVal;
    }, {});


    // 冻结配置数据
    Object.freeze(configTools);
    return data;
}

// 生成一个新的editor item
export function generateEditorItem(toolItem) {
    const currentComponentPack = toolItem.componentPack;

    const componentValue = (
        currentComponentPack.propsSchema
        && (!toolItem.componentValue || isEmptyObject(toolItem.componentValue))
    )
        ? getDefaultFormState(
            currentComponentPack.propsSchema,
            {}, // 初始值为空
            currentComponentPack.propsSchema
        )
        : toolItem.componentValue || {};

    return {
        ...toolItem,
        isEdit: false,
        toolBar: {
            moveDownDisabled: false,
            moveUpDisabled: false,
            copyDisabled: false,
            removeDisabled: false,
        },
        componentValue,
        componentViewName: currentComponentPack.componentViewName,
        componentFormName: currentComponentPack.componentFormName,
        // id: `${currentComponentPack.componentViewName}_${+new Date()}`,
        id: genId(),
    };
}
