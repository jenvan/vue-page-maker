(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d33d398"],{"7aee":function(t,e,i){"use strict";var a=i("a006"),s=i.n(a);i.d(e,"default",(function(){return s.a}))},a006:function(t,e,i){t.exports={box:"View_box_1XPud",image:"View_image_2ymdP",text:"View_text_3tXbn",vertical:"View_vertical_dmbjt"}},b11b:function(t,e,i){"use strict";i.r(e);var a=function(){var t,e=this,i=e.$createElement,a=e._self._c||i;return a("div",{class:e.$style.box,style:{flexDirection:e.direction},on:{click:e.handleClick}},[a("ImageView",{class:e.$style.image,style:Object.assign({},e.size[0]),attrs:{data:e.data.image}}),a("div",{class:(t={},t[e.$style.text]=!0,t[e.$style.vertical]=e.vertical,t),style:Object.assign({},e.size[1])},[a("div",{staticClass:"summary"},[a("div",{staticClass:"title"},[e._v(e._s(e.data.title))]),a("div",{staticClass:"label"},[e._v(e._s(e.data.label))])]),a("div",{staticClass:"property"},[a("div",{staticClass:"price"},[a("span",{staticClass:"symbol"},[e._v("￥")]),e._v(e._s(e.data.price))]),a("TextView",{attrs:{data:e.data.extra}})],1)])],1)},s=[],l={name:"GoodsView",props:{vertical:{type:Boolean,default:!1},width:{type:Number,default:0},data:{type:Object,default:function(){return{}}}},computed:{direction:function(){return this.vertical?"column":"row"},size:function(){var t=this.width||(this.vertical?18:15);return this.vertical?[{width:t+"em",height:t+"em"},{width:t+"em"}]:[{width:t+"em",height:t+"em"},{width:"calc(100% - "+t+"em",height:t+"em"}]}},methods:{handleClick:function(){this.data.image&&"string"==typeof this.data.image.link&&this.$redirect(this.data.image.link)}}},c=l,n=i("7aee"),d=i("2877");function r(t){this["$style"]=n["default"].locals||n["default"]}var o=Object(d["a"])(c,a,s,!1,r,null,null);e["default"]=o.exports}}]);