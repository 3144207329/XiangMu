webpackJsonp([30],{"5b3C":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"RoleInfo",props:{roleInfoVisiable:{require:!0,default:!1},roleInfoData:{require:!0}},data:function(){return{key:+new Date,loading:!0,checkedKeys:[],menuTreeData:[]}},methods:{close:function(){this.$emit("close"),this.checkedKeys=[]}},watch:{roleInfoVisiable:function(){var e=this;this.roleInfoVisiable&&this.$get("menu").then(function(t){e.menuTreeData=t.data.rows.children,e.$get("role/menu/"+e.roleInfoData.roleId).then(function(t){var a=e.checkedKeys.length;e.checkedKeys.splice(0,a,t.data),e.key=+new Date})})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-drawer",{staticStyle:{height:"calc(100% - 55px)",overflow:"auto","padding-bottom":"53px"},attrs:{title:"角色信息",maskClosable:!1,width:"650",placement:"right",closable:!0,visible:e.roleInfoVisiable},on:{close:e.close}},[a("p",[a("a-icon",{attrs:{type:"crown"}}),e._v("  角色名称："+e._s(e.roleInfoData.roleName))],1),e._v(" "),a("p",{attrs:{title:e.roleInfoData.remark}},[a("a-icon",{attrs:{type:"book"}}),e._v("  角色描述："+e._s(e.roleInfoData.remark))],1),e._v(" "),a("p",[a("a-icon",{attrs:{type:"clock-circle"}}),e._v("  创建时间："+e._s(e.roleInfoData.createTime))],1),e._v(" "),a("p",[a("a-icon",{attrs:{type:"clock-circle"}}),e._v("  修改时间："+e._s(e.roleInfoData.modifyTime?e.roleInfoData.modifyTime:"暂未修改"))],1),e._v(" "),a("p",[a("a-icon",{attrs:{type:"trophy"}}),e._v("  所拥有的权限：\n      "),a("a-tree",{key:e.key,attrs:{checkStrictly:!0,checkable:!0,defaultCheckedKeys:e.checkedKeys[0],defaultExpandedKeys:e.checkedKeys[0],treeData:e.menuTreeData}})],1)])},staticRenderFns:[]},n=a("VU/8")(o,r,!1,null,null,null);t.default=n.exports}});