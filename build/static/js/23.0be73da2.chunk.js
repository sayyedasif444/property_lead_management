(this.webpackJsonpbodhi=this.webpackJsonpbodhi||[]).push([[23],{381:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"f",(function(){return d})),r.d(t,"b",(function(){return u})),r.d(t,"e",(function(){return j})),r.d(t,"c",(function(){return b})),r.d(t,"d",(function(){return y}));var a,n=r(51),c=r.n(n),s=r(69),o=r(71),l=r.n(o),i=r(8),p=function(e,t,r){return function(){var n=Object(s.a)(c.a.mark((function n(s){var o,p;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o={"Content-Type":"application/json"},p=e,n.next=4,l()({method:"POST",url:i.a+"property/add-property",data:p,headers:o}).then((function(e){200===e.data.statuscode?(t.length>0&&s(h(t,"image",e.data.data)),r.length>0&&s(h(r,"video",e.data.data)),s({type:i.L,payload:{isError:!0,isErrorType:"SUCCESS",errMessage:e.data.message}}),clearTimeout(a),a=setTimeout((function(){s({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)):(s({type:i.L,payload:{isError:!0,isErrorType:"FAIL",errMessage:e.data.message}}),clearTimeout(a),a=setTimeout((function(){s({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3))})).catch((function(e){s({type:i.L,payload:{isError:!0,isErrorType:"FAIL",errMessage:"Something went wrong! Please try again later"}}),clearTimeout(a),a=setTimeout((function(){s({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)}));case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},d=function(){return function(){var e=Object(s.a)(c.a.mark((function e(t){var r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:i.x,payload:!0}),r={"Content-Type":"application/json"},a={},e.next=5,l()({method:"POST",url:i.a+"property/list-property",data:a,headers:r}).then((function(e){200===e.data.statuscode?(t({type:i.x,payload:!1}),t({type:i.l,payload:e.data.data})):(t({type:i.x,payload:!1}),t({type:i.l,payload:[]}))})).catch((function(e){t({type:i.x,payload:!1}),t({type:i.l,payload:[]})}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},u=function(e){return function(){var t=Object(s.a)(c.a.mark((function t(r){var n,s;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={"Content-Type":"application/json"},s=e,t.next=4,l()({method:"POST",url:i.a+"property/delete-property",data:s,headers:n}).then((function(e){200===e.data.statuscode?(r(d()),r({type:i.L,payload:{isError:!0,isErrorType:"SUCCESS",errMessage:e.data.message}}),clearTimeout(a),a=setTimeout((function(){r({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)):(r({type:i.L,payload:{isError:!0,isErrorType:"FAIL",errMessage:e.data.message}}),clearTimeout(a),a=setTimeout((function(){r({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3))})).catch((function(e){r({type:i.L,payload:{isError:!0,isErrorType:"FAIL",errMessage:"Something went wrong! Please try again later"}}),clearTimeout(a),a=setTimeout((function(){r({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},j=function(e,t,r){return function(){var n=Object(s.a)(c.a.mark((function n(s){var o,p;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o={"Content-Type":"application/json"},p=e,n.next=4,l()({method:"POST",url:i.a+"property/edit-property",data:p,headers:o}).then((function(n){200===n.data.statuscode?(s(m(e.id)),t.length>0&&s(h(t,"image",n.data.data)),r.length>0&&s(h(r,"video",n.data.data)),s({type:i.L,payload:{isError:!0,isErrorType:"SUCCESS",errMessage:n.data.message}}),clearTimeout(a),a=setTimeout((function(){s({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)):(s({type:i.L,payload:{isError:!0,isErrorType:"FAIL",errMessage:n.data.message}}),clearTimeout(a),a=setTimeout((function(){s({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3))})).catch((function(e){s({type:i.L,payload:{isError:!0,isErrorType:"FAIL",errMessage:"Something went wrong! Please try again later"}}),clearTimeout(a),a=setTimeout((function(){s({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)}));case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},h=function(e,t,r){return function(){var a=Object(s.a)(c.a.mark((function a(n){var s,o;return c.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return(s=new FormData).append("mediaType",t),s.append("property_id",r),e.forEach((function(e){s.append("files",e)})),o={"Content-Type":"application/json"},a.next=7,l()({method:"POST",url:i.a+"property/add-property-files",data:s,headers:o}).then((function(e){200===e.data.statuscode&&n(m(r))})).catch((function(e){}));case 7:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},b=function(e){return function(){var t=Object(s.a)(c.a.mark((function t(r){var n,s;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={"Content-Type":"application/json"},s=e,t.next=4,l()({method:"POST",url:i.a+"property/delete-file",data:s,headers:n}).then((function(t){200===t.data.statuscode?(r(m(e.property)),r({type:i.L,payload:{isError:!0,isErrorType:"SUCCESS",errMessage:t.data.message}}),clearTimeout(a),a=setTimeout((function(){r({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)):(r({type:i.L,payload:{isError:!0,isErrorType:"FAIL",errMessage:t.data.message}}),clearTimeout(a),a=setTimeout((function(){r({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3))})).catch((function(e){r({type:i.L,payload:{isError:!0,isErrorType:"FAIL",errMessage:"Something went wrong! Please try again later"}}),clearTimeout(a),a=setTimeout((function(){r({type:i.L,payload:{isError:!1,isErrorType:null,errMessage:null}})}),1e3)}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},m=function(e){return function(){var t=Object(s.a)(c.a.mark((function t(r){var a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:i.x,payload:!0}),a={"Content-Type":"application/json"},n={id:e},t.next=5,l()({method:"POST",url:i.a+"property/property-by-id",data:n,headers:a}).then((function(e){200===e.data.statuscode?r({type:i.X,payload:e.data.data}):r({type:i.X,payload:{}})})).catch((function(e){r({type:i.X,payload:{}})}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},y=function(e){return function(){var t=Object(s.a)(c.a.mark((function t(r){var a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={"Content-Type":"application/json"},n={id:e},t.next=4,l()({method:"POST",url:i.a+"property/download-file",data:n,headers:a}).then((function(e){if(200===e.data.statuscode){var t=document.createElement("a");t.download=e.data.name,t.href=i.c+e.data.data,t.target="_blank",document.body.appendChild(t),t.click(),document.body.removeChild(t)}})).catch((function(e){}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},434:function(e,t,r){"use strict";r.r(t);var a=r(4),n=r(162),c=r(137),s=r(0),o=r(406),l=r(426),i=r(441),p=r(442),d=r(211),u=r(457),j=r(397),h=r(398),b=r(428),m=r(445),y=r(100),f=r(353),O=r(460),x=r(28),g=r(29),T=r(381),E=r(26),v=r(3),w=o.a.Option,L=l.a.TabPane,S=i.a.Dragger;t.default=Object(E.b)((function(e){return{isError:e.property.isError,errMessage:e.property.errMessage,isErrorType:e.property.isErrorType}}),{addProperty:T.a})((function(e){var t=e.addProperty,r=e.errMessage,i=e.isError,T=e.isErrorType,E=p.a.useForm(),P=Object(c.a)(E,1)[0],C=Object(s.useState)([]),N=Object(c.a)(C,2),I=N[0],M=N[1],F=Object(s.useState)([]),_=Object(c.a)(F,2),k=_[0],A=_[1],U=Object(s.useState)(!1),D=Object(c.a)(U,2),q=D[0],R=D[1],B=Object(s.useState)(!1),G=Object(c.a)(B,2),X=G[0],z=G[1],J={multiple:!0,onRemove:function(e,t){var r=I.filter((function(t){return t.uid!==e.uid}));M(r)},onChange:function(e,t){var r=!1;return t.forEach((function(t){if("image"!==e.type.split("/")[0])return r=!0,d.b.error("Invalid Image!"),R(!0),setTimeout((function(){R(!1)}),100),!1})),r||M(Object(n.a)(t)),!1},beforeUpload:function(e,t){var r=!1;return t.forEach((function(t){if("image"!==e.type.split("/")[0])return r=!0,d.b.error("Invalid Image!"),R(!0),setTimeout((function(){R(!1)}),100),!1})),r||M(Object(n.a)(t)),!1},fileData:I},W={multiple:!0,onRemove:function(e,t){var r=I.filter((function(t){return t.uid!==e.uid}));A(r)},beforeUpload:function(e,t){var r=!1;return t.forEach((function(t){if("video"!==e.type.split("/")[0])return r=!0,d.b.error("Invalid video!"),z(!0),setTimeout((function(){z(!1)}),100),!1})),r||A(Object(n.a)(t)),!1},fileData2:k},Y=Object(x.g)();return Object(s.useEffect)((function(){i&&"SUCCESS"===T?(setTimeout((function(){P.resetFields(),Y.push("/app/property-management")}),1e3),d.b.success(r)):i&&"FAIL"===T&&d.b.error(r)}),[i,T,r,P,Y]),Object(v.jsx)("div",{children:Object(v.jsx)(u.a,{children:Object(v.jsxs)(j.a,{children:[Object(v.jsxs)(h.a,{lg:24,children:[Object(v.jsxs)("h4",{children:["Please fill the below details"," ",Object(v.jsx)("span",{className:"float-right",children:Object(v.jsxs)(g.b,{className:"btn btn-primary",style:{fontSize:"80%"},to:"/app/property-management",children:[Object(v.jsx)(f.a,{})," Go Back"]})})]}),Object(v.jsx)("hr",{className:"mb-3"})]}),Object(v.jsx)(h.a,{lg:24,children:Object(v.jsxs)(p.a,{form:P,layout:"vertical",name:"new-compliance",preserve:!1,onFinish:function(e){t(e,I,k),R(!0),z(!0),setTimeout((function(){R(!1),z(!1)}),100)},style:{fontSize:"14px"},children:[Object(v.jsxs)(l.a,{defaultActiveKey:"1",children:[Object(v.jsx)(L,{tab:"Details",className:"pl-2 pb-2 pr-2",children:Object(v.jsxs)(j.a,{gutter:16,children:[Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"property_type",label:Object(v.jsx)("span",{children:"Property Type"}),rules:[{required:!0,message:"Please provide value"}],children:Object(v.jsxs)(o.a,{showSearch:!0,style:{width:"100%"},placeholder:"Select Type",optionFilterProp:"children",onChange:function(e){},onFocus:function(){},onBlur:function(){},onSearch:function(){},filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:[Object(v.jsx)(w,{value:"Residential",children:"Residential"}),Object(v.jsx)(w,{value:"Investment",children:"Investment"}),Object(v.jsx)(w,{value:"Commercial",children:"Commercial"})]})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"property_location",label:Object(v.jsx)("span",{children:"Plot location "}),rules:[{required:!0,message:"Please provide value"}],children:Object(v.jsx)(b.a,{placeholder:"Plot location"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"property_locality",label:Object(v.jsx)("span",{children:"Plot Locality "}),children:Object(v.jsx)(b.a,{placeholder:"Plot Locality"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"property_area",label:Object(v.jsx)("span",{children:"Area "}),children:Object(v.jsx)(b.a,{placeholder:"Area"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"property_front",label:Object(v.jsx)("span",{children:"Front "}),children:Object(v.jsx)(b.a,{placeholder:"Front"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"property_deep",label:Object(v.jsx)("span",{children:"Deep "}),children:Object(v.jsx)(b.a,{placeholder:"Deep"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"plot_face",label:Object(v.jsx)("span",{children:"Plot Face "}),children:Object(v.jsx)(b.a,{placeholder:"Plot Face"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"corner_plot",label:Object(v.jsx)("span",{children:"Corner Plot "}),children:Object(v.jsx)(b.a,{placeholder:"Corner Plot"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"no_of_open_sides",label:Object(v.jsx)("span",{children:"No. of open sides"}),children:Object(v.jsxs)(o.a,{showSearch:!0,style:{width:"100%"},placeholder:"Select Type",optionFilterProp:"children",onChange:function(e){},onFocus:function(){},onBlur:function(){},onSearch:function(){},filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:[Object(v.jsx)(w,{value:"1",children:"1"}),Object(v.jsx)(w,{value:"2",children:"2"}),Object(v.jsx)(w,{value:"3",children:"3"}),Object(v.jsx)(w,{value:"4",children:"4"})]})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"plot_boundaries",label:Object(v.jsx)("span",{children:"Plot Boundary"}),children:Object(v.jsxs)(o.a,{showSearch:!0,style:{width:"100%"},placeholder:"Select Type",optionFilterProp:"children",onChange:function(e){},onFocus:function(){},onBlur:function(){},onSearch:function(){},filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0},children:[Object(v.jsx)(w,{value:"Yes",children:"Yes"}),Object(v.jsx)(w,{value:"No",children:"No"})]})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"facing_road_width",label:Object(v.jsx)("span",{children:"Facing Road Width "}),children:Object(v.jsx)(b.a,{placeholder:"Facing Road Width"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"plot_land_mark",label:Object(v.jsx)("span",{children:"Plot Land Mark "}),children:Object(v.jsx)(b.a,{placeholder:"Plot Land Mark"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"near_by",label:Object(v.jsx)("span",{children:"Near by "}),children:Object(v.jsx)(b.a,{placeholder:"Near by"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"expected_price",label:Object(v.jsx)("span",{children:"Expected Price "}),rules:[{required:!0,message:"Please provide value"}],children:Object(v.jsx)(m.a,{style:{width:"100%"},placeholder:"Expected Price"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"price_per_sqft",label:Object(v.jsx)("span",{children:"Price Per sqft "}),children:Object(v.jsx)(m.a,{style:{width:"100%"},placeholder:"Price Per sqft"})})}),Object(v.jsx)(h.a,{lg:8,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"source_name",label:Object(v.jsx)("span",{children:"Source Name "}),children:Object(v.jsx)(b.a,{style:{width:"100%"},placeholder:"Source Name"})})}),Object(v.jsx)(h.a,{lg:16,children:Object(v.jsx)(p.a.Item,{className:"mb-3",name:"google_map_link",label:Object(v.jsx)("span",{children:"Google Map Link "}),children:Object(v.jsx)(b.a,{placeholder:"Google Map Link"})})})]})},"1"),Object(v.jsx)(L,{tab:"File Uploads",className:"pl-2 pb-2 pr-2",children:Object(v.jsxs)(j.a,{children:[!q&&Object(v.jsxs)(h.a,{lg:12,className:"pr-1 mb-3 mt-0",children:[Object(v.jsx)("h4",{children:"Image Upload"}),Object(v.jsx)(h.a,{lg:24,children:Object(v.jsxs)(S,Object(a.a)(Object(a.a)({},J),{},{children:[Object(v.jsx)("p",{className:"ant-upload-drag-icon",children:Object(v.jsx)(O.a,{})}),Object(v.jsx)("p",{className:"ant-upload-text",children:"Click or drag images to upload"})]}))})]}),!X&&Object(v.jsxs)(h.a,{lg:12,className:"pl-1 mb-3 mt-0",children:[Object(v.jsx)("h4",{children:"Video Upload"}),Object(v.jsx)(h.a,{lg:24,children:Object(v.jsxs)(S,Object(a.a)(Object(a.a)({},W),{},{children:[Object(v.jsx)("p",{className:"ant-upload-drag-icon",children:Object(v.jsx)(O.a,{})}),Object(v.jsx)("p",{className:"ant-upload-text",children:"Click or drag images to upload"})]}))})]})]})},"2")]}),Object(v.jsx)("hr",{}),Object(v.jsx)(p.a.Item,{className:"text-left mb-2",children:Object(v.jsx)(y.a,{type:"primary",htmlType:"submit",children:"Save"})})]})})]})})})}))}}]);
//# sourceMappingURL=23.0be73da2.chunk.js.map