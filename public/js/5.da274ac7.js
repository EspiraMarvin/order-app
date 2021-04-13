(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"781e":function(e,t,i){"use strict";i("8e6e"),i("8a81"),i("456d"),i("ac6a"),i("cadf"),i("06db"),i("ffc1"),i("a481");var r=i("c47a"),a=i.n(r),s=i("2f62");function n(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?n(Object(i),!0).forEach((function(t){a()(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var l={created:function(){},data:function(){return{}},computed:o({},Object(s["c"])({notification:"GET_NOTIFICATION",errors:"GET_ERRORS"})),methods:{orderNotify:function(e,t,i){this.$q.notify({color:e,message:t,position:i})},formatString:function(e){return e.replace(/_/g," ")},OrderNotifyType:function(e,t,i){this.$q.notify({type:e,message:t,position:i})},goHome:function(){this.$router.push("/home")}},mounted:function(){},watch:{notification:{deep:!0,handler:function(){0!==Object.entries(this.notification).length&&this.notification.constructor===Object&&(this.$q.notify(this.notification),this.$store.commit("SET_NOTIFICATION",{}))}},errors:{deep:!0,handler:function(){var e=this;0!==this.errors.length&&(this.errors.forEach((function(t){e.OrderNotifyType("negative",t,"top")})),this.$store.commit("SET_ERRORS",[]))}}}};t["a"]=l},ae39:function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",[i("q-card",{staticClass:"q-pa-md q-ma-md",attrs:{elevated:""}},[i("q-table",{attrs:{title:"Users List",data:e.usersResult.data,columns:e.tableHeaders,"row-key":"id",loading:e.loadingUsers,filter:e.pagination.filter,pagination:e.pagination,"hide-bottom":""},on:{"update:pagination":function(t){e.pagination=t},request:e.onRequest},scopedSlots:e._u([{key:"header",fn:function(t){return[i("q-tr",{attrs:{props:t}},e._l(t.cols,(function(r){return i("q-th",{key:r.name,staticClass:"text-capitalize text-black",attrs:{props:t}},[e._v("\n            "+e._s(r.label)+"\n          ")])})),1)]}},{key:"loading",fn:function(){return[i("q-inner-loading",{attrs:{showing:"",color:"primary"}})]},proxy:!0},{key:"top-right",fn:function(){return[e._e(),i("q-btn",{staticClass:"q-mr-sm text-black q-pl-md q-pr-md",attrs:{label:"Add User",color:"gray"},on:{click:e.buttonCreate}})]},proxy:!0},{key:"body",fn:function(t){return[i("q-tr",{attrs:{props:t}},[e._l(t.cols,(function(r){return["actions"!==r.name?i("q-td",{key:r.name,staticClass:"text-center"},[e._v("\n              "+e._s(t.row[r.name])+"\n            ")]):e._e(),"actions"===r.name?i("q-td",{key:r.name,attrs:{align:"center"}},[i("q-btn",{staticClass:"q-ma-xs",attrs:{outline:"",color:"secondary",icon:"visibility"},on:{click:function(i){return e.buttonView(t.row)}}}),i("q-btn",{staticClass:"q-ma-xs",attrs:{outline:"",color:"positive",icon:"edit"},on:{click:function(i){return e.buttonEdit(t.row)}}}),i("q-btn",{staticClass:"q-ma-xs",attrs:{outline:"",color:"negative",icon:"delete"},on:{click:function(i){return e.buttonDelete(t.row)}}})],1):e._e()]}))],2)]}}])}),i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-8 q-pa-md float-right"},[i("q-pagination",{staticClass:"float-right",attrs:{max:e.pagination.last_page,"direction-links":"","boundary-links":"","max-pages":1,ellipses:!0},on:{input:e.onPageChange},model:{value:e.pagination.page,callback:function(t){e.$set(e.pagination,"page",t)},expression:"pagination.page"}})],1),i("div",{staticClass:"col-md-4 q-pa-md"},[i("span",{staticClass:"q-pt-xl-lg"},[e._v("Total Records: "+e._s(e.pagination.rowsNumber)+" ")])])])],1),i("q-dialog",{attrs:{"transition-show":"rotate","transition-hide":"rotate",persistent:""},model:{value:e.confirm,callback:function(t){e.confirm=t},expression:"confirm"}},[i("q-card",[i("q-card-section",{staticClass:"row items-center"},[i("q-avatar",{attrs:{icon:"warning",color:"white","text-color":"red"}}),i("span",{staticClass:"q-ml-sm"},[e._v("This Action Deletes User. Proceed? ")])],1),i("q-card-actions",{attrs:{align:"right"}},[i("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel",color:"primary"}}),i("q-btn",{attrs:{flat:"",label:"Delete",color:"red"},on:{click:e.proceedDelete}})],1)],1)],1),i("q-dialog",{model:{value:e.createEditUserDialog,callback:function(t){e.createEditUserDialog=t},expression:"createEditUserDialog"}},[i("q-card",{staticStyle:{width:"400px","max-width":"80vw"}},[i("q-toolbar",[i("q-toolbar-title",[e._v(e._s(e.dialogTitle))])],1),i("hr"),i("q-card-section",{staticClass:"q-pt-none"},[i("q-form",{ref:"userForm"},[i("q-input",{attrs:{filled:"",label:"Name *",type:"text",disable:e.viewing,"lazy-rules":"",rules:[function(e){return e&&e.length>0||"Name Required"}]},model:{value:e.userForm.name,callback:function(t){e.$set(e.userForm,"name",t)},expression:"userForm.name"}}),i("q-input",{attrs:{filled:"",label:"Email *",type:"email",disable:e.viewing,"lazy-rules":"",rules:[function(e){return e&&e.length>0||"Email Required"}]},model:{value:e.userForm.email,callback:function(t){e.$set(e.userForm,"email",t)},expression:"userForm.email"}}),i("q-input",{attrs:{filled:"",label:"Password *",type:"password",disable:e.viewing,"lazy-rules":"",rules:[function(e){return e&&e.length>0||"Password Required"}]},model:{value:e.userForm.password,callback:function(t){e.$set(e.userForm,"password",t)},expression:"userForm.password"}}),i("q-select",{attrs:{label:"Role",filled:"","emit-value":"","map-options":"",disable:e.viewing,"transition-show":"scale","transition-hide":"scale",options:e.rolesResult.data,"option-value":"id","option-label":"display_name"},model:{value:e.userForm.role_id,callback:function(t){e.$set(e.userForm,"role_id",t)},expression:"userForm.role_id"}})],1)],1),i("q-card-actions",{directives:[{name:"show",rawName:"v-show",value:!e.viewing,expression:"!viewing"}],staticClass:"bg-white",attrs:{align:"right"}},[i("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"q-pl-md q-pr-md q-mr-md",attrs:{label:"Close"}}),i("q-btn",{staticClass:"q-pl-md q-pr-md q-mr-md",attrs:{label:"Save",outline:"",color:"primary",loading:e.addingUser,disable:e.addingUser},on:{click:e.btnSave},scopedSlots:e._u([{key:"loading",fn:function(){return[i("q-spinner-facebook")]},proxy:!0}])})],1)],1)],1)],1)},a=[],s=(i("8e6e"),i("8a81"),i("7f7f"),i("ac6a"),i("cadf"),i("06db"),i("456d"),i("c47a")),n=i.n(s),o=i("2f62"),l=i("781e"),c=i("2ef0");function u(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function d(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?u(Object(i),!0).forEach((function(t){n()(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):u(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var p={name:"ManageUsers",mixins:[l["a"]],created:function(){this.$store.dispatch("FETCH_USERS",this.pagination),this.$store.dispatch("FETCH_ROLES",1)},data:function(){return{userForm:{id:"",name:"",email:"",role_id:""},filter:"",selected:[],confirm:!1,createEditUserDialog:!1,deleteId:"",editing:!1,viewing:!1,dialogTitle:"",pagination:{sortBy:"",descending:!1,page:1,rowsPerPage:10,rowsNumber:10,filter:"",last_page:1}}},computed:d({},Object(o["c"])({loadingUsers:"GET_FETCHING_USERS",usersResult:"GET_USERS",addingUser:"GET_ADDING_USER",rolesResult:"GET_ROLES"}),{tableHeaders:function(){var e=this,t=[];if(this.usersResult.data&&this.usersResult.data.length){var i=this.usersResult.data[0],r=Object.keys(i);r.map((function(i){if("relationships"!==i&&"type"!==i){var r={name:i,sortable:!0,label:e.formatString(i),field:i,headerClasses:"bg-grey-3",align:"center"};t.push(r)}})),t.push({name:"actions",sortable:!1,label:"Actions",field:"actions",headerClasses:"bg-grey-3",align:"center"})}return t}}),methods:d({},Object(o["b"])({addUser:"ADD_USER",deleteUser:"DELETE_USER",editUser:"EDIT_USER"}),{onPageChange:function(e){this.pagination.page=e,this.$store.dispatch("FETCH_USERS",this.pagination)},onRequest:function(e){e.filter&&(e.pagination.filter=e.filter,this.$store.dispatch("FETCH_USERS",e.pagination))},buttonCreate:function(){this.editing=!1,this.viewing=!1,this.createEditUserDialog=!0,this.dialogTitle="Create User"},buttonEdit:function(e){var t=Object(c["cloneDeep"])(e);this.viewing=!1,this.editing=!0,this.userForm.id=t.id,this.userForm.name=t.name,this.userForm.email=t.email,this.userForm.role_id=t.relationships.roles[0].id,this.createEditUserDialog=!0,this.dialogTitle="Edit User"},buttonView:function(e){this.viewing=!0,this.userForm.name=e.name,this.userForm.email=e.email,this.userForm.role_id=e.relationships.roles[0].id,this.createEditUserDialog=!0,this.dialogTitle="View User"},buttonDelete:function(e){this.confirm=!0,this.deleteId=e.id},proceedDelete:function(){this.confirm=!1,this.deleteUser(this.deleteId)},btnSave:function(){var e=this;this.$refs.userForm.validate().then((function(t){t?e.editing?e.editUser(e.userForm):e.addUser(e.userForm):e.orderNotify("negative","Please fill all required fields *","top")}))}}),watch:{addingUser:{handler:function(){this.addingUser||(this.createEditUserDialog=!1)}},usersResult:{deep:!0,handler:function(){this.usersResult.hasOwnProperty("meta")&&(this.pagination.page=this.usersResult.meta.current_page,this.pagination.rowsPerPage=this.usersResult.meta.per_page,this.pagination.rowsNumber=this.usersResult.meta.total,this.pagination.last_page=this.usersResult.meta.last_page)}}}},m=p,f=i("2877"),g=Object(f["a"])(m,r,a,!1,null,"3a3a3c5e",null);t["default"]=g.exports}}]);