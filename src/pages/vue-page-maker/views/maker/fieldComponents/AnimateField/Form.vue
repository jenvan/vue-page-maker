<template>
    <el-form-item
        :prop="curNodePath"
        :rules="[{validator}]"
        :required="schema.required.length > 0" 
    >
        <el-collapse v-model="activeName">
            <el-collapse-item :title="getProp('title')" :name="getProp('fold') ? 'fold' : 'unfold'">

                <div :class="$style.row">
                    <el-select v-model="animateName">
                        <el-option label="无动效" value=""></el-option>
                        <el-option-group v-for="group in optionsName" :key="group.label" :label="group.label">
                            <el-option v-for="(item,index) in group.options" :key="index" :label="item" :value="'animate__' + item"></el-option>
                        </el-option-group>
                    </el-select>
                    <el-select v-model="animateDuration">
                        <el-option v-for="item in optionsDuration" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="animateDelay">
                        <el-option v-for="item in optionsDelay" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="animateRepeat">
                        <el-option v-for="item in optionsRepeat" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>

            </el-collapse-item>
        </el-collapse>

    </el-form-item>
    
</template>

<script>
import { fieldProps, vueUtils, formUtils, schemaValidate } from '@lljj/vue-json-schema-form';
import { importComputedFn, importMethodsFn } from '../utils';

export default {
    props: {
        ...fieldProps
    },
    data() {
        return {
            activeName: "unfold",
       
            optionsName: [{
                label: 'Attention seekers',
                options: 'bounce,flash,pulse,rubberBand,shakeX,shakeY,headShake,swing,tada,wobble,jello,heartBeat'.split(',')
            }, {
                label: 'Back entrances',
                options: 'backInDown,backInLeft,backInRight,backInUp'.split(',')
            }, {
                label: 'Back exits',
                options: 'backOutDown,backOutLeft,backOutRight,backOutUp'.split(',')
            }, {
                label: 'Bouncing entrances',
                options: 'bounceIn,bounceInDown,bounceInLeft,bounceInRight,bounceInUp'.split(',')
            }, {
                label: 'Bouncing exits',
                options: 'bounceOut,bounceOutDown,bounceOutLeft,bounceOutRight,bounceOutUp'.split(',')
            }, {
                label: 'Fading entrances',
                options: 'fadeIn,fadeInDown,fadeInDownBig,fadeInLeft,fadeInLeftBig,fadeInRight,fadeInRightBig,fadeInUp,fadeInUpBig,fadeInTopLeft,fadeInTopRight,fadeInBottomLeft,fadeInBottomRight'.split(',')
            }, {
                label: 'Fading exits',
                options: 'fadeOut,fadeOutDown,fadeOutDownBig,fadeOutLeft,fadeOutLeftBig,fadeOutRight,fadeOutRightBig,fadeOutUp,fadeOutUpBig,fadeOutTopLeft,fadeOutTopRight,fadeOutBottomRight,fadeOutBottomLeft'.split(',')
            }, {
                label: 'Flippers',
                options: 'flip,flipInX,flipInY,flipOutX,flipOutY'.split(',')
            }, {
                label: 'Lightspeed',
                options: 'lightSpeedInRight,lightSpeedInLeft,lightSpeedOutRight,lightSpeedOutLeft'.split(',')
            }, {
                label: 'Rotating entrances',
                options: 'rotateIn,rotateInDownLeft,rotateInDownRight,rotateInUpLeft,rotateInUpRight'.split(',')
            }, {
                label: 'Rotating exits',
                options: 'rotateOut,rotateOutDownLeft,rotateOutDownRight,rotateOutUpLeft,rotateOutUpRight'.split(',')
            }, {
                label: 'Specials',
                options: 'hinge,jackInTheBox,rollIn,rollOut'.split(',')
            }, {
                label: 'Zooming entrances',
                options: 'zoomIn,zoomInDown,zoomInLeft,zoomInRight,zoomInUp'.split(',')
            }, {
                label: 'Zooming exits',
                options: 'zoomOut,zoomOutDown,zoomOutLeft,zoomOutRight,zoomOutUp'.split(',')
            }, {
                label: 'Sliding entrances',
                options: 'slideInDown,slideInLeft,slideInRight,slideInUp'.split(',')
            }, {
                label: 'Sliding exits',
                options: 'slideOutDown,slideOutLeft,slideOutRight,slideOutUp'.split(',')
            }],

            optionsDelay: [{
                label: '立即执行',
                value: ''
            }, {
                label: '1秒后执行',
                value: 'animate__delay'
            }, {
                label: '2秒后执行',
                value: 'animate__delay-2s'
            }, {
                label: '3秒后执行',
                value: 'animate__delay-3s'
            }, {
                label: '4秒后执行',
                value: 'animate__delay-4s'
            }, {
                label: '5秒后执行',
                value: 'animate__delay-5s'
            }],

            optionsDuration: [{
                label: '快',
                value: 'animate__faster'
            }, {
                label: '稍快',
                value: 'animate__fast'
            }, {
                label: '正常速度',
                value: ''
            }, {
                label: '稍慢',
                value: 'animate__slow'
            }, {
                label: '慢',
                value: 'animate__slower'
            }],

            optionsRepeat: [{
                label: '重复1次',
                value: ''
            }, {
                label: '重复2次',
                value: 'animate__repeat-2'
            }, {
                label: '重复3次',
                value: 'animate__repeat-3'
            }, {
                label: '无线循环',
                value: 'animate__infinite'
            }],
        };
    },
    computed: {
        ...importComputedFn(['animateName', 'animateDelay', 'animateDuration', 'animateRepeat']),
    },
    methods: {
        ...importMethodsFn(),
    }
};
</script>

<style module>
.row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    :global {
        input {
            padding: 0 5px;
            text-align: left !important;
        }
        .el-input {
            font-size: 12px;
        }
        .el-select {
            width: 25%;
        }
    }
}
</style>
