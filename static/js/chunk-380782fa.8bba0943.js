(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-380782fa"],{"980e":function(e,t,n){e.exports={box:"View_box_1SpHP",nav:"View_nav_3gH2g",logo:"View_logo_3Vu7B",bar:"View_bar_2RSfu",menu:"View_menu_1WB5W",mobile:"View_mobile_2asPM",more:"View_more_27V5u"}},a01e:function(e,t,n){"use strict";n.r(t);var o=function(){var e,t=this,n=t.$createElement,o=t._self._c||n;return o("div",{class:t.$style.box,style:{height:t.formData.height/16+"em"},attrs:{id:"nav-top-wrap"}},[o("div",{class:t.$style.nav,style:{background:t.bgColor,color:t.fgColor,height:t.formData.height/16+"em"},attrs:{id:"nav-top"}},[o("ImageView",{class:t.$style.logo,attrs:{data:t.formData.logo,lazy:!1}}),o("div",{class:t.$style.bar},[o("div",{class:[t.$style.more,"el-icon-menu"],style:{display:t.moreDisplay},on:{click:t.handleMore}}),o("el-menu",{ref:"nav",class:(e={},e[t.$style.menu]=!0,e[t.$style.mobile]=t.inMobile,e),style:{display:t.menuDisplay},attrs:{"background-color":t.bgColor,"text-color":t.fgColor,"active-text-color":t.fgColor},on:{select:t.handleSelect,open:t.handleOpen}},t._l(t.formData.list,(function(e,n){return o("span",{key:n},[0==e.children.length?o("el-menu-item",{attrs:{index:n.toString()}},[t._v(" "+t._s(e.self.text)+" ")]):o("el-submenu",{attrs:{index:n.toString()}},[o("template",{slot:"title"},[t._v(t._s(e.self.text))]),t._l(e.children,(function(e,l){return o("el-menu-item",{key:l,attrs:{index:n+"-"+l}},[t._v("-  "+t._s(e.text)+"  -")])}))],2)],1)})),0)],1)],1)])},l=[],i=n("2409"),a={props:{formData:{type:Object,default:function(){return{}}},zoom:{type:Number,default:1}},data:function(){return{inMobile:!1,bgColor:"transparent",fgColor:"#FFF",popupMenu:!1,moreDisplay:"none",menuDisplay:"none"}},mounted:function(){var e=this;setTimeout(this.handleScroll,300),document.querySelector("#device").addEventListener("scroll",(function(){document.getElementById("nav-top")&&(document.getElementById("nav-top").style.opacity=0,Object(i["a"])(e.handleScroll,500)())}))},destroyed:function(){var e=document.getElementById("nav-top");"page"==e.parentElement.id&&document.getElementById("page").removeChild(e)},watch:{zoom:function(){this.handleScroll()}},methods:{handleMenu:function(e){this.popupMenu=e,this.moreDisplay=this.inMobile?"flex":"none",this.menuDisplay=!this.inMobile||this.popupMenu?"flex":"none"},handleScroll:function(){if(document.getElementById("nav-top")){var e=document.getElementById("nav-top"),t=document.getElementById("device"),n=t.scrollTop||0;n>=50?("page"!=e.parentElement.id&&document.getElementById("page").appendChild(e),e.style.zoom=this.zoom,e.style.top=t.getBoundingClientRect().top/this.zoom+"px",e.style.left=t.getBoundingClientRect().left/this.zoom+"px"):(document.getElementById("nav-top-wrap").appendChild(e),e.style.zoom=1,e.style.top=0,e.style.left=0),e.style.width=t.clientWidth+"px",this.inMobile=t.clientWidth<1024,this.formData.bgcolor?(this.bgColor=this.formData.bgcolor,this.fgColor=this.formData.fgcolor):(this.bgColor=n>50?"#FFF":"transparent",this.fgColor=n>50?"#000":this.formData.fgcolor),this.handleMenu(!this.inMobile),document.getElementById("nav-top").style.opacity=1}},handleMore:function(){this.handleMenu(!this.popupMenu)},handleSelect:function(e){this.handleMenu(!1);var t="",n=e.split("-");1==n.length&&(t=this.formData.list[n[0]].self.link),2==n.length&&(t=this.formData.list[n[0]].children[n[1]].link),this.$redirect(t)},handleOpen:function(e){this.index=e},handleClose:function(){this.$refs.nav.close(this.index)}}},s=a,r=n("b9dd"),d=n("2877");function c(e){this["$style"]=r["default"].locals||r["default"]}var u=Object(d["a"])(s,o,l,!1,c,null,null);t["default"]=u.exports},b9dd:function(e,t,n){"use strict";var o=n("980e"),l=n.n(o);n.d(t,"default",(function(){return l.a}))}}]);