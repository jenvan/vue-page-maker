(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bf1bcbc"],{"1bd1":function(t,e,a){t.exports={box:"View_box_QEeV_"}},"25c3":function(t,e,a){"use strict";var n=a("1bd1"),r=a.n(n);a.d(e,"default",(function(){return r.a}))},e821:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{class:[t.$style.box,t.animate],style:t.formData.style,attrs:{type:"flex"}},t._l(t.formData.list,(function(e,n){return a("el-col",{key:n,style:{padding:t.formData.gutter/16+"em",minWidth:t.formData.width/16+"em"},attrs:{span:t.getSpan(n)}},[a("ImageView",{style:{width:"100%",height:"100%"},attrs:{data:e}})],1)})),1)},r=[],i={props:{formData:{type:Object,default:function(){return{}}}},computed:{animate:function(){var t=this.formData.animate;return t?Object.keys(t).reduce((function(e,a){return e.push(t[a]),e}),["animate__animated"]).join(" "):""}},methods:{getSpan:function(t){var e=this.formData.layout.split(",");return e[t]?parseInt(e[t]):24}}},o=i,s=a("25c3"),u=a("2877");function c(t){this["$style"]=s["default"].locals||s["default"]}var l=Object(u["a"])(o,n,r,!1,c,null,null);e["default"]=l.exports}}]);