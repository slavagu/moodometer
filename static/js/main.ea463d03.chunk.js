(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t,a){e.exports=a(228)},108:function(e,t,a){},109:function(e,t,a){},228:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(42),o=a.n(c),l=a(14),i=(a(108),a(9)),u=(a(109),a(234)),m=a(97),s=a.n(m),d=function(){return r.a.createElement("div",{className:"center"},r.a.createElement("img",{src:s.a,alt:"Loading"}))},p=a(18),b=a(35),E=a(11),f=a(229),v=a(230),h=a(231),g=a(99),O=a(239),w=a(240),j=a(241),N=a(232),x=a(233),k=a(235),y=a(236),C="home",S="demo",A="trend",L="profile",R="log in",T="log out",z=function(e){var t=e.to,a=e.onClick,n=e.children;return r.a.createElement(f.a,{tag:l.c,to:t||"#",exact:!0,activeClassName:"router-link-exact-active",onClick:a||void 0},n)},P=function(){var e=Object(E.b)().isAuthenticated;return r.a.createElement(v.a,{className:"mr-auto",navbar:!0},r.a.createElement(h.a,null,r.a.createElement(z,{to:"/"},C)),!e&&r.a.createElement(h.a,null,r.a.createElement(z,{to:"/demo"},S)),e&&r.a.createElement(h.a,null,r.a.createElement(z,{to:"/trend"},A)))},W=function(e){e({returnTo:window.location.origin})},H=function(){var e=Object(E.b)(),t=e.user,a=e.isAuthenticated,n=e.loginWithRedirect,c=e.logout;return r.a.createElement(v.a,{className:"d-none d-md-block",navbar:!0},!a&&r.a.createElement(h.a,null,r.a.createElement(g.a,{size:"lg",className:"btn-margin",onClick:function(){return n()}},R)),a&&r.a.createElement(O.a,{nav:!0,inNavbar:!0},r.a.createElement(w.a,{nav:!0,caret:!0,id:"profileDropDown"},r.a.createElement("img",{src:t.picture,alt:"Profile",className:"nav-user-profile rounded-circle",width:"50"})),r.a.createElement(j.a,{right:!0},r.a.createElement(N.a,{header:!0,className:"text-xl"},t.name),r.a.createElement(N.a,{tag:l.c,to:"/profile",className:"text-xl",activeClassName:"router-link-exact-active"},r.a.createElement(b.a,{icon:"user",className:"mr-3"}),L),r.a.createElement(N.a,{className:"text-xl",onClick:function(){return W(c)}},r.a.createElement(b.a,{icon:"power-off",className:"mr-3"}),T))))},q=function(){var e=Object(E.b)(),t=e.user,a=e.isAuthenticated,n=e.loginWithRedirect,c=e.logout;return r.a.createElement(r.a.Fragment,null,!a&&r.a.createElement(v.a,{className:"d-md-none",navbar:!0},r.a.createElement(h.a,null,r.a.createElement(g.a,{size:"lg",onClick:function(){return n()}},R))),a&&r.a.createElement(v.a,{className:"d-md-none justify-content-between",navbar:!0},r.a.createElement(h.a,null,r.a.createElement("img",{src:t.picture,alt:"Profile",className:"nav-user-profile d-inline-block rounded-circle mr-3",width:"50"}),t.name),r.a.createElement(h.a,null,r.a.createElement(z,{to:"/profile"},r.a.createElement(b.a,{icon:"user",className:"mr-3"}),L)),r.a.createElement(h.a,null,r.a.createElement(z,{onClick:function(){return W(c)}},r.a.createElement(b.a,{icon:"power-off",className:"mr-3"}),T))))},B=function(){var e=Object(n.useState)(!1),t=Object(p.a)(e,2),a=t[0],c=t[1];return r.a.createElement(x.a,{color:"dark",dark:!0,expand:"md"},r.a.createElement(u.a,null,r.a.createElement(k.a,{onClick:function(){return c(!a)}}),r.a.createElement(y.a,{isOpen:a,navbar:!0},r.a.createElement(P,null),r.a.createElement(H,null),r.a.createElement(q,null))))},I=function(){return r.a.createElement("footer",{className:"text-center"},r.a.createElement("p",null,r.a.createElement("a",{href:"https://github.com/slavagu/moodometer"},"moodometer")))},J=a(19),U=a.n(J),D=a(25),F=a(45),G=a(29),$=a(21),K=function(e){var t=e.url,a=e.options,r=void 0===a?{}:a,c=e.data,o=void 0===c?null:c,l=Object(E.b)().getAccessTokenSilently,i=Object(n.useState)({error:null,isLoading:!0,data:null}),u=Object(p.a)(i,2),m=u[0],s=u[1],d=Object(n.useState)(0),b=Object(p.a)(d,2),f=b[0],v=b[1],h=function(){var e=Object(G.a)(U.a.mark(function e(){var a,n,c;return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!(a=r.method&&"POST"===r.method.toUpperCase())||o){e.next=5;break}return s(Object($.a)({},m,{error:null,isLoading:!1})),e.abrupt("return");case 5:return a&&(r.body=JSON.stringify(o)),e.next=8,l();case 8:return n=e.sent,e.next=11,fetch(t,Object($.a)({},r,{headers:Object($.a)({},r.headers,{Authorization:"Bearer ".concat(n)})}));case 11:return c=e.sent,e.t0=s,e.t1=$.a,e.t2={},e.t3=m,e.next=18,c.json();case 18:e.t4=e.sent,e.t5={data:e.t4,error:null,isLoading:!1},e.t6=(0,e.t1)(e.t2,e.t3,e.t5),(0,e.t0)(e.t6),e.next=27;break;case 24:e.prev=24,e.t7=e.catch(0),s(Object($.a)({},m,{error:e.t7,isLoading:!1}));case 27:case"end":return e.stop()}},e,null,[[0,24]])}));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)(function(){h()},[f]),Object($.a)({},m,{refresh:function(){return v(f+1)}})},M={question:"How do you feel today?",options:[{id:"red",label:"bad",button:"btn-danger",color:"#dc3545"},{id:"yellow",label:"normal",button:"btn-warning",color:"#ffc107"},{id:"green",label:"great",button:"btn-success",color:"#28a745"}]},Q=function(e){var t=e.onSelect;return r.a.createElement("div",null,M.options.map(function(e){return r.a.createElement("button",{key:e.id,className:"btn ".concat(e.button," btn-xl m-2"),onClick:function(){return t(e.id)}},e.label)}))},V=function(){var e=Object(E.b)(),t=e.isAuthenticated,a=e.loginWithRedirect;if(!t)return r.a.createElement("div",{className:"app-content"},r.a.createElement("p",null,"Use moodometer to capture team mood and see how it changes over time."),!t&&r.a.createElement("p",null,"Try the ",r.a.createElement(l.b,{to:"/demo"},"demo")," or"," ",r.a.createElement(l.b,{to:"",onClick:function(){return a()}},"log in")," ","to track your team mood."));var c=Object(n.useState)(null),o=Object(p.a)(c,2),i=o[0],u=o[1],m=K({url:"".concat("https://32dawtw292.execute-api.ap-southeast-2.amazonaws.com","/mood"),options:{method:"POST"},data:i}),s=m.isLoading,b=m.error,f=m.refresh,v=function(){var e=Object(G.a)(U.a.mark(function e(t){var a;return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=Object.assign.apply(Object,[{}].concat(Object(F.a)(M.options.map(function(e){var a;return a={},Object(D.a)(a,e.id,0),Object(D.a)(a,t,1),a})))),u(a),f();case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return s?r.a.createElement(d,null):b?r.a.createElement("div",null,"Oops... ",b.message):r.a.createElement("div",{className:"app-content"},r.a.createElement("p",null,M.question),r.a.createElement(Q,{onSelect:v}))},X=a(44),Y=function(e){var t=e.mood;return r.a.createElement(X.b,{options:{maintainAspectRatio:!1,legend:!1,rotation:1.57},data:{labels:M.options.map(function(e){return e.label}),datasets:[{data:t&&M.options.map(function(e){return t[e.id]}),backgroundColor:M.options.map(function(e){return e.color})}]}})},Z=function(e){var t=e.onSelect;return r.a.createElement("div",null,M.options.map(function(e){return r.a.createElement("button",{key:e.id,className:"btn ".concat(e.button," btn-xl m-2"),onClick:function(){return t(e.id)}},e.label)}))},_=Object.assign.apply(Object,[{}].concat(Object(F.a)(M.options.map(function(e){return Object(D.a)({},e.id,0)})))),ee=function(){var e=Object(n.useState)(_),t=Object(p.a)(e,2),a=t[0],c=t[1],o=function(){var e=Object(G.a)(U.a.mark(function e(t){var n;return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(n=Object($.a)({},a))[t]++,c(n);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"app-content"},r.a.createElement("p",null,M.question),r.a.createElement(Z,{onSelect:o}),r.a.createElement("div",{className:"mt-4"},r.a.createElement(Y,{mood:a})))},te=a(237),ae=a(238),ne=Object(E.c)(function(){var e=Object(E.b)().user;return r.a.createElement(u.a,{className:"mb-5"},r.a.createElement(te.a,{className:"align-items-center profile-header mb-5 text-center text-md-left"},r.a.createElement(ae.a,{md:2},r.a.createElement("img",{src:e.picture,alt:"Profile",className:"rounded-circle img-fluid profile-picture mb-3 mb-md-0"})),r.a.createElement(ae.a,{md:!0},r.a.createElement("h2",null,e.name),r.a.createElement("p",{className:"lead text-muted"},e.email))))},{onRedirecting:function(){return r.a.createElement(d,null)}}),re=function(e){var t=e.moodHistory;if(!t)return null;var a={labels:t.map(function(e){return e.date}),datasets:M.options.map(function(e){return{label:e.label,type:"line",data:t.map(function(t){return t[e.id]}),fill:!1,borderColor:e.color,backgroundColor:e.color}})};return r.a.createElement(X.a,{data:a,options:{maintainAspectRatio:!1,legend:!1,scales:{yAxes:[{}]}},height:200})},ce=function(){var e=K({url:"".concat("https://32dawtw292.execute-api.ap-southeast-2.amazonaws.com","/history")}),t=e.isLoading,a=e.error,n=e.data||{},c=n.history,o=n.today;return t?r.a.createElement(d,null):a?r.a.createElement("div",null,"Oops... ",a.message):r.a.createElement("div",{className:"app-content"},r.a.createElement("div",null,r.a.createElement(Y,{mood:o})),r.a.createElement("p",{className:"text-muted"},"today"),r.a.createElement("div",{className:"h-50"},r.a.createElement(re,{moodHistory:c})))},oe=a(26),le=a(47);(function(){oe.b.add(le.a),oe.b.add(le.c),oe.b.add(le.b)})();var ie=function(){var e=Object(E.b)(),t=e.isLoading,a=e.error;return t?r.a.createElement(d,null):a?r.a.createElement("div",null,"Oops... ",a.message):r.a.createElement("div",{className:"app"},r.a.createElement(B,null),r.a.createElement(u.a,{className:"flex-grow-1 mt-5"},r.a.createElement(i.d,null,r.a.createElement(i.b,{path:"/",exact:!0,component:V}),r.a.createElement(i.b,{path:"/demo",component:ee}),r.a.createElement(i.b,{path:"/trend",component:ce}),r.a.createElement(i.b,{path:"/profile",component:ne}),r.a.createElement(i.a,{from:"*",to:"/"}))),r.a.createElement(I,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ue=function(e){var t=e.children,a=Object(i.g)();return r.a.createElement(E.a,{domain:"sls.au.auth0.com",clientId:"8i8sx9zPNnetGA42ICbhu3s5tNWRH0lb",audience:"https://slavagu.github.io/moodometer/",redirectUri:window.location.origin,onRedirectCallback:function(e){a.push(e&&e.returnTo?e.returnTo:window.location.pathname)}},t)};o.a.render(r.a.createElement(l.a,null,r.a.createElement(ue,null,r.a.createElement(ie,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},97:function(e,t,a){e.exports=a.p+"static/media/loading.c5590569.svg"}},[[103,1,2]]]);
//# sourceMappingURL=main.ea463d03.chunk.js.map