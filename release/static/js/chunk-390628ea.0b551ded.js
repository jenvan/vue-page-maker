(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-390628ea"],{"75e7":function(e,t,l){e.exports={row:"Form_row_3P4_z",link:"Form_link_2Qxhy",extend:"Form_extend_3wE90",layout:"Form_layout_c5J4E",size:"Form_size_16udP"}},"7ff8":function(e,t,l){"use strict";var a=l("75e7"),o=l.n(a);l.d(t,"default",(function(){return o.a}))},ccd1:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-form-item",{attrs:{label:e.getProp("title"),prop:e.curNodePath,rules:[{validator:e.validator}],required:e.schema.required.length>0}},[l("div",{class:e.$style.row},[l("VueElementForm",{attrs:{schema:e.imageSchema,"form-footer":{show:!1}},model:{value:e.image,callback:function(t){e.image=t},expression:"image"}}),l("VueElementForm",{attrs:{schema:e.textSchema,"form-footer":{show:!1}},model:{value:e.text1,callback:function(t){e.text1=t},expression:"text1"}}),l("VueElementForm",{attrs:{schema:e.textSchema,"form-footer":{show:!1}},model:{value:e.text2,callback:function(t){e.text2=t},expression:"text2"}}),l("VueElementForm",{attrs:{schema:e.textSchema,"form-footer":{show:!1}},model:{value:e.text3,callback:function(t){e.text3=t},expression:"text3"}}),l("el-input",{class:e.$style.link,attrs:{"prefix-icon":"el-icon-link",clearable:"",placeholder:"请输入链接或留空",title:"文字链接"},model:{value:e.link,callback:function(t){e.link=t},expression:"link"}}),l("div",{class:e.$style.extend},[l("div",[l("el-select",{class:e.$style.layout,attrs:{title:"图文布局"},model:{value:e.direction,callback:function(t){e.direction=t},expression:"direction"}},e._l(e.options,(function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),l("el-input-number",{class:e.$style.size,attrs:{min:0,max:500,"controls-position":"right",title:e.sizeTitle},model:{value:e.size,callback:function(t){e.size=t},expression:"size"}})],1),l("VueElementForm",{attrs:{schema:e.animateSchema,"form-footer":{show:!1}},model:{value:e.animate,callback:function(t){e.animate=t},expression:"animate"}}),l("VueElementForm",{attrs:{schema:e.styleSchema,"form-footer":{show:!1}},model:{value:e.style,callback:function(t){e.style=t},expression:"style"}})],1)],1)])},o=[],n=l("5530"),i=l("7b46"),r=l("d882"),c={components:{VueElementForm:i["a"]},props:Object(n["a"])({},i["b"]),data:function(){return{options:[{value:"column",label:"上图下文"},{value:"column-reverse",label:"上文下图"},{value:"row",label:"左图右文"},{value:"row-reverse",label:"左文右图"}]}},computed:Object(n["a"])({sizeTitle:function(){return/row/.test(this.direction)?"图片宽度（px）， 最大占宽 50%":"图片高度（px）"},imageSchema:function(){var e=Object(r["f"])({title:""});return e.properties.image["default"]="https://s4.ax1x.com/2021/12/16/T9fouV.png",e},textSchema:function(){return Object(r["h"])({title:"",required:[]})},animateSchema:function(){return Object(r["c"])({title:"图片动效",fold:!0})},styleSchema:function(){return Object(r["g"])({title:"全局样式",fold:!0,cell:!0})}},Object(r["a"])(["image","text1","text2","text3","link","direction","size","animate","style"])),methods:Object(n["a"])({},Object(r["b"])())},s=c,u=l("7ff8"),m=l("2877");function f(e){this["$style"]=u["default"].locals||u["default"]}var d=Object(m["a"])(s,a,o,!1,f,null,null);t["default"]=d.exports}}]);