webpackJsonp([19],{"72MX":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("Dd8w"),n=r.n(a),s=r("BO1k"),o=r.n(s),i={props:{importResultVisible:{required:!0,default:!1},importData:{required:!0},errors:{required:!0},times:{required:!0}},data:function(){return{pagination:{pageSizeOptions:["5","10"],defaultCurrent:1,defaultPageSize:5,showQuickJumper:!0,showSizeChanger:!0,showTotal:function(t,e){return"显示 "+e[0]+" ~ "+e[1]+" 条记录，共 "+t+" 条记录"}}}},computed:{errorsData:function(){for(var t=[],e=0;e<this.errors.length;e++){var r=this.errors[e],a={},s=!0,i=!1,l=void 0;try{for(var u,c=o()(r.errorFields);!(s=(u=c.next()).done);s=!0){var d=u.value;(a=n()({},d)).row=r.row,t.push(a)}}catch(t){i=!0,l=t}finally{try{!s&&c.return&&c.return()}finally{if(i)throw l}}}return t},successColumns:function(){return[{title:"字段1",dataIndex:"field1"},{title:"字段2",dataIndex:"field2"},{title:"字段3",dataIndex:"field3"},{title:"导入时间",dataIndex:"createTime"}]},errorColumns:function(){return[{title:"行",dataIndex:"row",customRender:function(t,e,r){return"第 "+(t+1)+" 行"}},{title:"列",dataIndex:"cellIndex",customRender:function(t,e,r){return"第 "+(t+1)+" 列"}},{title:"列名",dataIndex:"column"},{title:"错误信息",dataIndex:"errorMessage"}]},show:{get:function(){return this.importResultVisible},set:function(){}}},methods:{handleCancel:function(){this.$emit("close")}}},l={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a-modal",{staticClass:"import-result",attrs:{title:"导入结果",centered:!0,footer:null,maskClosable:!1,width:1e3},on:{cancel:t.handleCancel},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[r("div",{staticClass:"import-desc"},[0===t.importData.length&&0===t.errors.length?r("span",[r("a-alert",{attrs:{message:"暂无导入记录",type:"info"}})],1):t._e(),t._v(" "),0!==t.importData.length&&0!==t.errors.length?r("span",[r("a-alert",{attrs:{message:"部分导入成功",type:"warning"}},[r("div",{attrs:{slot:"description"},slot:"description"},[t._v("\n          成功导入 "),r("a",[t._v(t._s(t.importData.length))]),t._v(" 条记录，"),r("a",[t._v(t._s(t.errors.length))]),t._v(" 条记录导入失败，共耗时 "),r("a",[t._v(t._s(t.times))]),t._v(" 秒\n        ")])])],1):t._e(),t._v(" "),0!==t.importData.length&&0===t.errors.length?r("span",[r("a-alert",{attrs:{message:"全部导入成功",type:"success"}},[r("div",{attrs:{slot:"description"},slot:"description"},[t._v("\n          成功导入 "),r("a",[t._v(t._s(t.importData.length))]),t._v(" 条记录，共耗时 "),r("a",[t._v(t._s(t.times))]),t._v(" 秒\n        ")])])],1):t._e(),t._v(" "),0===t.importData.length&&0!==t.errors.length?r("span",[r("a-alert",{attrs:{message:"全部导入失败",type:"error"}},[r("div",{attrs:{slot:"description"},slot:"description"},[r("a",[t._v(t._s(t.errors.length))]),t._v(" 条记录导入失败，共耗时  "),r("a",[t._v(t._s(t.times))]),t._v(" 秒\n        ")])])],1):t._e()]),t._v(" "),r("a-tabs",{attrs:{defaultActiveKey:"1"}},[t.importData.length?r("a-tab-pane",{key:"1",attrs:{tab:"成功记录"}},[r("a-table",{ref:"successTable",attrs:{columns:t.successColumns,dataSource:t.importData,pagination:t.pagination,scroll:{x:900}}})],1):t._e(),t._v(" "),t.errors.length?r("a-tab-pane",{key:"2",attrs:{tab:"失败记录"}},[r("a-table",{ref:"errorTable",attrs:{columns:t.errorColumns,dataSource:t.errorsData,pagination:t.pagination,scroll:{x:900}}})],1):t._e()],1)],1)},staticRenderFns:[]},u=r("VU/8")(i,l,!1,function(t){r("LzYy")},null,null);e.default=u.exports},LzYy:function(t,e){}});