(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f813a30"],{"4fff":function(t,e,a){"use strict";var i=a("5efc"),n=a.n(i);a.d(e,"default",(function(){return n.a}))},"5efc":function(t,e,a){t.exports={row:"View_row_3YMMn",item:"View_item_27z6n",link:"View_link_1uUeG"}},a29d:function(t,e,a){"use strict";a.r(e);var i=function(){var t,e=this,a=e.$createElement,i=e._self._c||a;return i("div",{class:e.$style.row,style:Object.assign({},{flexDirection:e.data.direction},e.style[1])},[e.hasImage?i("div",{class:e.$style.item,style:Object.assign({},e.size[0])},[i("ImageView",{attrs:{data:e.data.image,animate:e.data.animate}})],1):e._e(),e.hasText?i("div",{class:(t={},t[e.$style.item]=!0,t[e.$style.link]=e.hasLink,t),style:Object.assign({},{padding:e.style[0]},e.size[1]),on:{click:e.handleClick}},[i("TextView",{attrs:{data:e.data.text1}}),i("TextView",{attrs:{data:e.data.text2}}),i("TextView",{attrs:{data:e.data.text3}})],1):e._e(),e._t("extra")],2)},n=[],s=a("15fd"),d=["padding"],l={name:"CellView",props:{data:{type:Object,default:function(){return{}}}},computed:{size:function(){var t=this.data.size/16||0;return!this.data.direction||/column/.test(this.data.direction)?[{width:"100%",height:t+"em"},{width:"100%"}]:[{width:t+"em",maxWidth:"40%"},{width:"calc(100% - "+t+"em)",minWidth:"60%"}]},style:function(){var t=this.data.style,e=t.padding,a=Object(s["a"])(t,d);return[e,a]},hasImage:function(){return this.data.image&&this.data.image.image&&this.data.image.image.length>0},hasText:function(){var t=this.data.text1&&this.data.text1.text&&this.data.text1.text.length>0,e=this.data.text2&&this.data.text2.text&&this.data.text2.text.length>0,a=this.data.text3&&this.data.text3.text&&this.data.text3.text.length>0;return t||e||a},hasLink:function(){return this.data.link&&this.data.link.length>0}},methods:{handleClick:function(){this.hasLink&&this.$redirect(this.data.link)}}},h=l,c=a("4fff"),r=a("2877");function u(t){this["$style"]=c["default"].locals||c["default"]}var o=Object(r["a"])(h,i,n,!1,u,null,null);e["default"]=o.exports}}]);