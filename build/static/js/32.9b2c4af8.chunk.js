(this.webpackJsonpbodhi=this.webpackJsonpbodhi||[]).push([[32],{631:function(e,t,s){"use strict";s.r(t);var a=s(0),r=s(6),i=s(138),c=s(4),n=s.n(c),l=s(8),o=s(29),d=s(642),j=s(624),u=s(610),m=s(101),h=s(644),b=s(2),p={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"}}]},name:"lock",theme:"outlined"},x=s(13),O=function(e,t){return a.createElement(x.a,Object(b.a)(Object(b.a)({},e),{},{ref:t,icon:p}))};O.displayName="LockOutlined";var g=a.forwardRef(O),f=s(179),y=s(31),v=s(32),w=s(516),W=s(63),N=s(1),P=s(207),k=s(171),E=s(141),T=s(167),M=s(140),S=s(172),I=s(158),L=s(160),U=s(142),V=s(173),z=s(175),F=s(5),R=Object(o.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated,isError:e.auth.isError,errMessage:e.auth.errMessage,isErrorType:e.auth.isErrorType,isMainLoading:e.auth.loading,isOtp:e.auth.isOtp}}),{login:f.b,listProperty:k.f,listTask:E.d,listUser:T.d,listTaskUser:E.e,listLead:M.m,listSource:M.n,listMeeting:S.d,listProjects:I.p,listCustomers:L.n,listExpenseCategory:U.f,listExpense:U.e,listTransaction:V.d,listSalary:z.c})((function(e){var t=e.login,s=e.isAuthenticated,r=e.errMessage,c=e.isError,o=e.isErrorType,b=(e.isOtp,e.isMainLoading,e.listProperty),p=e.listTask,x=e.listUser,O=e.listTaskUser,f=e.listLead,k=e.listSource,E=e.listMeeting,T=e.listProjects,M=e.listCustomers,S=e.listExpenseCategory,I=e.listExpense,L=e.listTransaction,U=e.listSalary,V=function(){var e=Object(l.a)(n.a.mark((function e(s){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A(!0),W.a.dispatch({type:N.U}),e.next=4,t(s.email,s.password);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){c||A(!1)}),[c,o]);var z=Object(a.useState)(!1),R=Object(i.a)(z,2),q=R[0],A=R[1];return s?(Object(P.a)(sessionStorage.token),b(),p(),x(),O(),f(),U(),k(),E(),T(),M(),S(),I(),L(),Object(F.jsx)(y.a,{to:"/app"})):(W.a.dispatch({type:N.U}),Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(w.a.div,{initial:{opacity:0,marginBottom:0},animate:{opacity:c?1:0,marginBottom:c?20:0},className:"pt-2 ",children:c&&"LOGIN"===o&&Object(F.jsx)(d.a,{type:"error",showIcon:!0,message:r})}),Object(F.jsxs)(j.a,{layout:"vertical",name:"login-form",className:"text-white",onFinish:V,children:[Object(F.jsx)(j.a.Item,{name:"email",label:Object(F.jsx)("span",{className:"text-white",children:"Email"}),className:"mb-2",rules:[{required:!0,message:"Please input your email"},{type:"email",message:"Please enter a validate email!"},function(e){e.getFieldValue;return{validator:function(e,t){if(t){return/(\W*(<script)\W*)|(\W*(javascript)\W*)|(\W*(jquery)\W*)|(\W*(console.)\W*)|(\W*(<)\W*)|(\W*(>)\W*)/.test(t)?Promise.reject("Restricted character/word(s) detected."):Promise.resolve()}return Promise.resolve()}}}],children:Object(F.jsx)(u.a,{prefix:Object(F.jsx)(h.a,{className:"text-primary"})})}),Object(F.jsx)(j.a.Item,{name:"password",className:"text-white mb-4",label:Object(F.jsx)("div",{className:"",children:Object(F.jsx)("span",{className:"text-white",children:"Password"})}),rules:[{required:!0,message:"Please input your password"},function(e){e.getFieldValue;return{validator:function(e,t){if(t){return/(\W*(<script)\W*)|(\W*(javascript)\W*)|(\W*(jquery)\W*)|(\W*(console.)\W*)|(\W*(<)\W*)|(\W*(>)\W*)/.test(t)?Promise.reject("Restricted character/word(s) detected."):Promise.resolve()}return Promise.resolve()}}}],children:Object(F.jsx)(u.a.Password,{prefix:Object(F.jsx)(g,{className:"text-primary"})})}),Object(F.jsx)(j.a.Item,{className:"mb-2 mt-3",children:Object(F.jsx)(m.a,{type:"default",htmlType:"submit",block:!0,loading:q,children:"Sign In"})}),Object(F.jsx)("p",{className:"text-right text-white",children:Object(F.jsx)(v.b,{to:"/auth/forgot-password",className:"text-white",children:"Forgot Password"})})]})]}))})),q=s(475),A=s(476),C=s(638),B={backgroundImage:"",backgroundRepeat:"no-repeat",backgroundSize:"cover"},H=function(e){Object(o.c)((function(e){return e.theme.currentTheme}));return Object(F.jsx)("div",{className:"h-100",style:B,children:Object(F.jsx)("div",{className:"container d-flex flex-column justify-content-center h-100",children:Object(F.jsx)(q.a,{justify:"center",children:Object(F.jsx)(A.a,{xs:24,sm:24,md:24,lg:9,children:Object(F.jsx)(C.a,{className:"shadow",style:{background:"#1245A8"},children:Object(F.jsxs)("div",{className:"my-4",children:[Object(F.jsx)("div",{className:"text-center mb-3",children:Object(F.jsx)("img",{className:"img-fluid",src:"/img/".concat("logo-white.png"),alt:"",style:{height:"70px"}})}),Object(F.jsx)(q.a,{justify:"center",children:Object(F.jsx)(A.a,{xs:24,sm:24,md:20,lg:20,children:Object(F.jsx)(R,Object(r.a)({},e))})})]})})})})})})};t.default=function(){return Object(F.jsx)(H,{allowRedirect:!0})}}}]);
//# sourceMappingURL=32.9b2c4af8.chunk.js.map