webpackJsonp([10],{YXIN:function(e,a){},qxSt:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("mtWM"),s=t.n(r),i={data:function(){return{loading:!0,seven:{series:[],chartOptions:{chart:{shadow:{enabled:!0,color:"#000",top:18,left:7,blur:10,opacity:1},toolbar:{show:!1}},colors:["#f5564e","#35d0ba"],dataLabels:{enabled:!0},stroke:{curve:"smooth"},markers:{size:4},xaxis:{},yaxis:{}}},future:{series:[],chartOptions:{chart:{toolbar:{show:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth"},xaxis:{}}},dataSource:[],storage:[],citys:[],areaId:"",weather:{provinceName:"",countyName:"",weathers:[],day_c:[],night_c:[],hours_c:[],dateArr:[],timeArr:[],publishTime:"",alarms:[],realtime:{},indexes:[]}}},mounted:function(){var e=this;s.a.get("../../../static/file/city.json").then(function(a){e.citys=a.data})},methods:{handleSearch:function(e){if(this.dataSource=[],this.storage=[],this.areaId="",e)for(var a=0;a<this.citys.length;a++){var t=this.citys[a];-1!==t.countyname.indexOf(e)&&(this.dataSource.push(t.countyname),this.storage.push(t.areaid))}},onSelect:function(e){var a=this.dataSource.indexOf(e);this.areaId=this.storage[a]},searchWeather:function(){var e=this;this.areaId?this.$get("weather?areaId="+this.areaId).then(function(a){var t=JSON.parse(a.data.data);if("200"===t.code){e.weather={countyName:"",weathers:[],day_c:[],night_c:[],hours_c:[],dateArr:[],timeArr:[],publishTime:""},e.loading=!1,e.weather.provinceName=t.value[0].provinceName,e.weather.countyName=t.value[0].city,e.weather.weathers=t.value[0].weathers,e.weather.alarms=t.value[0].alarms,e.weather.realtime=t.value[0].realtime,e.weather.indexes=t.value[0].indexes;for(var r=e.weather.weathers,s=0,i=0,h=0;h<r.length;h++)h===r.length-1?(e.weather.day_c.unshift(parseFloat(r[h].temp_day_c)),e.weather.night_c.unshift(parseFloat(r[h].temp_night_c)),e.weather.dateArr.unshift(r[h].date.split("-")[1]+"-"+r[h].date.split("-")[2])):(e.weather.day_c.push(parseFloat(r[h].temp_day_c)),e.weather.night_c.push(parseFloat(r[h].temp_night_c)),e.weather.dateArr.push(r[h].date.split("-")[1]+"-"+r[h].date.split("-")[2])),0===h?(i=e.weather.day_c[0],s=e.weather.night_c[0]):(e.weather.day_c[h]>i&&(i=e.weather.day_c[h]),e.weather.night_c[h]<s&&(s=e.weather.night_c[h]));var n=t.value[0].weatherDetailsInfo.weather3HoursDetailsInfos;e.weather.publishTime=t.value[0].weatherDetailsInfo.publishTime;for(var o=0;o<n.length;o++){var c=n[o].endTime.split(" ")[1].split(":");e.weather.hours_c.push(parseFloat(n[o].highestTemperature)),e.weather.timeArr.push(c[0]+":"+c[1])}e.$refs.seven.updateSeries([{name:"最高温",data:e.weather.day_c},{name:"最低温",data:e.weather.night_c}],!0),e.$refs.future.updateSeries([{name:"未来气温",data:e.weather.hours_c}]),e.$refs.seven.updateOptions({xaxis:{categories:e.weather.dateArr},yaxis:{min:s-5,max:i+5},title:{text:e.weather.provinceName+" - "+e.weather.countyName+"未来七日气温",align:"center"}},!0,!0),e.$refs.future.updateOptions({xaxis:{categories:e.weather.timeArr},title:{text:e.weather.provinceName+" - "+e.weather.countyName+"未来气温细节",align:"center"}},!0,!0)}}).catch(function(a){e.$message.error("天气查询失败")}):this.$message.warning("请选择城市")}}},h={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticStyle:{width:"100%",padding:"0 1rem"}},[t("div",{staticClass:"global-search-main"},[t("div",{staticClass:"global-search-wrapper"},[t("a-auto-complete",{staticClass:"global-search",attrs:{dataSource:e.dataSource,placeholder:"请输入城市名"},on:{select:e.onSelect,search:e.handleSearch}},[t("a-input",[t("a-button",{staticClass:"search-btn",attrs:{slot:"suffix",type:"primary"},on:{click:function(a){return a.stopPropagation(),e.searchWeather(a)}},slot:"suffix"},[t("a-icon",{attrs:{type:"search"}})],1)],1)],1)],1)]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"weather-area"},[t("div",{staticClass:"weather-chart-info"},[t("apexchart",{ref:"seven",attrs:{height:"350",type:"line",options:e.seven.chartOptions,series:e.seven.series}})],1),e._v(" "),t("div",{staticClass:"weather-chart-info"},[t("apexchart",{ref:"future",attrs:{height:"350",type:"area",options:e.future.chartOptions,series:e.future.series}})],1)]),e._v(" "),t("div",{staticClass:"weather-area"},[t("div",{staticClass:"weather-info"},[t("a-card",{attrs:{loading:e.loading,title:this.weather.countyName+" 当前天气"}},[t("a-row",[t("a-col",{attrs:{span:8}},[t("p",[e._v("天气："+e._s(this.weather.realtime.weather))])]),e._v(" "),t("a-col",{attrs:{span:8}},[t("p",[e._v("风向："+e._s(this.weather.realtime.wD))])]),e._v(" "),t("a-col",{attrs:{span:8}},[t("p",[e._v("风力大小："+e._s(this.weather.realtime.wS))])])],1),e._v(" "),t("a-row",[t("a-col",{attrs:{span:8}},[t("p",[e._v("温度："+e._s(this.weather.realtime.temp)+"℃")])]),e._v(" "),t("a-col",{attrs:{span:8}},[t("p",[e._v("体感温度："+e._s(this.weather.realtime.sendibleTemp)+"℃")])]),e._v(" "),t("a-col",{attrs:{span:8}},[t("p",[e._v("空气湿度："+e._s(this.weather.realtime.sD)+"%")])])],1),e._v(" "),t("a-row",[t("a-col",{attrs:{span:8}},[t("p",[e._v("更新时间："+e._s(this.weather.realtime.time))])])],1)],1)],1),e._v(" "),t("div",{staticClass:"weather-info"},[t("a-card",{attrs:{loading:e.loading,title:this.weather.countyName+" 未来天气"}},[t("a-row",e._l(this.weather.weathers,function(a,r){return t("a-col",{key:r,attrs:{span:24}},[6!==r?[t("p",[e._v(e._s(a.date)+"【"+e._s(a.week)+"】：日出时间 --- "+e._s(a.sun_rise_time)+"      日落时间 --- "+e._s(a.sun_down_time)+"      天气 --- "+e._s(a.weather))])]:e._e()],2)}))],1)],1),e._v(" "),t("div",{staticClass:"weather-info"},[t("a-card",{attrs:{loading:e.loading,title:this.weather.countyName+" 生活指数"}},[t("a-row",e._l(this.weather.indexes,function(a,r){return t("a-col",{key:r,attrs:{span:24}},[t("p",[e._v(e._s(a.name)+" --- "+e._s(a.content))])])}))],1)],1),e._v(" "),this.weather.alarms.length?t("div",{staticClass:"weather-info"},[t("a-card",{attrs:{loading:e.loading,title:this.weather.countyName+" 预警信息"}},[t("a-col",{attrs:{span:24}},[t("p",[e._v("预警标题 --- "+e._s(this.weather.alarms[0].alarmDesc))]),e._v(" "),t("p",[e._v("预警类型 --- "+e._s(this.weather.alarms[0].alarmTypeDesc))]),e._v(" "),t("p",[e._v("预警等级 --- "+e._s(this.weather.alarms[0].alarmLevelNoDesc))]),e._v(" "),t("p",[e._v("发布时间 --- "+e._s(this.weather.alarms[0].publishTime))]),e._v(" "),t("p",[e._v("预防措施 --- "+e._s(this.weather.alarms[0].precaution))]),e._v(" "),t("a-popover",{attrs:{title:"预警详情"}},[t("template",{slot:"content"},[t("div",{staticStyle:{"max-width":"360px"}},[e._v(e._s(this.weather.alarms[0].alarmContent))])]),e._v(" "),t("p",[e._v("预警详情 --- "+e._s(this.weather.alarms[0].alarmContent))])],2)],1)],1)],1):e._e()])])},staticRenderFns:[]},n=t("VU/8")(i,h,!1,function(e){t("YXIN")},null,null);a.default=n.exports}});