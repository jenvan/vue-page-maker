(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29c8bec2"],{"13fc":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:[t.$style.box]},[a("div",{class:[t.$style.bg],style:{backgroundColor:t.formData.bgcolor}}),a("TextView",{directives:[{name:"show",rawName:"v-show",value:t.formData.title&&t.formData.title.text.length>0,expression:"formData.title && formData.title.text.length > 0"}],attrs:{data:t.formData.title}}),a("div",{class:[t.$style.list]},t._l(t.formData.list,(function(e,i){return a("CellView",{key:i,style:t.style,attrs:{data:e}})})),1)],1)},r=[],s={props:{formData:{type:Object,default:function(){return{}}}},computed:{style:function(){var t=this.formData.column||2,e=this.formData.gutter/16+"em";return{width:"calc( (100% - 2 * "+t+"*"+e+") / "+t+")",minWidth:this.formData.width/16+"em",minHeight:this.formData.height/16+"em",margin:e}}}},l=s,n=a("b2b5"),o=a("2877");function c(t){this["$style"]=n["default"].locals||n["default"]}var f=Object(o["a"])(l,i,r,!1,c,null,null);e["default"]=f.exports},b2b5:function(t,e,a){"use strict";var i=a("fc64"),r=a.n(i);a.d(e,"default",(function(){return r.a}))},fc64:function(t,e,a){t.exports={box:"View_box_2RaAG",bg:"View_bg_Wc_ks",list:"View_list_3InQU"}}}]);