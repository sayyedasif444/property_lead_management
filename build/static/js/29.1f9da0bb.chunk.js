(this.webpackJsonpbodhi=this.webpackJsonpbodhi||[]).push([[29],{615:function(e,t,r){"use strict";r.r(t);var c=r(169),a=r(6),i=r(138),s=r(0),n=r(638),l=r(224),p=r(475),o=r(476),d=r(610),j=r(626),u=r(101),b=r(359),x=r(392),O=r(397),f=r(394),m=r(376),h=r(473),y=r(31),g=r(32),_=r(29),v=r(171),w=r(1),C=r(63),E=r(5),L=n.a.Meta;t.default=Object(_.b)((function(e){return{data:e.property.data,loading:e.property.loading,isError:e.property.isError,errMessage:e.property.errMessage,isErrorType:e.property.isErrorType,isAuthenticated:e.auth.isAuthenticated}}),{listProperty:v.f,deleteProperty:v.b})((function(e){var t=e.data,r=e.loading,_=(e.listProperty,e.errMessage),v=e.isError,N=e.isErrorType,A=e.deleteProperty,S=(e.isAuthenticated,Object(s.useState)([])),P=Object(i.a)(S,2),k=P[0],M=P[1];Object(s.useEffect)((function(){M(t.map((function(e){return Object(a.a)(Object(a.a)({},e),{},{expected_price:null!==e.expected_price?e.expected_price:0})})))}),[t]);var D=Object(s.useState)([]),I=Object(i.a)(D,2),F=I[0],T=I[1],z=Object(s.useState)(""),J=Object(i.a)(z,2),R=J[0],U=J[1],Y=Object(s.useState)([]),q=Object(i.a)(Y,2),B=q[0],G=q[1];Object(s.useEffect)((function(){G(k.filter((function(e){return e.isActive})).map((function(e,t){return Object(a.a)(Object(a.a)({},e),{},{propert_id:"PROPERTY"+(t+1),expected_price:null!==e.expected_price?parseInt(e.expected_price):0})}))),$(Math.max.apply(Math,Object(c.a)(k.map((function(e){return null!==e.expected_price?parseInt(e.expected_price):0}))))/1e5)}),[k]);var H=Object(s.useState)([0,0]),K=Object(i.a)(H,2),Q=K[0],V=K[1];Object(s.useEffect)((function(){var e=[];e=0===Q[1]?B:B.filter((function(e){return parseInt(e.expected_price)>=1e5*Q[0]&&parseInt(e.expected_price)<=1e5*Q[1]})),""!==R&&null!==R&&null!==B&&(e=B.filter((function(e){return null!==e.property_type&&e.property_type.toLowerCase().indexOf(R.toLowerCase())>-1||null!==e.property_location&&e.property_location.toLowerCase().indexOf(R.toLowerCase())>-1||null!==e.propert_id&&e.propert_id.toLowerCase().indexOf(R.toLowerCase())>-1||null!==e.property_locality&&e.property_locality.toLowerCase().indexOf(R.toLowerCase())>-1||null!==e.property_area&&e.property_area.toLowerCase().indexOf(R.toLowerCase())>-1}))),T(e)}),[B,R,Q]),Object(s.useEffect)((function(){v&&"SUCCESS"===N?l.b.success(_):v&&"FAIL"===N&&l.b.error(_)}),[v,N,_]);var W=Object(s.useState)(null),X=Object(i.a)(W,2),Z=X[0],$=X[1];Object(s.useEffect)((function(){V(null!==Z?[0,Z]:[0,0])}),[Z]);var ee=Object(y.g)();return Object(E.jsx)("div",{children:Object(E.jsxs)(p.a,{children:[Object(E.jsx)(o.a,{sm:24,className:"border-bottom mb-3",children:Object(E.jsxs)(p.a,{children:[Object(E.jsx)(o.a,{sm:8,md:6,lg:5,className:"text-left mb-3",children:Object(E.jsx)(d.a,{placeholder:"Search",value:R,onChange:function(e){U(e.target.value)}})}),B.length>0&&null!==Z?Object(E.jsxs)(o.a,{sm:8,md:6,lg:5,className:"text-left mb-3 pl-3",children:[Object(E.jsxs)("span",{children:["Price: ",Q[0]," to ",Q[1],"L"," "]}),Object(E.jsx)(j.a,{range:!0,min:0,max:Z,value:Q,onChange:function(e){V(e)}})]}):Object(E.jsx)(o.a,{sm:8,md:6,lg:5,className:"text-left mb-3 pl-3"}),Object(E.jsx)(o.a,{sm:8,md:12,lg:14,className:"text-right mb-3",children:Object(E.jsx)(u.a,{type:"primary ",icon:Object(E.jsx)(O.a,{}),onClick:function(e){ee.push("/app/add-property")},children:"Add Property"})})]})}),r?Object(E.jsx)("div",{className:"spin-loader",children:Object(E.jsx)(b.a,{tip:"Loading...",size:"large"})}):F.map((function(e,t){return Object(E.jsx)(o.a,{sm:24,md:12,lg:8,className:"pr-3",children:Object(E.jsx)(n.a,{style:{width:"100%"},cover:Object(E.jsx)("img",{alt:"example",src:null===e.property_media?"/img/noimage.jpg":e.property_media.filter((function(e){return"image"===e.media_type})).length>0?w.b+e.property_media.filter((function(e){return"image"===e.media_type}))[0].media_link:"/img/noimage.jpg",style:{width:"100%",height:"190px",objectFit:"cover"}}),actions:[Object(E.jsx)(x.a,{title:"Are you sure?",onConfirm:function(t){A({id:e.id,isActive:!e.isActive})},children:Object(E.jsx)(g.b,{onClick:function(e){e.preventDefault()},to:"#!",children:Object(E.jsx)(f.a,{className:"text-danger"},"Delete")})}),Object(E.jsx)(g.b,{onClick:function(t){t.preventDefault(),C.a.dispatch({type:w.cb,payload:e}),ee.push("/app/edit-property")},to:"#!",children:Object(E.jsx)(m.a,{className:"text-success"},"edit")}),Object(E.jsx)(g.b,{onClick:function(t){t.preventDefault(),C.a.dispatch({type:w.cb,payload:e}),ee.push("/app/view-property")},to:"#!",children:Object(E.jsx)(h.a,{className:"text-primary"},"Download")})],children:Object(E.jsx)(L,{title:Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)("span",{children:"#"+e.propert_id}),Object(E.jsx)("small",{className:"float-right",children:e.createdAt.substr(0,10).split("-").reverse().join("-")})]}),description:Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)("p",{className:"float-left mb-0 pb-0 w-100 text-capitalize",children:e.property_location}),Object(E.jsx)("div",{style:{width:"60%",float:"left"},children:null!==e.user?e.user.first_name+" "+e.user.last_name:""}),Object(E.jsxs)("div",{className:"text-right",style:{width:"40%",float:"left"},children:["Price:"," ",null!==e.expected_price?e.expected_price:""]})]})})})},t)}))]})})}))}}]);
//# sourceMappingURL=29.1f9da0bb.chunk.js.map