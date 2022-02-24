<template>
    <div :class="$style.box" :style="{flexDirection: direction}" @click="handleClick">

        <ImageView :class="$style.image" :style="{...size[0]}" :data="data.image"></ImageView>

        <div :class="{[$style.text]: true, [$style.vertical] : vertical}" :style="{...size[1]}">
            <div class="summary">
                <div class="title">{{data.title}}</div>
                <div class="label">{{data.label}}</div>
            </div>
            <div class="property">
                <div class="price">
                    <span class="symbol">￥</span>{{data.price}}
                    <span class="slash" v-show="data.price_slash"><span class="symbol">￥</span>{{data.price_slash}}</span>
                </div>
                <TextView :data="data.extra"></TextView>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'GoodsView',
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 0
        },
        data: {
            type: Object,
            default: () => ({})
        },
    },
    computed: {
        direction() {
            return this.vertical ? "column" : "row";
        },
        size() {
            let s = this.width || (this.vertical ? 18 : 15);
            if (this.vertical)
                return [{width: s + "em", height: s + "em"}, {width: s + "em"}];
            else
                return [{width: s + "em", height: s + "em"}, {width: "calc(100% - " + s + "em", height: s + "em"}];
        },
    },
    methods: {
        handleClick() {
            if (!this.data.image || typeof this.data.image.link != "string") return;
            this.$redirect(this.data.image.link);
        },
    },
};
</script>

<style module>
.box {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background: #FFF;
    border-radius: 8px;
    cursor: pointer;
}
.image {
    border-radius: 5px;
}
.text {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: flex-start;
    padding: 0.5em 2em;
    text-align: left;
    overflow: hidden;
    &.vertical {
        padding: 1em 0.5em;
    }
    :global {
        .summary {
            width: 100%;
            display: block;
        }
        .title{
            width: 100%;
            max-height: 3em;
            color: #666;
            font-size: 1.4em;
            line-height: 150%;
            overflow: hidden;
        }
        .label {
            margin-top: 0.5em;
            width: 100%;
            color: #CCC;
            font-size: 1em;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .property {
            margin-top: 1em;
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
        }
        .price {
            color: #F00;
            font-size: 1.4em;
            font-weight: 600;
        }
        .symbol {
            font-size: 0.5em;
            font-weight: 400;
        }
        .slash {
            margin-left: 3px;
            color: #999;
            font-weight: 400;
            text-decoration: line-through;
        }
    }
}
</style>
