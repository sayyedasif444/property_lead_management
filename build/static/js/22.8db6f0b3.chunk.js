(this.webpackJsonpbodhi=this.webpackJsonpbodhi||[]).push([[22],{381:function(e,t,n){"use strict";var a=n(3),r=n(10),c=n(0),s=n(101),i=n(156);function o(e){return!(!e||!e.then)}t.a=function(e){var t=c.useRef(!1),n=c.useRef(),l=c.useState(!1),u=Object(r.a)(l,2),d=u[0],m=u[1];c.useEffect((function(){var t;if(e.autoFocus){var a=n.current;t=setTimeout((function(){return a.focus()}))}return function(){t&&clearTimeout(t)}}),[]);var f=e.type,b=e.children,j=e.prefixCls,p=e.buttonProps;return c.createElement(s.a,Object(a.a)({},Object(i.a)(f),{onClick:function(n){var a=e.actionFn,r=e.close;if(!t.current)if(t.current=!0,a){var c;if(e.emitEvent){if(c=a(n),e.quitOnNullishReturnValue&&!o(c))return t.current=!1,void r(n)}else if(a.length)c=a(r),t.current=!1;else if(!(c=a()))return void r();!function(n){var a=e.close;o(n)&&(m(!0),n.then((function(){m(!1),a.apply(void 0,arguments),t.current=!1}),(function(e){console.error(e),m(!1),t.current=!1})))}(c)}else r()},loading:d,prefixCls:j},p,{ref:n}),b)}},392:function(e,t,n){"use strict";var a=n(3),r=n(10),c=n(0),s=n(11),i=n.n(s),o=n(60),l=n(159),u=n(52),d=n(105),m=n(101),f=n(156),b=n(100),j=n(58),p=n(59),O=n(139),h=n(23),x=n(71),v=n(381),y=void 0,C=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},g=c.forwardRef((function(e,t){var n=c.useContext(p.b).getPrefixCls,s=Object(o.a)(!1,{value:e.visible,defaultValue:e.defaultVisible}),l=Object(r.a)(s,2),g=l[0],E=l[1],k=function(t,n){var a;E(t),null===(a=e.onVisibleChange)||void 0===a||a.call(e,t,n)},w=function(e){k(!1,e)},N=function(t){var n;return null===(n=e.onConfirm)||void 0===n?void 0:n.call(y,t)},P=function(t){var n;k(!1,t),null===(n=e.onCancel)||void 0===n||n.call(y,t)},T=e.prefixCls,I=e.placement,S=e.children,_=e.overlayClassName,F=C(e,["prefixCls","placement","children","overlayClassName"]),A=n("popover",T),M=n("popconfirm",T),U=i()(M,_),R=c.createElement(b.a,{componentName:"Popconfirm",defaultLocale:j.a.Popconfirm},(function(t){return function(t,r){var s=e.okButtonProps,i=e.cancelButtonProps,o=e.title,l=e.cancelText,u=e.okText,d=e.okType,b=e.icon;return c.createElement("div",{className:"".concat(t,"-inner-content")},c.createElement("div",{className:"".concat(t,"-message")},b,c.createElement("div",{className:"".concat(t,"-message-title")},Object(O.a)(o))),c.createElement("div",{className:"".concat(t,"-buttons")},c.createElement(m.a,Object(a.a)({onClick:P,size:"small"},i),l||r.cancelText),c.createElement(v.a,{buttonProps:Object(a.a)(Object(a.a)({size:"small"},Object(f.a)(d)),s),actionFn:N,close:w,prefixCls:n("btn"),quitOnNullishReturnValue:!0,emitEvent:!0},u||r.okText)))}(A,t)})),D=n();return c.createElement(d.a,Object(a.a)({},F,{prefixCls:A,placement:I,onVisibleChange:function(t){e.disabled||k(t)},visible:g,overlay:R,overlayClassName:U,ref:t,transitionName:Object(x.b)(D,"zoom-big",e.transitionName)}),Object(h.a)(S,{onKeyDown:function(e){var t,n;c.isValidElement(S)&&(null===(n=null===S||void 0===S?void 0:(t=S.props).onKeyDown)||void 0===n||n.call(t,e)),function(e){e.keyCode===u.a.ESC&&g&&k(!1,e)}(e)}}))}));g.defaultProps={placement:"top",trigger:"click",okType:"primary",icon:c.createElement(l.a,null),disabled:!1},t.a=g},399:function(e,t,n){"use strict";var a,r=n(7),c=n(3),s=n(0),i=n(391),o=n(11),l=n.n(o),u=n(103),d=n(89),m=n(101),f=n(156),b=n(100),j=n(59),p=n(389),O=n(71),h=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n};Object(p.a)()&&document.documentElement.addEventListener("click",(function(e){a={x:e.pageX,y:e.pageY},setTimeout((function(){a=null}),100)}),!0);var x=function(e){var t,n=s.useContext(j.b),o=n.getPopupContainer,p=n.getPrefixCls,x=n.direction,v=function(t){var n=e.onCancel;null===n||void 0===n||n(t)},y=function(t){var n=e.onOk;null===n||void 0===n||n(t)},C=function(t){var n=e.okText,a=e.okType,r=e.cancelText,i=e.confirmLoading;return s.createElement(s.Fragment,null,s.createElement(m.a,Object(c.a)({onClick:v},e.cancelButtonProps),r||t.cancelText),s.createElement(m.a,Object(c.a)({},Object(f.a)(a),{loading:i,onClick:y},e.okButtonProps),n||t.okText))},g=e.prefixCls,E=e.footer,k=e.visible,w=e.wrapClassName,N=e.centered,P=e.getContainer,T=e.closeIcon,I=e.focusTriggerAfterClose,S=void 0===I||I,_=h(e,["prefixCls","footer","visible","wrapClassName","centered","getContainer","closeIcon","focusTriggerAfterClose"]),F=p("modal",g),A=p(),M=s.createElement(b.a,{componentName:"Modal",defaultLocale:Object(d.b)()},C),U=s.createElement("span",{className:"".concat(F,"-close-x")},T||s.createElement(u.a,{className:"".concat(F,"-close-icon")})),R=l()(w,(t={},Object(r.a)(t,"".concat(F,"-centered"),!!N),Object(r.a)(t,"".concat(F,"-wrap-rtl"),"rtl"===x),t));return s.createElement(i.a,Object(c.a)({},_,{getContainer:void 0===P?o:P,prefixCls:F,wrapClassName:R,footer:void 0===E?M:E,visible:k,mousePosition:a,onClose:v,closeIcon:U,focusTriggerAfterClose:S,transitionName:Object(O.b)(A,"zoom",e.transitionName),maskTransitionName:Object(O.b)(A,"fade",e.maskTransitionName)}))};x.defaultProps={width:520,confirmLoading:!1,visible:!1,okType:"primary"};var v=x,y=n(35),C=n(164),g=n(163),E=n(165),k=n(166),w=n(381),N=n(45),P=n(27),T=function(e){var t=e.icon,n=e.onCancel,a=e.onOk,c=e.close,i=e.zIndex,o=e.afterClose,u=e.visible,d=e.keyboard,m=e.centered,f=e.getContainer,b=e.maskStyle,j=e.okText,p=e.okButtonProps,h=e.cancelText,x=e.cancelButtonProps,y=e.direction,C=e.prefixCls,g=e.rootPrefixCls,E=e.iconPrefixCls,k=e.bodyStyle,T=e.closable,I=void 0!==T&&T,S=e.closeIcon,_=e.modalRender,F=e.focusTriggerAfterClose;Object(N.a)(!("string"===typeof t&&t.length>2),"Modal","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(t,"` at https://ant.design/components/icon"));var A=e.okType||"primary",M="".concat(C,"-confirm"),U=!("okCancel"in e)||e.okCancel,R=e.width||416,D=e.style||{},L=void 0===e.mask||e.mask,z=void 0!==e.maskClosable&&e.maskClosable,V=null!==e.autoFocusButton&&(e.autoFocusButton||"ok"),q=l()(M,"".concat(M,"-").concat(e.type),Object(r.a)({},"".concat(M,"-rtl"),"rtl"===y),e.className),B=U&&s.createElement(w.a,{actionFn:n,close:c,autoFocus:"cancel"===V,buttonProps:x,prefixCls:"".concat(g,"-btn")},h);return s.createElement(P.a,{prefixCls:g,iconPrefixCls:E,direction:y},s.createElement(v,{prefixCls:C,className:q,wrapClassName:l()(Object(r.a)({},"".concat(M,"-centered"),!!e.centered)),onCancel:function(){return c({triggerCancel:!0})},visible:u,title:"",footer:"",transitionName:Object(O.b)(g,"zoom",e.transitionName),maskTransitionName:Object(O.b)(g,"fade",e.maskTransitionName),mask:L,maskClosable:z,maskStyle:b,style:D,bodyStyle:k,width:R,zIndex:i,afterClose:o,keyboard:d,centered:m,getContainer:f,closable:I,closeIcon:S,modalRender:_,focusTriggerAfterClose:F},s.createElement("div",{className:"".concat(M,"-body-wrapper")},s.createElement("div",{className:"".concat(M,"-body")},t,void 0===e.title?null:s.createElement("span",{className:"".concat(M,"-title")},e.title),s.createElement("div",{className:"".concat(M,"-content")},e.content)),s.createElement("div",{className:"".concat(M,"-btns")},B,s.createElement(w.a,{type:A,actionFn:a,close:c,autoFocus:"ok"===V,buttonProps:p,prefixCls:"".concat(g,"-btn")},j)))))},I=[],S=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},_="";function F(e){var t=document.createDocumentFragment(),n=Object(c.a)(Object(c.a)({},e),{close:i,visible:!0});function a(){y.unmountComponentAtNode(t);for(var n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];var c=a.some((function(e){return e&&e.triggerCancel}));e.onCancel&&c&&e.onCancel.apply(e,a);for(var s=0;s<I.length;s++){var o=I[s];if(o===i){I.splice(s,1);break}}}function r(e){var n=e.okText,a=e.cancelText,r=e.prefixCls,i=S(e,["okText","cancelText","prefixCls"]);setTimeout((function(){var e=Object(d.b)(),o=Object(P.b)(),l=o.getPrefixCls,u=o.getIconPrefixCls,m=l(void 0,_),f=r||"".concat(m,"-modal"),b=u();y.render(s.createElement(T,Object(c.a)({},i,{prefixCls:f,rootPrefixCls:m,iconPrefixCls:b,okText:n||(i.okCancel?e.okText:e.justOkText),cancelText:a||e.cancelText})),t)}))}function i(){for(var t=this,s=arguments.length,i=new Array(s),o=0;o<s;o++)i[o]=arguments[o];r(n=Object(c.a)(Object(c.a)({},n),{visible:!1,afterClose:function(){"function"===typeof e.afterClose&&e.afterClose(),a.apply(t,i)}}))}return r(n),I.push(i),{destroy:i,update:function(e){r(n="function"===typeof e?e(n):Object(c.a)(Object(c.a)({},n),e))}}}function A(e){return Object(c.a)(Object(c.a)({icon:s.createElement(k.a,null),okCancel:!1},e),{type:"warning"})}function M(e){return Object(c.a)(Object(c.a)({icon:s.createElement(C.a,null),okCancel:!1},e),{type:"info"})}function U(e){return Object(c.a)(Object(c.a)({icon:s.createElement(g.a,null),okCancel:!1},e),{type:"success"})}function R(e){return Object(c.a)(Object(c.a)({icon:s.createElement(E.a,null),okCancel:!1},e),{type:"error"})}function D(e){return Object(c.a)(Object(c.a)({icon:s.createElement(k.a,null),okCancel:!0},e),{type:"confirm"})}var L=n(12),z=n(10);var V=n(58),q=function(e,t){var n=e.afterClose,a=e.config,r=s.useState(!0),i=Object(z.a)(r,2),o=i[0],l=i[1],u=s.useState(a),d=Object(z.a)(u,2),m=d[0],f=d[1],p=s.useContext(j.b),O=p.direction,h=p.getPrefixCls,x=h("modal"),v=h(),y=function(){l(!1);for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var a=t.some((function(e){return e&&e.triggerCancel}));m.onCancel&&a&&m.onCancel()};return s.useImperativeHandle(t,(function(){return{destroy:y,update:function(e){f((function(t){return Object(c.a)(Object(c.a)({},t),e)}))}}})),s.createElement(b.a,{componentName:"Modal",defaultLocale:V.a.Modal},(function(e){return s.createElement(T,Object(c.a)({prefixCls:x,rootPrefixCls:v},m,{close:y,visible:o,afterClose:n,okText:m.okText||(m.okCancel?e.okText:e.justOkText),direction:O,cancelText:m.cancelText||e.cancelText}))}))},B=s.forwardRef(q),H=0,K=s.memo(s.forwardRef((function(e,t){var n=function(){var e=s.useState([]),t=Object(z.a)(e,2),n=t[0],a=t[1];return[n,s.useCallback((function(e){return a((function(t){return[].concat(Object(L.a)(t),[e])})),function(){a((function(t){return t.filter((function(t){return t!==e}))}))}}),[])]}(),a=Object(z.a)(n,2),r=a[0],c=a[1];return s.useImperativeHandle(t,(function(){return{patchElement:c}}),[]),s.createElement(s.Fragment,null,r)})));function W(e){return F(A(e))}var J=v;J.useModal=function(){var e=s.useRef(null),t=s.useState([]),n=Object(z.a)(t,2),a=n[0],r=n[1];s.useEffect((function(){a.length&&(Object(L.a)(a).forEach((function(e){e()})),r([]))}),[a]);var c=s.useCallback((function(t){return function(n){var a;H+=1;var c,i=s.createRef(),o=s.createElement(B,{key:"modal-".concat(H),config:t(n),ref:i,afterClose:function(){c()}});return c=null===(a=e.current)||void 0===a?void 0:a.patchElement(o),{destroy:function(){function e(){var e;null===(e=i.current)||void 0===e||e.destroy()}i.current?e():r((function(t){return[].concat(Object(L.a)(t),[e])}))},update:function(e){function t(){var t;null===(t=i.current)||void 0===t||t.update(e)}i.current?t():r((function(e){return[].concat(Object(L.a)(e),[t])}))}}}}),[]);return[s.useMemo((function(){return{info:c(M),success:c(U),error:c(R),warning:c(A),confirm:c(D)}}),[]),s.createElement(K,{ref:e})]},J.info=function(e){return F(M(e))},J.success=function(e){return F(U(e))},J.error=function(e){return F(R(e))},J.warning=W,J.warn=W,J.confirm=function(e){return F(D(e))},J.destroyAll=function(){for(;I.length;){var e=I.pop();e&&e()}},J.config=function(e){var t=e.rootPrefixCls;Object(N.a)(!1,"Modal","Modal.config is deprecated. Please use ConfigProvider.config instead."),_=t};t.a=J},400:function(e,t,n){"use strict";var a=n(2),r=n(0),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"plus-circle",theme:"outlined"},s=n(13),i=function(e,t){return r.createElement(s.a,Object(a.a)(Object(a.a)({},e),{},{ref:t,icon:c}))};i.displayName="PlusCircleOutlined";t.a=r.forwardRef(i)},519:function(e,t,n){"use strict";var a=n(3),r=n(7),c=n(0),s=n(10),i=n(15),o=n(11),l=n.n(o),u=n(60),d=n(52),m=c.forwardRef((function(e,t){var n,a=e.prefixCls,o=void 0===a?"rc-switch":a,m=e.className,f=e.checked,b=e.defaultChecked,j=e.disabled,p=e.loadingIcon,O=e.checkedChildren,h=e.unCheckedChildren,x=e.onClick,v=e.onChange,y=e.onKeyDown,C=Object(i.a)(e,["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"]),g=Object(u.a)(!1,{value:f,defaultValue:b}),E=Object(s.a)(g,2),k=E[0],w=E[1];function N(e,t){var n=k;return j||(w(n=e),null===v||void 0===v||v(n,t)),n}var P=l()(o,m,(n={},Object(r.a)(n,"".concat(o,"-checked"),k),Object(r.a)(n,"".concat(o,"-disabled"),j),n));return c.createElement("button",Object.assign({},C,{type:"button",role:"switch","aria-checked":k,disabled:j,className:P,ref:t,onKeyDown:function(e){e.which===d.a.LEFT?N(!1,e):e.which===d.a.RIGHT&&N(!0,e),null===y||void 0===y||y(e)},onClick:function(e){var t=N(!k,e);null===x||void 0===x||x(t,e)}}),p,c.createElement("span",{className:"".concat(o,"-inner")},k?O:h))}));m.displayName="Switch";var f=m,b=n(90),j=n(161),p=n(59),O=n(88),h=n(45),x=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},v=c.forwardRef((function(e,t){var n,s=e.prefixCls,i=e.size,o=e.loading,u=e.className,d=void 0===u?"":u,m=e.disabled,v=x(e,["prefixCls","size","loading","className","disabled"]);Object(h.a)("checked"in v||!("value"in v),"Switch","`value` is not a valid prop, do you mean `checked`?");var y=c.useContext(p.b),C=y.getPrefixCls,g=y.direction,E=c.useContext(O.b),k=C("switch",s),w=c.createElement("div",{className:"".concat(k,"-handle")},o&&c.createElement(b.a,{className:"".concat(k,"-loading-icon")})),N=l()((n={},Object(r.a)(n,"".concat(k,"-small"),"small"===(i||E)),Object(r.a)(n,"".concat(k,"-loading"),o),Object(r.a)(n,"".concat(k,"-rtl"),"rtl"===g),n),d);return c.createElement(j.a,{insertExtraNode:!0},c.createElement(f,Object(a.a)({},v,{prefixCls:k,className:N,disabled:m||o,ref:t,loadingIcon:w})))}));v.__ANT_SWITCH=!0,v.displayName="Switch";t.a=v},632:function(e,t,n){"use strict";n.r(t);var a=n(138),r=n(224),c=n(392),s=n(519),i=n(105),o=n(640),l=n(475),u=n(476),d=n(611),m=n(101),f=n(622),b=n(0),j=n(376),p=n(2),O={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M608 112c-167.9 0-304 136.1-304 304 0 70.3 23.9 135 63.9 186.5l-41.1 41.1-62.3-62.3a8.15 8.15 0 00-11.4 0l-39.8 39.8a8.15 8.15 0 000 11.4l62.3 62.3-44.9 44.9-62.3-62.3a8.15 8.15 0 00-11.4 0l-39.8 39.8a8.15 8.15 0 000 11.4l62.3 62.3-65.3 65.3a8.03 8.03 0 000 11.3l42.3 42.3c3.1 3.1 8.2 3.1 11.3 0l253.6-253.6A304.06 304.06 0 00608 720c167.9 0 304-136.1 304-304S775.9 112 608 112zm161.2 465.2C726.2 620.3 668.9 644 608 644c-60.9 0-118.2-23.7-161.2-66.8-43.1-43-66.8-100.3-66.8-161.2 0-60.9 23.7-118.2 66.8-161.2 43-43.1 100.3-66.8 161.2-66.8 60.9 0 118.2 23.7 161.2 66.8 43.1 43 66.8 100.3 66.8 161.2 0 60.9-23.7 118.2-66.8 161.2z"}}]},name:"key",theme:"outlined"},h=n(13),x=function(e,t){return b.createElement(h.a,Object(p.a)(Object(p.a)({},e),{},{ref:t,icon:O}))};x.displayName="KeyOutlined";var v=b.forwardRef(x),y=n(473),C=n(400),g=n(516),E=n(625),k=n(399),w=n(29),N=n(162),P=n(5),T=g.a.Option,I=Object(w.b)((function(e){return{isError:e.user.isError,errMessage:e.user.errMessage,isErrorType:e.user.isErrorType}}),{addUser:N.a})((function(e){var t=e.visible,n=e.cancel,r=e.errMessage,c=e.isError,s=e.isErrorType,i=e.addUser,o=E.a.useForm(),f=Object(a.a)(o,1)[0];return Object(b.useEffect)((function(){c&&"SUCCESS"===s&&setTimeout((function(){n(!1),f.resetFields()}),1e3)}),[c,s,r,f,n]),Object(P.jsx)(k.a,{title:"New User",visible:t,centered:!0,footer:null,width:700,destroyOnClose:!0,onCancel:function(e){return n(!1)},children:Object(P.jsxs)(E.a,{form:f,layout:"vertical",name:"new-company",preserve:!1,onFinish:function(e){i(e)},children:[Object(P.jsxs)(l.a,{gutter:16,children:[Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"first_name",label:Object(P.jsx)("span",{children:"First Name"}),rules:[{required:!0,message:"Please input First Name"}],children:Object(P.jsx)(d.a,{placeholder:"First Name"})})}),Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"last_name",label:Object(P.jsx)("span",{children:"Last Name"}),rules:[{required:!0,message:"Please input Last Name"}],children:Object(P.jsx)(d.a,{placeholder:"Last Name"})})}),Object(P.jsx)(u.a,{span:24,children:Object(P.jsx)(E.a.Item,{name:"emailid",label:Object(P.jsx)("span",{children:"Email Id"}),rules:[{required:!0,message:"Please input Email Id"}],children:Object(P.jsx)(d.a,{type:"email",placeholder:"Email Id"})})}),Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"password",label:Object(P.jsx)("span",{children:"Password"}),rules:[{required:!0,message:"Please input Password"}],children:Object(P.jsx)(d.a,{type:"password",placeholder:"Password"})})}),Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"confirm_password",label:Object(P.jsx)("span",{children:"Confirm Password"}),rules:[{required:!0,message:"Please input Confirm Password"},function(e){e.getFieldValue;return{validator:function(e,t){return t&&t!==f.getFieldValue("password")?Promise.reject("Passwords does not match"):Promise.resolve()}}}],children:Object(P.jsx)(d.a,{type:"password",placeholder:"Confirm Password"})})}),Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"user_type",label:Object(P.jsx)("span",{children:"User Role"}),rules:[{required:!0,message:"Please input user type"}],children:Object(P.jsxs)(g.a,{size:"default",style:{width:"100%"},children:[Object(P.jsx)(T,{value:"USER",children:"USER"}),Object(P.jsx)(T,{value:"ADMIN",children:"ADMIN"})]})})}),Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"phone_number",label:Object(P.jsx)("span",{children:"Phone Number"}),children:Object(P.jsx)(d.a,{placeholder:"Phone Number"})})})]}),Object(P.jsx)(E.a.Item,{className:"text-right mb-0",children:Object(P.jsx)(m.a,{type:"primary",htmlType:"submit",children:"Save"})})]})})})),S=g.a.Option,_=Object(w.b)((function(e){return{isError:e.user.isError,errMessage:e.user.errMessage,isErrorType:e.user.isErrorType,singleData:e.user.singleData}}),{editUser:N.c})((function(e){var t=e.visible,n=e.cancel,r=e.errMessage,c=e.isError,s=e.isErrorType,i=e.editUser,o=e.singleData,f=E.a.useForm(),j=Object(a.a)(f,1)[0];return Object(b.useEffect)((function(){c&&"SUCCESS"===s&&setTimeout((function(){n(!1),j.resetFields()}),1e3)}),[c,s,r,j,n]),Object(b.useEffect)((function(){Object.keys(o).length>0&&j.setFieldsValue({first_name:null!==o.first_name?o.first_name:"",last_name:null!==o.last_name?o.last_name:"",emailid:null!==o.emailid?o.emailid:"",phone_number:null!==o.phone_number?o.phone_number:"",user_type:null!==o.user_type?o.user_type:""})}),[o,j]),Object(P.jsx)(k.a,{title:"Edit User",visible:t,centered:!0,footer:null,width:700,destroyOnClose:!0,onCancel:function(e){return n(!1)},children:Object(P.jsxs)(E.a,{form:j,layout:"vertical",name:"new-company",preserve:!1,onFinish:function(e){e.id=o.id,i(e)},children:[Object(P.jsxs)(l.a,{gutter:16,children:[Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"first_name",label:Object(P.jsx)("span",{children:"First Name"}),rules:[{required:!0,message:"Please input First Name"}],children:Object(P.jsx)(d.a,{placeholder:"First Name"})})}),Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"last_name",label:Object(P.jsx)("span",{children:"Last Name"}),rules:[{required:!0,message:"Please input Last Name"}],children:Object(P.jsx)(d.a,{placeholder:"Last Name"})})}),Object(P.jsx)(u.a,{span:24,children:Object(P.jsx)(E.a.Item,{name:"emailid",label:Object(P.jsx)("span",{children:"Email Id"}),rules:[{required:!0,message:"Please input Email Id"}],children:Object(P.jsx)(d.a,{type:"email",placeholder:"Email Id"})})}),Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"user_type",label:Object(P.jsx)("span",{children:"User Role"}),rules:[{required:!0,message:"Please input user type"}],children:Object(P.jsxs)(g.a,{size:"default",style:{width:"100%"},children:[Object(P.jsx)(S,{value:"USER",children:"USER"}),Object(P.jsx)(S,{value:"ADMIN",children:"ADMIN"})]})})}),Object(P.jsx)(u.a,{span:12,children:Object(P.jsx)(E.a.Item,{name:"phone_number",label:Object(P.jsx)("span",{children:"Phone Number"}),children:Object(P.jsx)(d.a,{placeholder:"Phone Number"})})})]}),Object(P.jsx)(E.a.Item,{className:"text-right mb-0",children:Object(P.jsx)(m.a,{type:"primary",htmlType:"submit",children:"Save"})})]})})})),F=Object(w.b)((function(e){return{isError:e.user.isError,errMessage:e.user.errMessage,isErrorType:e.user.isErrorType,singleData:e.user.singleData}}),{passwordUpdateAdmin:N.f})((function(e){var t=e.visible,n=e.cancel,r=e.errMessage,c=e.isError,s=e.isErrorType,i=e.passwordUpdateAdmin,o=e.singleData,f=E.a.useForm(),j=Object(a.a)(f,1)[0];return Object(b.useEffect)((function(){c&&"SUCCESS"===s&&setTimeout((function(){n(!1),j.resetFields()}),1e3)}),[c,s,r,j,n]),Object(P.jsx)(k.a,{title:"Edit User Password",visible:t,centered:!0,footer:null,width:700,destroyOnClose:!0,onCancel:function(e){return n(!1)},children:Object(P.jsxs)(E.a,{form:j,layout:"vertical",name:"new-company",preserve:!1,onFinish:function(e){e.id=o.id,i(e)},children:[Object(P.jsxs)(l.a,{gutter:16,children:[Object(P.jsx)(u.a,{span:24,children:Object(P.jsx)(E.a.Item,{name:"password",label:Object(P.jsx)("span",{children:"Password"}),rules:[{required:!0,message:"Please input Password"}],children:Object(P.jsx)(d.a,{type:"password",placeholder:"Password"})})}),Object(P.jsx)(u.a,{span:24,children:Object(P.jsx)(E.a.Item,{name:"confirm_password",label:Object(P.jsx)("span",{children:"Confirm Password"}),rules:[{required:!0,message:"Please input Confirm Password"},function(e){e.getFieldValue;return{validator:function(e,t){return t&&t!==j.getFieldValue("password")?Promise.reject("Passwords does not match"):Promise.resolve()}}}],children:Object(P.jsx)(d.a,{type:"password",placeholder:"Confirm Password"})})})]}),Object(P.jsx)(E.a.Item,{className:"text-right mb-0",children:Object(P.jsx)(m.a,{type:"primary",htmlType:"submit",children:"Save"})})]})})})),A=n(32),M=n(63),U=n(1),R=n(9),D=n.n(R),L=Object(w.b)((function(e){return{isError:e.user.isError,errMessage:e.user.errMessage,isErrorType:e.user.isErrorType,singleData:e.user.singleData}}),{passwordUpdateAdmin:N.f})((function(e){var t=e.visible,n=e.cancel,r=e.userId,c=Object(b.useState)([]),s=Object(a.a)(c,2),i=s[0],o=s[1],l=Object(b.useState)([]),u=Object(a.a)(l,2),d=u[0],m=u[1];return Object(b.useEffect)((function(){if(null!==r){var e={user_id:r};D()({method:"POST",url:U.a+"salary/list-user-salary",data:e,headers:{"Content-Type":"application/json"}}).then((function(e){200===e.data.statuscode?o(e.data.data):o([])})).catch((function(e){o([])}))}}),[r]),Object(b.useEffect)((function(){var e=[];i.forEach((function(t,n){e.push({srno:n+1,date:t.paid_for_date,received_on:t.paid_date,amount:t.totalPaid,advance:t.advance,commission:t.commission,deduction:t.deduction,incentive:t.incentive})})),m(e)}),[i]),Object(P.jsx)(k.a,{title:"Salary History",visible:t,centered:!0,footer:null,width:900,destroyOnClose:!0,onCancel:function(e){return n(!1)},children:Object(P.jsx)(f.a,{className:"border",columns:[{title:"Sr no",dataIndex:"srno",innerWidth:"24px",key:"srno"},{title:"Date",dataIndex:"date",key:"date"},{title:"Received on",dataIndex:"received_on",key:"received_on"},{title:"Amount",dataIndex:"amount",key:"amount"},{title:"Deduction",dataIndex:"deduction",key:"deduction"},{title:"Advance",dataIndex:"advance",key:"deduction"},{title:"Commission",dataIndex:"commission",key:"commission"},{title:"Incentive",dataIndex:"incentive",key:"incentive"}],dataSource:d})})}));t.default=Object(w.b)((function(e){return{data:e.user.data,loading:e.user.loading,isError:e.user.isError,errMessage:e.user.errMessage,isErrorType:e.user.isErrorType,isAuthenticated:e.auth.isAuthenticated}}),{listUser:N.d,deleteUser:N.b})((function(e){var t=e.data,n=e.loading,p=e.errMessage,O=e.isError,h=e.isErrorType,x=(e.isAuthenticated,e.listUser,e.deleteUser),g=Object(b.useState)(!1),E=Object(a.a)(g,2),k=E[0],w=E[1],N=Object(b.useState)(!1),T=Object(a.a)(N,2),S=T[0],R=T[1],D=Object(b.useState)(!1),z=Object(a.a)(D,2),V=z[0],q=z[1],B=Object(b.useState)([]),H=Object(a.a)(B,2),K=H[0],W=H[1],J=Object(b.useState)(""),Y=Object(a.a)(J,2),G=Y[0],X=Y[1],Q=Object(b.useState)(!1),Z=Object(a.a)(Q,2),$=Z[0],ee=Z[1],te=Object(b.useState)(null),ne=Object(a.a)(te,2),ae=ne[0],re=ne[1];return Object(b.useEffect)((function(){O&&"SUCCESS"===h?r.b.success(p):O&&"FAIL"===h&&r.b.error(p)}),[O,h,p]),Object(b.useEffect)((function(){if(null!==t){var e=t;""!==G&&null!==G&&(e=t.filter((function(e){return null!==e.first_name&&e.first_name.toLowerCase().indexOf(G.toLowerCase())>-1||null!==e.last_name&&e.last_name.toLowerCase().indexOf(G.toLowerCase())>-1||null!==e.emailid&&e.emailid.toLowerCase().indexOf(G.toLowerCase())>-1||null!==e.phone_number&&e.phone_number.toLowerCase().indexOf(G.toLowerCase())>-1})));var n=[];e.forEach((function(e,t){n.push({key:t+1,srno:t+1,first_name:e.first_name,last_name:e.last_name,emailid:e.emailid,phone_number:e.phone_number,status:Object(P.jsx)(c.a,{title:"Are you sure?",onConfirm:function(t){return x({id:e.id,isActive:!e.isActive})},okText:"Yes",cancelText:"No",children:Object(P.jsx)(s.a,{checked:e.isActive})}),action:Object(P.jsxs)("div",{children:[Object(P.jsx)(i.a,{title:"Edit",children:Object(P.jsx)(A.b,{to:"#!",children:Object(P.jsx)(j.a,{className:"text-success",style:{fontSize:"16px"},onClick:function(t){t.preventDefault(),R(!0),M.a.dispatch({type:U.fb,payload:e})}})})}),Object(P.jsx)(i.a,{title:"Change Password",children:Object(P.jsx)(A.b,{to:"#!",onClick:function(t){t.preventDefault(),q(!0),M.a.dispatch({type:U.fb,payload:e})},children:Object(P.jsx)(v,{className:"text-primary ml-4 ",style:{fontSize:"16px"}})})}),Object(P.jsx)(i.a,{title:"Salary History",children:Object(P.jsx)(A.b,{to:"#!",onClick:function(t){t.preventDefault(),re(e.id),ee(!0)},children:Object(P.jsx)(y.a,{className:"text-primary ml-4 ",style:{fontSize:"16px"}})})})]})})})),W(n)}}),[t,G,x]),Object(P.jsxs)("div",{children:[Object(P.jsx)(o.a,{children:Object(P.jsxs)(l.a,{children:[Object(P.jsx)(u.a,{sm:8,md:6,lg:5,className:"text-left mb-3",children:Object(P.jsx)(d.a,{placeholder:"Search",value:G,onChange:function(e){return X(e.target.value)}})}),Object(P.jsx)(u.a,{sm:16,md:18,lg:19,className:"text-right mb-3",children:Object(P.jsx)(m.a,{type:"primary ",icon:Object(P.jsx)(C.a,{}),onClick:function(e){return w(!0)},children:"Add User"})}),Object(P.jsx)(u.a,{sm:24,md:24,lg:24,children:Object(P.jsx)(f.a,{className:"border",columns:[{title:"Sr no",dataIndex:"srno",innerWidth:"24px",key:"srno"},{title:"First Name",dataIndex:"first_name",key:"first_name"},{title:"Last Name",dataIndex:"last_name",key:"last_name"},{title:"Email",dataIndex:"emailid",key:"emailid"},{title:"Phone",dataIndex:"phone_number",key:"phone_number"},{title:"Status",dataIndex:"status",key:"status"},{title:"Actions",dataIndex:"action",key:"x"}],dataSource:K,loading:n})})]})}),Object(P.jsx)(I,{visible:k,cancel:w}),Object(P.jsx)(_,{visible:S,cancel:R}),Object(P.jsx)(F,{visible:V,cancel:q}),Object(P.jsx)(L,{visible:$,cancel:ee,userId:ae})]})}))}}]);
//# sourceMappingURL=22.8db6f0b3.chunk.js.map