(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"22e7":function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{},[r("q-card",{staticClass:"q-pa-xs q-ma-xs",attrs:{elevated:""}},[r("div",{staticClass:"row q-pa-lg"},[r("div",{staticClass:"col-md-8 md"},[r("q-toolbar"),r("div",{staticClass:"justify-center text-center"},[t._v("\n          Contribute and see your contributions in real time\n        ")])],1),r("div",{staticClass:"col-md-4 col-xs-12"},[r("q-toolbar",{staticClass:"text-center"},[r("q-img",{staticClass:"icon-image",attrs:{src:t.logoUrl,"spinner-color":"primary"}})],1),r("div",{staticClass:"inset-shadow"},[r("h6",{staticClass:"text-weight-bold text-center"},[t._v("Login Here")]),r("q-form",{ref:"loginForm",staticClass:"q-gutter-md"},[r("q-input",{attrs:{type:"email",label:"Email *","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type your email"}]},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),r("q-input",{attrs:{type:"password",label:"Password *","lazy-rules":"",rules:[function(t){return null!==t&&""!==t||"Please type your Password"}]},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),r("div",{staticClass:"row q-mt-lg float-right"},[r("div",{staticClass:"col-md-12 col-xs-12"},[r("q-btn",{staticClass:"q-pl-md q-pr-md q-mr-md text-capitalize rounded-borders",attrs:{label:"Login",color:"primary",loading:t.loading,disable:t.loading},on:{click:t.btnLogin},scopedSlots:t._u([{key:"loading",fn:function(){return[r("q-spinner-facebook")]},proxy:!0}])})],1)]),r("br"),r("br"),r("div",{staticClass:"row q-mt-xl"},[r("div",{staticClass:"col-md-6 col-xs-6 col-sm-6 float-right"},[r("q-btn",{staticClass:"text-capitalize rounded-borders",attrs:{flat:"",label:"Forgot Password?",color:"secondary"},on:{click:t.btnForgotPwd}})],1),r("div",{staticClass:"col-md-6 col-xs-6 col-sm-6 float-right"},[r("q-btn",{staticClass:"text-capitalize rounded-borders",attrs:{flat:"",color:"secondary",label:"Create New Account"},on:{click:t.btnRegPage}})],1)])],1)],1)])])],1)},n=[],a=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("a481"),r("c47a")),s=r.n(a),i=r("2f62"),c=r("49c2");function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){s()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d={name:"UserLogin",mixins:[c["a"]],created:function(){},data:function(){return{form:{email:"",password:""},defaultForm:{email:"",password:""},logoUrl:"statics/images/order_icon.png"}},computed:u({},Object(i["c"])({loading:"GET_ADDING_USER",loggedIn:"LOGGED_IN",currentUser:"GET_CURRENT_USER"})),methods:u({},Object(i["b"])({loginUser:"LOGIN_USER"}),{btnLogin:function(){var t=this;this.$refs.loginForm.validate().then((function(e){e&&t.loginUser(t.form)}))},btnForgotPwd:function(){},btnRegPage:function(){this.$router.push({name:"UserRegister"})},loginSuccess:function(){this.loggedIn&&this.$router.replace({name:"Dashboard"})}}),watch:{currentUser:{deep:!0,handler:function(){this.loginSuccess()}},loggedIn:{}}},f=d,m=(r("aede"),r("2877")),p=Object(m["a"])(f,o,n,!1,null,"4cf1ecfa",null);e["default"]=p.exports},"49c2":function(t,e,r){"use strict";r("8e6e"),r("8a81"),r("456d"),r("ac6a"),r("cadf"),r("06db"),r("ffc1"),r("a481");var o=r("c47a"),n=r.n(o),a=r("2f62");function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){n()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c={created:function(){},data:function(){return{}},computed:i({},Object(a["c"])({notification:"GET_NOTIFICATION",errors:"GET_ERRORS"})),methods:{chamaNotifyColor:function(t,e,r){this.$q.notify({color:t,message:e,position:r})},formatString:function(t){return t.replace(/_/g," ")},chamaNotifyType:function(t,e,r){this.$q.notify({type:t,message:e,position:r})},goHome:function(){this.$router.push("/home")}},mounted:function(){},watch:{notification:{deep:!0,handler:function(){0!==Object.entries(this.notification).length&&this.notification.constructor===Object&&(this.$q.notify(this.notification),this.$store.commit("SET_NOTIFICATION",{}))}},errors:{deep:!0,handler:function(){var t=this;0!==this.errors.length&&(this.errors.forEach((function(e){t.chamaNotifyType("negative",e,"top")})),this.$store.commit("SET_ERRORS",[]))}}}};e["a"]=c},"56c3":function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{},[r("q-card",{attrs:{elevated:""}},[t._v("\n    hello\n  ")])],1)},n=[],a={name:"Dashboard"},s=a,i=r("2877"),c=Object(i["a"])(s,o,n,!1,null,"5b15b6db",null);e["default"]=c.exports},ae39:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{})},n=[],a={name:"ManageUsers"},s=a,i=r("2877"),c=Object(i["a"])(s,o,n,!1,null,"29ec0177",null);e["default"]=c.exports},aede:function(t,e,r){"use strict";var o=r("d26b"),n=r.n(o);n.a},ca76:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{},[r("q-card",{staticClass:"q-pa-xs q-ma-xs",attrs:{elevated:""}},[r("div",{staticClass:"row q-pa-lg"},[r("div",{staticClass:"col-md-8 md"},[r("q-toolbar"),r("div",{staticClass:"justify-center text-center"},[t._v("\n          Contribute and see your contributions in real time\n        ")])],1),r("div",{staticClass:"col-md-4 col-xs-12"},[r("q-toolbar",{staticClass:"text-center"},[r("q-img",{staticClass:"icon-image",attrs:{src:t.logoUrl,"spinner-color":"primary"}})],1),r("div",{staticClass:"inset-shadow"},[r("h6",{staticClass:"text-weight-bold text-center"},[t._v("Login Here")]),r("q-form",{ref:"loginForm",staticClass:"q-gutter-md"},[r("q-input",{attrs:{type:"text",label:"Name *","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type your name"}]},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),r("q-input",{attrs:{type:"email",label:"Email *","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type your email"}]},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),r("q-input",{attrs:{type:"text",label:"Phone Number*","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type your phone number"}]},model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}}),r("q-input",{attrs:{type:"password",label:"Password *","lazy-rules":"",rules:[function(t){return null!==t&&""!==t||"Please type your Password"}]},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),r("div",{staticClass:"row q-mt-lg float-right"},[r("div",{staticClass:"col-md-12 col-xs-12"},[r("q-btn",{staticClass:"q-pl-md q-pr-md q-mr-md text-capitalize rounded-borders",attrs:{label:"Register",color:"primary",loading:t.loading,disable:t.loading},on:{click:t.btnRegister},scopedSlots:t._u([{key:"loading",fn:function(){return[r("q-spinner-facebook")]},proxy:!0}])})],1)]),r("br"),r("br"),r("div",{staticClass:"row q-mt-xl text-center"},[r("div",{staticClass:"col-md-6 col-xs-6 col-sm-6 text-center"},[r("q-btn",{staticClass:"text-capitalize rounded-borders float-right",attrs:{flat:"",color:"secondary",label:"Have Account?"},on:{click:t.btnLoginPage}})],1)])],1)],1)])])],1)},n=[],a=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("c47a")),s=r.n(a),i=r("2f62"),c=r("49c2");function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){s()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d={name:"UserRegister",mixins:[c["a"]],created:function(){},data:function(){return{logoUrl:"statics/images/order_icon.png",form:{name:"",email:"",password:"",phone:""}}},computed:u({},Object(i["c"])({loading:"GET_ADDING_USER"})),methods:u({},Object(i["b"])({registerUser:"REGISTER_USER"}),{btnRegister:function(){var t=this;this.$refs.loginForm.validate().then((function(e){e&&t.registerUser(t.form)}))},btnLoginPage:function(){this.$router.push({name:"UserLogin"})}})},f=d,m=r("2877"),p=Object(m["a"])(f,o,n,!1,null,"321c005a",null);e["default"]=p.exports},d26b:function(t,e,r){}}]);
