(this.webpackJsonpkcra=this.webpackJsonpkcra||[]).push([[15],{376:function(e,t,r){"use strict";var a=r(2),n=r(5),o=r(0),l=r(100),c=r(153);function i(e){return!(!e||!e.then)}t.a=function(e){var t=o.useRef(!1),r=o.useRef(),s=o.useState(!1),p=Object(n.a)(s,2),u=p[0],d=p[1];o.useEffect((function(){var t;if(e.autoFocus){var a=r.current;t=setTimeout((function(){return a.focus()}))}return function(){t&&clearTimeout(t)}}),[]);var j=e.type,m=e.children,b=e.prefixCls,y=e.buttonProps;return o.createElement(l.a,Object(a.a)({},Object(c.a)(j),{onClick:function(r){var a=e.actionFn,n=e.close;if(!t.current)if(t.current=!0,a){var o;if(e.emitEvent){if(o=a(r),e.quitOnNullishReturnValue&&!i(o))return t.current=!1,void n(r)}else if(a.length)o=a(n),t.current=!1;else if(!(o=a()))return void n();!function(r){var a=e.close;i(r)&&(d(!0),r.then((function(){d(!1),a.apply(void 0,arguments),t.current=!1}),(function(e){console.error(e),d(!1),t.current=!1})))}(o)}else n()},loading:u,prefixCls:b},y,{ref:r}),m)}},390:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"e",(function(){return u})),r.d(t,"b",(function(){return d})),r.d(t,"d",(function(){return j})),r.d(t,"c",(function(){return b}));var a,n=r(51),o=r.n(n),l=r(69),c=r(70),i=r.n(c),s=r(11),p=function(e,t,r){return function(){var n=Object(l.a)(o.a.mark((function n(l){var c,p;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c={"Content-Type":"application/json"},p=e,n.next=4,i()({method:"POST",url:s.a+"property/add-property",data:p,headers:c}).then((function(e){200===e.data.statuscode?(t.length>0&&l(m(t,"image",e.data.data)),r.length>0&&l(m(r,"video",e.data.data)),l({type:s.t,payload:{isError:!0,isErrorType:"SUCCESS",errMessage:e.data.message}}),clearTimeout(a),a=setTimeout((function(){l({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)):(l({type:s.t,payload:{isError:!0,isErrorType:"FAIL",errMessage:e.data.message}}),clearTimeout(a),a=setTimeout((function(){l({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3))})).catch((function(e){l({type:s.t,payload:{isError:!0,isErrorType:"FAIL",errMessage:"Something went wrong! Please try again later"}}),clearTimeout(a),a=setTimeout((function(){l({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)}));case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},u=function(){return function(){var e=Object(l.a)(o.a.mark((function e(t){var r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:s.l,payload:!0}),r={"Content-Type":"application/json"},a={},e.next=5,i()({method:"POST",url:s.a+"property/list-property",data:a,headers:r}).then((function(e){200===e.data.statuscode?(t({type:s.l,payload:!1}),t({type:s.f,payload:e.data.data})):(t({type:s.l,payload:!1}),t({type:s.f,payload:[]}))})).catch((function(e){t({type:s.l,payload:!1}),t({type:s.f,payload:[]})}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(l.a)(o.a.mark((function t(r){var n,l;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={"Content-Type":"application/json"},l=e,t.next=4,i()({method:"POST",url:s.a+"property/delete-property",data:l,headers:n}).then((function(e){200===e.data.statuscode?(r(u()),r({type:s.t,payload:{isError:!0,isErrorType:"SUCCESS",errMessage:e.data.message}}),clearTimeout(a),a=setTimeout((function(){r({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)):(r({type:s.t,payload:{isError:!0,isErrorType:"FAIL",errMessage:e.data.message}}),clearTimeout(a),a=setTimeout((function(){r({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3))})).catch((function(e){r({type:s.t,payload:{isError:!0,isErrorType:"FAIL",errMessage:"Something went wrong! Please try again later"}}),clearTimeout(a),a=setTimeout((function(){r({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},j=function(e,t,r){return function(){var n=Object(l.a)(o.a.mark((function n(l){var c,p;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c={"Content-Type":"application/json"},p=e,n.next=4,i()({method:"POST",url:s.a+"property/edit-property",data:p,headers:c}).then((function(n){200===n.data.statuscode?(l(y(e.id)),t.length>0&&l(m(t,"image",n.data.data)),r.length>0&&l(m(r,"video",n.data.data)),l({type:s.t,payload:{isError:!0,isErrorType:"SUCCESS",errMessage:n.data.message}}),clearTimeout(a),a=setTimeout((function(){l({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)):(l({type:s.t,payload:{isError:!0,isErrorType:"FAIL",errMessage:n.data.message}}),clearTimeout(a),a=setTimeout((function(){l({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3))})).catch((function(e){l({type:s.t,payload:{isError:!0,isErrorType:"FAIL",errMessage:"Something went wrong! Please try again later"}}),clearTimeout(a),a=setTimeout((function(){l({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)}));case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},m=function(e,t,r){return function(){var a=Object(l.a)(o.a.mark((function a(n){var l,c;return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return(l=new FormData).append("mediaType",t),l.append("property_id",r),e.forEach((function(e){l.append("files",e)})),c={"Content-Type":"application/json"},a.next=7,i()({method:"POST",url:s.a+"property/add-property-files",data:l,headers:c}).then((function(e){200===e.data.statuscode&&n(y(r))})).catch((function(e){}));case 7:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},b=function(e){return function(){var t=Object(l.a)(o.a.mark((function t(r){var n,l;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={"Content-Type":"application/json"},l=e,t.next=4,i()({method:"POST",url:s.a+"property/delete-file",data:l,headers:n}).then((function(t){200===t.data.statuscode?(r(y(e.property)),r({type:s.t,payload:{isError:!0,isErrorType:"SUCCESS",errMessage:t.data.message}}),clearTimeout(a),a=setTimeout((function(){r({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)):(r({type:s.t,payload:{isError:!0,isErrorType:"FAIL",errMessage:t.data.message}}),clearTimeout(a),a=setTimeout((function(){r({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3))})).catch((function(e){r({type:s.t,payload:{isError:!0,isErrorType:"FAIL",errMessage:"Something went wrong! Please try again later"}}),clearTimeout(a),a=setTimeout((function(){r({type:s.t,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},y=function(e){return function(){var t=Object(l.a)(o.a.mark((function t(r){var a,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:s.l,payload:!0}),a={"Content-Type":"application/json"},n={id:e},t.next=5,i()({method:"POST",url:s.a+"property/property-by-id",data:n,headers:a}).then((function(e){200===e.data.statuscode?r({type:s.z,payload:e.data.data}):r({type:s.z,payload:{}})})).catch((function(e){r({type:s.z,payload:{}})}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},418:function(e,t,r){"use strict";var a=r(2),n=r(5),o=r(0),l=r(6),c=r.n(l),i=r(58),s=r(156),p=r(49),u=r(102),d=r(100),j=r(153),m=r(101),b=r(56),y=r(57),f=r(140),h=r(20),O=r(68),x=r(376),g=void 0,v=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(r[a[n]]=e[a[n]])}return r},_=o.forwardRef((function(e,t){var r=o.useContext(y.b).getPrefixCls,l=Object(i.a)(!1,{value:e.visible,defaultValue:e.defaultVisible}),s=Object(n.a)(l,2),_=s[0],T=s[1],E=function(t,r){var a;T(t),null===(a=e.onVisibleChange)||void 0===a||a.call(e,t,r)},w=function(e){E(!1,e)},P=function(t){var r;return null===(r=e.onConfirm)||void 0===r?void 0:r.call(g,t)},C=function(t){var r;E(!1,t),null===(r=e.onCancel)||void 0===r||r.call(g,t)},N=e.prefixCls,S=e.placement,k=e.children,I=e.overlayClassName,F=v(e,["prefixCls","placement","children","overlayClassName"]),M=r("popover",N),L=r("popconfirm",N),A=c()(L,I),D=o.createElement(m.a,{componentName:"Popconfirm",defaultLocale:b.a.Popconfirm},(function(t){return function(t,n){var l=e.okButtonProps,c=e.cancelButtonProps,i=e.title,s=e.cancelText,p=e.okText,u=e.okType,m=e.icon;return o.createElement("div",{className:"".concat(t,"-inner-content")},o.createElement("div",{className:"".concat(t,"-message")},m,o.createElement("div",{className:"".concat(t,"-message-title")},Object(f.a)(i))),o.createElement("div",{className:"".concat(t,"-buttons")},o.createElement(d.a,Object(a.a)({onClick:C,size:"small"},c),s||n.cancelText),o.createElement(x.a,{buttonProps:Object(a.a)(Object(a.a)({size:"small"},Object(j.a)(u)),l),actionFn:P,close:w,prefixCls:r("btn"),quitOnNullishReturnValue:!0,emitEvent:!0},p||n.okText)))}(M,t)})),q=r();return o.createElement(u.a,Object(a.a)({},F,{prefixCls:M,placement:S,onVisibleChange:function(t){e.disabled||E(t)},visible:_,overlay:D,overlayClassName:A,ref:t,transitionName:Object(O.b)(q,"zoom-big",e.transitionName)}),Object(h.a)(k,{onKeyDown:function(e){var t,r;o.isValidElement(k)&&(null===(r=null===k||void 0===k?void 0:(t=k.props).onKeyDown)||void 0===r||r.call(t,e)),function(e){e.keyCode===p.a.ESC&&_&&E(!1,e)}(e)}}))}));_.defaultProps={placement:"top",trigger:"click",okType:"primary",icon:o.createElement(s.a,null),disabled:!1},t.a=_},597:function(e,t,r){"use strict";r.r(t);var a=r(7),n=r(157),o=r(137),l=r(0),c=r(489),i=r(586),s=r(603),p=r(604),u=r(214),d=r(610),j=r(449),m=r(450),b=r(588),y=r(607),f=r(418),h=r(100),O=r(354),x=r(613),g=r(448),v=r(28),_=r(29),T=r(390),E=r(26),w=r(11),P=r(3),C=c.a.Option,N=i.a.TabPane,S=s.a.Dragger;t.default=Object(E.b)((function(e){return{isError:e.property.isError,errMessage:e.property.errMessage,isErrorType:e.property.isErrorType,singleData:e.property.singleData}}),{editProperty:T.d,deletePropertyFile:T.c})((function(e){var t=e.editProperty,r=e.errMessage,s=e.isError,T=e.isErrorType,E=e.singleData,k=e.deletePropertyFile,I=p.a.useForm(),F=Object(o.a)(I,1)[0],M=Object(v.g)();Object(l.useEffect)((function(){Object.keys(E).length>0?F.setFieldsValue({property_type:null!==E.property_type?E.property_type:"",property_location:null!==E.property_location?E.property_location:"",property_locality:null!==E.property_locality?E.property_locality:"",property_area:null!==E.property_area?E.property_area:"",property_front:null!==E.property_front?E.property_front:"",property_deep:null!==E.property_deep?E.property_deep:"",plot_face:null!==E.plot_face?E.plot_face:"",corner_plot:null!==E.corner_plot?E.corner_plot:"",no_of_open_sides:null!==E.no_of_open_sides?E.no_of_open_sides:"",plot_boundaries:null!==E.plot_boundaries?E.plot_boundaries:"",facing_road_width:null!==E.facing_road_width?E.facing_road_width:"",plot_land_mark:null!==E.plot_land_mark?E.plot_land_mark:"",source_name:null!==E.source_name?E.source_name:"",near_by:null!==E.near_by?E.near_by:"",expected_price:null!==E.expected_price?E.expected_price:"",price_per_sqft:null!==E.price_per_sqft?E.price_per_sqft:"",google_map_link:null!==E.google_map_link?E.google_map_link:""}):M.push("/app/property-management")}),[E,F,M]);var L=Object(l.useState)([]),A=Object(o.a)(L,2),D=A[0],q=A[1],z=Object(l.useState)([]),R=Object(o.a)(z,2),U=R[0],V=R[1],B=Object(l.useState)(!1),G=Object(o.a)(B,2),K=G[0],J=G[1],W=Object(l.useState)(!1),Y=Object(o.a)(W,2),H=Y[0],Q=Y[1],X={multiple:!0,onRemove:function(e,t){var r=D.filter((function(t){return t.uid!==e.uid}));q(r)},beforeUpload:function(e,t){var r=!1,a=Object(n.a)(D);return t.forEach((function(e){if("image"!==e.type.split("/")[0])return r=!0,u.b.error("Invalid Image!"),J(!0),setTimeout((function(){q([]),J(!1)}),100),!1;a.push(e)})),r||q(a),!1},fileData:D},Z={multiple:!0,onRemove:function(e,t){var r=D.filter((function(t){return t.uid!==e.uid}));V(r)},beforeUpload:function(e,t){var r=!1,a=Object(n.a)(D);return t.forEach((function(t){if("video"!==e.type.split("/")[0])return r=!0,u.b.error("Invalid video!"),Q(!0),setTimeout((function(){V([]),Q(!1)}),100),!1;a.push(t)})),r||V(a),!1},fileData2:U};return Object(l.useEffect)((function(){s&&"SUCCESS"===T?u.b.success(r):s&&"FAIL"===T&&u.b.error(r)}),[s,T,r,F,M]),Object(P.jsx)("div",{children:Object(P.jsx)(d.a,{children:Object(P.jsxs)(j.a,{children:[Object(P.jsxs)(m.a,{lg:24,children:[Object(P.jsxs)("h4",{children:["Please fill the below details"," ",Object(P.jsx)("span",{className:"float-right",children:Object(P.jsxs)(_.b,{className:"btn btn-primary",style:{fontSize:"80%"},to:"/app/property-management",children:[Object(P.jsx)(O.a,{})," Go Back"]})})]}),Object(P.jsx)("hr",{className:"mb-3"})]}),Object(P.jsx)(m.a,{lg:24,children:Object(P.jsxs)(p.a,{form:F,layout:"vertical",name:"new-compliance",preserve:!1,onFinish:function(e){e.id=E.id,t(e,D,U),J(!0),Q(!0),q([]),V([]),setTimeout((function(){J(!1),Q(!1)}),100)},style:{fontSize:"14px"},children:[Object(P.jsxs)(i.a,{defaultActiveKey:"1",children:[Object(P.jsx)(N,{tab:"Details",className:"pl-2 pb-2 pr-2",children:Object(P.jsxs)(j.a,{gutter:16,children:[Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"property_type",label:Object(P.jsx)("span",{children:"Property Type"}),rules:[{required:!0,message:"Please provide value"}],children:Object(P.jsxs)(c.a,{showSearch:!0,style:{width:"100%"},placeholder:"Select Type",optionFilterProp:"children",onChange:function(e){},onFocus:function(){},onBlur:function(){},onSearch:function(){},filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:[Object(P.jsx)(C,{value:"Residential",children:"Residential"}),Object(P.jsx)(C,{value:"Investment",children:"Investment"}),Object(P.jsx)(C,{value:"Commercial",children:"Commercial"})]})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"property_location",label:Object(P.jsx)("span",{children:"Plot location "}),rules:[{required:!0,message:"Please provide value"}],children:Object(P.jsx)(b.a,{placeholder:"Plot location"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"property_locality",label:Object(P.jsx)("span",{children:"Plot Locality "}),children:Object(P.jsx)(b.a,{placeholder:"Plot Locality"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"property_area",label:Object(P.jsx)("span",{children:"Area "}),children:Object(P.jsx)(b.a,{placeholder:"Area"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"property_front",label:Object(P.jsx)("span",{children:"Front "}),children:Object(P.jsx)(b.a,{placeholder:"Front"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"property_deep",label:Object(P.jsx)("span",{children:"Deep "}),children:Object(P.jsx)(b.a,{placeholder:"Deep"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"plot_face",label:Object(P.jsx)("span",{children:"Plot Face "}),children:Object(P.jsx)(b.a,{placeholder:"Plot Face"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"corner_plot",label:Object(P.jsx)("span",{children:"Corner Plot "}),children:Object(P.jsx)(b.a,{placeholder:"Corner Plot"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"no_of_open_sides",label:Object(P.jsx)("span",{children:"No. of open sides"}),children:Object(P.jsxs)(c.a,{showSearch:!0,style:{width:"100%"},placeholder:"Select Type",optionFilterProp:"children",onChange:function(e){},onFocus:function(){},onBlur:function(){},onSearch:function(){},filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:[Object(P.jsx)(C,{value:"1",children:"1"}),Object(P.jsx)(C,{value:"2",children:"2"}),Object(P.jsx)(C,{value:"3",children:"3"}),Object(P.jsx)(C,{value:"4",children:"4"})]})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"plot_boundaries",label:Object(P.jsx)("span",{children:"Plot Boundary"}),children:Object(P.jsxs)(c.a,{showSearch:!0,style:{width:"100%"},placeholder:"Select Type",optionFilterProp:"children",onChange:function(e){},onFocus:function(){},onBlur:function(){},onSearch:function(){},filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:[Object(P.jsx)(C,{value:"Yes",children:"Yes"}),Object(P.jsx)(C,{value:"No",children:"No"})]})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"facing_road_width",label:Object(P.jsx)("span",{children:"Facing Road Width "}),children:Object(P.jsx)(b.a,{placeholder:"Facing Road Width"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"plot_land_mark",label:Object(P.jsx)("span",{children:"Plot Land Mark "}),children:Object(P.jsx)(b.a,{placeholder:"Plot Land Mark"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"near_by",label:Object(P.jsx)("span",{children:"Near by "}),children:Object(P.jsx)(b.a,{placeholder:"Near by"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"expected_price",label:Object(P.jsx)("span",{children:"Expected Price "}),rules:[{required:!0,message:"Please provide value"}],children:Object(P.jsx)(y.a,{style:{width:"100%"},placeholder:"Expected Price"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"price_per_sqft",label:Object(P.jsx)("span",{children:"Price Per sqft "}),children:Object(P.jsx)(y.a,{style:{width:"100%"},placeholder:"Price Per sqft"})})}),Object(P.jsx)(m.a,{lg:8,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"source_name",label:Object(P.jsx)("span",{children:"Source Name "}),children:Object(P.jsx)(b.a,{style:{width:"100%"},placeholder:"Source Name"})})}),Object(P.jsx)(m.a,{lg:16,children:Object(P.jsx)(p.a.Item,{className:"mb-3",name:"google_map_link",label:Object(P.jsx)("span",{children:"Google Map Link "}),children:Object(P.jsx)(b.a,{placeholder:"Google Map Link"})})})]})},"1"),Object(P.jsx)(N,{tab:"File Uploads",className:"pl-2 pb-2 pr-2",children:Object(P.jsxs)(j.a,{children:[!K&&Object(P.jsxs)(m.a,{lg:12,className:"pr-1 mb-3 mt-0",children:[Object(P.jsx)("h4",{children:"Image Upload"}),Object(P.jsx)(m.a,{lg:24,children:Object(P.jsxs)(S,Object(a.a)(Object(a.a)({},X),{},{children:[Object(P.jsx)("p",{className:"ant-upload-drag-icon",children:Object(P.jsx)(x.a,{})}),Object(P.jsx)("p",{className:"ant-upload-text",children:"Click or drag images to upload"})]}))})]}),!H&&Object(P.jsxs)(m.a,{lg:12,className:"pl-1  mb-3 mt-0",children:[Object(P.jsx)("h4",{children:"Video Upload"}),Object(P.jsx)(m.a,{lg:24,children:Object(P.jsxs)(S,Object(a.a)(Object(a.a)({},Z),{},{children:[Object(P.jsx)("p",{className:"ant-upload-drag-icon",children:Object(P.jsx)(x.a,{})}),Object(P.jsx)("p",{className:"ant-upload-text",children:"Click or drag images to upload"})]}))})]}),Object(P.jsxs)(m.a,{lg:24,className:"mt-2 overflow-auto border-bottom",children:[Object(P.jsx)("h5",{children:"Image List"}),null!==E&&E.hasOwnProperty("property_media")&&null!==E.property_media&&E.property_media.filter((function(e){return"image"===e.media_type})).map((function(e){return Object(P.jsxs)("div",{style:{width:"140px",height:"100px",float:"left",padding:"3px",position:"relative"},children:[Object(P.jsx)(f.a,{title:"Are you sure?",onConfirm:function(t){k({id:e.id,link:e.media_link,property:E.id})},children:Object(P.jsx)(h.a,{size:"small",type:"primary",danger:!0,style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:Object(P.jsx)(g.a,{})})}),Object(P.jsx)("img",{src:w.b+e.media_link,alt:"",className:"border",style:{width:"100%",height:"100%"}})]})}))]}),Object(P.jsxs)(m.a,{lg:24,className:"mt-2 overflow-auto ",children:[Object(P.jsx)("h5",{children:"Video List"}),null!==E&&E.hasOwnProperty("property_media")&&null!==E.property_media&&E.property_media.filter((function(e){return"video"===e.media_type})).map((function(e){return Object(P.jsxs)("div",{className:"w-100 overflow-auto mt-2 pb-2 border-bottom",children:[Object(P.jsx)("a",{href:w.b+e.media_link,target:"_blank",rel:"noreferrer",children:e.media_link}),Object(P.jsx)(f.a,{title:"Are you sure?",onConfirm:function(t){k({id:e.id,link:e.media_link,property:E.id})},children:Object(P.jsx)("span",{size:"small",type:"primary",danger:!0,style:{float:"right",cursor:"pointer",zIndex:"9"},children:Object(P.jsx)(g.a,{className:"text-danger"})})})]})}))]})]})},"2")]}),Object(P.jsx)("hr",{}),Object(P.jsx)(p.a.Item,{className:"text-left mb-2",children:Object(P.jsx)(h.a,{type:"primary",htmlType:"submit",children:"Save"})})]})})]})})})}))}}]);
//# sourceMappingURL=15.3c5842df.chunk.js.map