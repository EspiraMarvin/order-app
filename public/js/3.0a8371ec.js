(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{b83c:function(t,e,r){},e921:function(t,e,r){"use strict";var a=r("b83c"),n=r.n(a);n.a},f6b42:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-layout",{attrs:{view:"lHh Lpr lFf"}},[r("admin-nav"),r("q-page-container",[r("router-view"),r("q-page-scroller",{attrs:{position:"bottom-right","scroll-offset":150,offset:[18,18]}},[r("q-btn",{attrs:{fab:"",icon:"keyboard_arrow_up",color:"primary"}})],1)],1)],1)},n=[],o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("q-header",{attrs:{elevated:""}},[r("q-toolbar",{staticClass:"text-white"},[r("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}}),r("q-toolbar-title",[t._v("\n        "+t._s(t.title)+"\n      ")]),r("q-space")],1)],1),r("q-drawer",{attrs:{"show-if-above":"",bordered:"","content-class":"bg-amber-3"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[r("q-list",{staticClass:"theme text-black"},[r("q-toolbar",[r("q-toolbar-title",{staticClass:"text-center"},[t._v(" Hi, "+t._s(t.currentUser.name)+" ")])],1),r("router-link",{staticClass:"router-link",attrs:{to:{name:"AdminPage"}}},[r("q-item",{attrs:{clickable:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"dashboard"}})],1),r("q-item-section",[t._v("\n            Overview\n          ")])],1)],1),r("router-link",{staticClass:"router-link",attrs:{to:{name:"ManageUsers"}}},[r("q-item",{attrs:{clickable:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"eva-person-outline"}})],1),r("q-item-section",[t._v("\n            users\n          ")])],1)],1),r("router-link",{staticClass:"router-link",attrs:{to:{name:"Suppliers"}}},[r("q-item",{attrs:{clickable:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"eva-people-outline"}})],1),r("q-item-section",[t._v("\n            Suppliers\n          ")])],1)],1),r("router-link",{staticClass:"router-link",attrs:{to:{name:"Products"}}},[r("q-item",{attrs:{clickable:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"eva-clipboard-outline"}})],1),r("q-item-section",[t._v("\n            Products\n          ")])],1)],1),r("router-link",{staticClass:"router-link",attrs:{to:{name:"Orders"}}},[r("q-item",{attrs:{clickable:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"eva-shopping-cart-outline"}})],1),r("q-item-section",[t._v("\n            Orders\n          ")])],1)],1),r("router-link",{staticClass:"router-link",attrs:{to:""}},[r("q-item",{attrs:{clickable:""},on:{click:t.logoutUser}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"lock"}})],1),r("q-item-section",[t._v("\n            Logout\n          ")])],1)],1)],1)],1)],1)},i=[],s=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("c47a")),c=r.n(s),l=r("2f62"),u=r("c04a");function m(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(Object(r),!0).forEach((function(e){c()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var b={name:"AdminNav",data:function(){return{leftDrawerOpen:!1,title:"Orders - Administration"}},computed:p({},Object(l["c"])({currentUser:"GET_CURRENT_USER"})),methods:{logoutUser:function(){u["a"].clearLocalStorage(),window.location.reload()}}},f=b,v=(r("e921"),r("2877")),d=Object(v["a"])(f,o,i,!1,null,"47ccef5a",null),q=d.exports,O={name:"AdminLayout",components:{AdminNav:q}},k=O,w=Object(v["a"])(k,a,n,!1,null,"24389485",null);e["default"]=w.exports}}]);