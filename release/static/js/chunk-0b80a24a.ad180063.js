(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b80a24a"],{"5bce":function(t,e,n){"use strict";var a=n("da72"),i=n.n(a);n.d(e,"default",(function(){return i.a}))},8010:function(t,e,n){"use strict";n.r(e);var a=function(){var t,e=this,n=e.$createElement,a=e._self._c||n;return a("div",{class:(t={},t[e.$style.text]=!0,t[e.$style.link]=e.hasLink,t),style:e.style,domProps:{innerHTML:e._s(e.text)},on:{click:e.handleClick}})},i=[],l=n("15fd"),r=["text","link"],s={name:"TextView",props:{data:{type:Object,default:function(){return{}}}},computed:{text:function(){var t=this.data.text,e=t&&t.length>0?t:"";return e=e.replace(/&/g,"&amp;"),e=e.replace(/\</g,"&lt;"),e=e.replace(/\>/g,"&gt;"),e=e.replace(/\"/g,"&quot;"),e=e.replace(/\'/g,"&apos;"),e=e.replace(/\r\n/g,"<br>").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;&nbsp;"),e},style:function(){var t=this.data,e=(t.text,t.link,Object(l["a"])(t,r));return e},hasLink:function(){return"string"==typeof this.data.link&&this.data.link.length>0}},methods:{handleClick:function(){this.hasLink&&this.$redirect(this.data.link)}}},c=s,u=n("5bce"),o=n("2877");function p(t){this["$style"]=u["default"].locals||u["default"]}var d=Object(o["a"])(c,a,i,!1,p,null,null);e["default"]=d.exports},da72:function(t,e,n){t.exports={text:"View_text_2j1H8",link:"View_link_1F3Uf"}}}]);