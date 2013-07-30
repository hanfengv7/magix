define("magix/magix",function(){[].slice;var e=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,t=/\/[^\/]*$/,n=/[#?].*$/,r="",i=/([^=&?\/#]+)=([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,c={},s=0,f="/",u="vframe",v={iniFile:"app/ini",appName:"app",appHome:"./",tagName:u,rootId:"magix_vf_root"},p=c.hasOwnProperty,d=function(e){return function(t,n,r){switch(arguments.length){case 0:r=e;break;case 1:r=C.isObject(t)?g(e,t):m(e,t)?e[t]:null;break;case 2:null===n?(delete e[t],r=n):e[t]=r=n}return r}},h=function(e){var t=this;t.c=[],t.x=e||5,t.b=t.x+3},l=function(e){return new h(e)},m=function(e,t){return e?p.call(e,t):0},g=function(e,t,n){for(var r in t)n&&m(n,r)||(e[r]=t[r]);return e};g(h.prototype,{get:function(e){var t,n=this,r=n.c;return e=a+e,m(r,e)&&(t=r[e],t.f>=1&&(t.f++,t.t=s++,t=t.v)),t},set:function(e,t){var n=this,r=n.c;e=a+e;var i=r[e];if(!m(r,e)){if(r.length>=n.b){r.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var o=n.b-n.x;o--;)i=r.pop(),delete r[i.k]}i={},r.push(i),r[e]=i}return i.k=e,i.v=t,i.f=1,i.t=s++,i},del:function(e){e=a+e;var t=this.c,n=t[e];n&&(n.f=-1e5,n.v=r,delete t[e])},has:function(e){return e=a+e,m(this.c,e)}});var x=l(20),w=l(),b=function(e,t,n,r,i,a){for(C.isArray(e)||(e=[e]),t&&(C.isArray(t)||t.callee)||(t=[t]),r=0;e.length>r;r++)try{a=e[r],i=C.isFunction(a)&&a.apply(n,t)}catch(o){}return i},y=function(){},C={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:g,has:m,safeExec:b,noop:y,config:d(v),start:function(e){var t=this;e=g(v,e),t.libEnv(e),e.ready&&(b(e.ready),delete e.ready),t.libRequire(e.iniFile,function(n){v=g(e,n,e),v.tagNameChanged=v.tagName!=u;var r=e.progress;t.libRequire(["magix/router","magix/vom"],function(n,i){n.on("!ul",i.locChged),n.on("changed",i.locChged),r&&i.on("progress",r),t.libRequire(e.extensions,n.start)})})},keys:Object.keys||function(e){var t=[];for(var n in e)m(e,n)&&t.push(n);return t},local:d({}),path:function(i,a){var c=i+"\n"+a,s=w.get(c);if(!s){if(o.test(a))s=a;else if(i=i.replace(n,r).replace(t,r)+f,a.charAt(0)==f){var u=o.test(i)?8:0,v=i.indexOf(f,u);s=i.substring(0,v)+a}else s=i+a;for(;e.test(s);)s=s.replace(e,"$1/");w.set(c,s)}return s},pathToObject:function(e,t){var c=x.get(e);if(!c){var c={},s={},u=r;if(n.test(e)?u=e.replace(n,r):~e.indexOf("=")||(u=e),u&&o.test(u)){var v=u.indexOf(f,8);u=-1==v?f:u.substring(v)}e.replace(i,function(e,n,r){if(t)try{r=decodeURIComponent(r)}catch(i){}s[n]=r}),c[a]=u,c.params=s,x.set(e,c)}return c},objectToPath:function(e,t){var n,i=e[a],o=[],c=e.params;for(var s in c)n=c[s],t&&encodeURIComponent(n),o.push(s+"="+n);return i+(i&&o.length?"?":r)+o.join("&")},tmpl:function(e,t){return 1==arguments.length?{v:c[e],h:m(c,e)}:c[e]=t},listToMap:function(e,t){var n,r,i,a={};if(C.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(n=0;i>n;n++)r=e[n],a[t?r[t]:r]=t?r:1;return a},cache:l},E=Object.prototype.toString;return g(C,{libRequire:function(e,t){e?seajs.use(e,t):t&&t()},libEnv:function(e){var t=this,n=e.appHome,i=location;i.protocol;var a=e.appName;n=t.path(i.href,n+f),e.appHome=n;var o=e.debug;o&&(o=0==n.indexOf(i.protocol+f+f+i.host+f));var c=r;c=o?Date.now():e.appTag,c&&(c+=".js");var s={};s[a]=n+a+"/",seajs.config({paths:s})},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==E.call(e)},isString:function(e){return"[object String]"==E.call(e)},isNumber:function(e){return"[object Number]"==E.call(e)},isRegExp:function(e){return"[object RegExp]"==E.call(e)},extend:function(e,t,n,r){e.superclass=t.prototype;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,C.mix(e.prototype,n),C.mix(e,r),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e){var t,n,r,i,a,o=e("magix/magix"),c=e("magix/event"),s=window,f="",u="pathname",v=o.has,p=o.mix,d=document,h=/^UTF-8$/i.test(d.charset||d.characterSet||"UTF-8"),l=o.config(),m=o.cache(),g=o.cache(),x=/#.*$/,w=/^[^#]*#?!?/,b="params",y=l.nativeHistory,C=function(e,t,n){if(e){n=this[b],o.isArray(e)||(e=e.split(","));for(var r=0;e.length>r&&!(t=v(n,e[r]));r++);}return t},E=function(){return v(this,u)},M=function(){return v(this,"view")},V=function(){var e=this,t=e.hash,n=e.query;return t[u]!=n[u]},j=function(e){var t=this,n=t.hash,r=t.query;return n[b][e]!=r[b][e]},I=function(e){var t=this,n=t.hash;return v(n[b],e)},T=function(e){var t=this,n=t.query;return v(n[b],e)},O=function(e){var t=this,n=t[b];return n[e]},k=function(e){var t=o.pathToObject(e,h),n=t[u];return n&&a&&(t[u]=o.path(s.location[u],n)),t},H=p({getView:function(e){if(!r){r={rs:l.routes||{},nf:l.notFoundView};var t=l.defaultView;if(!t)throw Error("unset defaultView");r.home=t;var n=l.defaultPathname||f;r.rs[n]=t,r[u]=n}var i;e||(e=r[u]);var a=r.rs;return i=o.isFunction(a)?a.call(l,e):a[e],{view:i?i:r.nf||r.home,pathname:i?e:r.nf?e:r[u]}},start:function(){var e=H,t=s.history;i=y&&t.pushState,a=y&&!i,i?e.useState():e.useHash(),e.route()},parseQH:function(e){e=e||s.location.href;var t=H,n=m.get(e);if(!n){var r=e.replace(x,f),i=e.replace(w,f),a=k(r),o=k(i),c={};p(c,a[b]),p(c,o[b]),n={pathnameDiff:V,paramDiff:j,hashOwn:I,queryOwn:T,get:O,href:e,srcQuery:r,srcHash:i,query:a,hash:o,params:c},m.set(e,n)}if(!n.view){var v;v=y?n.hash[u]||n.query[u]:n.hash[u];var d=t.getView(v);p(n,d)}return n},getChged:function(e,t){var n=e.href,r=t.href,i=n+"\n"+r,a=g.get(i);if(a||(i=r+"\n"+i,a=g.get(i)),!a){var o;a={params:{}},e[u]!=t[u]&&(a[u]=1,o=1),e.view!=t.view&&(a.view=1,o=1);var c,s=e[b],f=t[b];for(c in s)s[c]!=f[c]&&(o=1,a[b][c]=1);for(c in f)s[c]!=f[c]&&(o=1,a[b][c]=1);a.occur=o,a.isParam=C,a.isPathname=E,a.isView=M,g.set(i,a)}return a},route:function(){var e=H,r=e.parseQH(),i=n||{params:{},href:"~"},a=!n;n=r;var o=e.getChged(i,r);o.occur&&(t=r,e.fire("changed",{location:r,changed:o,force:a}))},navigate:function(e,n,r){var c=H;if(!n&&o.isObject(e)&&(n=e,e=f),n&&(e=o.objectToPath({params:n,pathname:e},h)),e){var s=k(e),d={};if(d[b]=p({},s[b]),d[u]=s[u],d[u]){if(a){var l=t.query;if(l&&(l=l[b]))for(var m in l)v(l,m)&&!v(d[b],m)&&(d[b][m]=f)}}else{var g=p({},t[b]);d[b]=p(g,d[b]),d[u]=t[u]}var x,w=o.objectToPath(d);x=i?w!=t.srcQuery:w!=t.srcHash,x&&(i?(c.poped=1,history[r?"replaceState":"pushState"](null,null,w),c.route()):(p(d,t,d),d.srcHash=w,d.hash={params:d[b],pathname:d[u]},c.fire("!ul",{loc:t=d}),w="#!"+w,r?location.replace(w):location.hash=w))}}},c);return H.useState=function(){var e=H,t=location.href;s.addEventListener("popstate",function(){var n=location.href==t;(e.poped||!n)&&(e.poped=1,e.route())},!1)},H.useHash=function(){s.addEventListener("hashchange",H.route,!1)},H}),define("magix/body",["magix/magix"],function(e){var t=e("magix/magix"),n=t.has;t.mix;var r,i=t.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),a=document.body,o={},c="mx-owner",s="mx-ie",f={},u=65536,v=function(e){return e.id||(e.id="mx-e-"+u--)},p=function(e,t,n){return n?e.setAttribute(t,n):n=e.getAttribute(t),n},d={process:function(e){for(var t=e.target||e.srcElement;t&&1!=t.nodeType;)t=t.parentNode;var i=t,o=e.type,u=f[o]||(f[o]=RegExp("(?:^|,)"+o+"(?:,|$)"));if(!u.test(p(t,s))){for(var d,h,l="mx-"+o,m=[];i&&i!=a&&(d=p(i,l),h=p(i,s),!d&&!u.test(h));)m.push(i),i=i.parentNode;if(d){var g=p(i,c);if(!g)for(var x=i,w=r.all();x&&x!=a;){if(n(w,x.id)){p(i,c,g=x.id);break}x=x.parentNode}if(!g)throw Error("miss "+c+":"+d);var b=r.get(g),y=b&&b.view;y&&y.processEvent({info:d,se:e,tId:v(t),cId:v(i)})}else for(var C,h;m.length;)C=m.shift(),h=p(C,s),u.test(h)||(h=h?h+","+o:o,p(C,s,h))}},on:function(e,t){var n=this;if(o[e])o[e]++;else{r=t,o[e]=1;var c=i[e];c?n.unbubble(0,a,e):a["on"+e]=function(e){e=e||window.event,e&&n.process(e)}}},un:function(e){var t=this,n=o[e];if(n>0){if(n--,!n){var r=i[e];r?t.unbubble(1,a,e):a["on"+e]=null}o[e]=n}}};return d.unbubble=function(e,t,n){var r=e?"undelegate":"delegate";$(t)[r]("[mx-"+n+"]",n,d.process)},d}),define("magix/event",["magix/magix"],function(e){var t=e("magix/magix"),n=function(e){return"~"+e},r=t.safeExec,i={fire:function(e,t,i,a){var o=n(e),c=this,s=c[o];if(s){t||(t={}),t.type||(t.type=e);for(var f,u,v=s.length,p=v-1;v--;)f=a?v:p-v,u=s[f],(u.d||u.r)&&(s.splice(f,1),p--),u.d||r(u.f,t,c)}i&&delete c[o]},on:function(e,r,i){var a=n(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:r}):o.push({f:r,r:i})},un:function(e,t){var r=n(e),i=this[r];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[r]}};return i}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e){var t,n,r,i=e("magix/magix"),a=e("magix/event"),o=e("magix/view"),c=document,s=65536,f=i.mix,u=i.config("tagName"),v=i.config("rootId"),p=!i.config("tagNameChanged"),d=i.has,h="mx-view",l=p?"mx-defer":"mx-vframe",m="alter",g="created",x=function(e){return"object"==typeof e?e:c.getElementById(e)},w=function(e,t){return x(e).getElementsByTagName(t)},b=function(e){return c.createElement(e)},y=function(e){return e.id||(e.id="magix_vf_"+s--)},C=/<script[^>]*>[\s\S]*?<\/script>/gi,E=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<31,t.rM={}};return f(E,{root:function(e,n){if(!t){r=n;var i=x(v);i||(i=b(u),i.id=v,c.body.insertBefore(i,c.body.firstChild)),t=new E(v),e.add(t)}return t}}),f(f(E.prototype,a),{mountView:function(e,t){var n=this,a=x(n.id);if(a._bak?a._chgd=1:(a._bak=1,a._tmpl=a.innerHTML.replace(C,"")),n.unmountView(),e){var c=i.pathToObject(e),s=c.pathname,u=--n.sign;i.libRequire(s,function(e){if(u==n.sign){var i=n.owner;o.prepare(e);var v=new e({owner:n,id:n.id,$:x,path:s,vom:i,location:r});n.view=v,v.on("interact",function(e){e.tmpl||(a._chgd&&(a.innerHTML=a._tmpl),n.mountZoneVframes(0,0,1)),v.on("rendered",function(){n.mountZoneVframes(0,0,1)}),v.on("prerender",function(){n.unmountZoneVframes()||n.cAlter({caused:n.id})}),v.on("inited",function(){n.viewInited=1,n.fire("viewInited",{view:v})})},0),t=t||{},v.load(f(t,c.params,t))}})}},unmountView:function(){var e=this;if(e.view){n||(n={caused:e.id}),e.unmountZoneVframes(),e.cAlter(n),e.view.destroy();var t=x(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,n=0,e.fire("viewUnmounted")}e.un("viewInited"),e.sign--},mountVframe:function(e,t,n,r){var i=this,a=i.owner,o=a.get(e);return o||(o=new E(e),o.pId=i.id,d(i.cM,e)||i.cC++,i.cM[e]=r,a.add(o)),o.mountView(t,n),o},mountZoneVframes:function(e,t,n){var r=this;r.unmountZoneVframes(e);var i=e||r.id,a=w(i,u),o=a.length,c={};if(o)for(var s,f,v,m,g=0;o>g;g++)if(s=a[g],f=y(s),!d(c,f)&&(v=s.getAttribute(h),m=!s.getAttribute(l)==p,m||v)){r.mountVframe(f,v,t,n);for(var x,b=w(s,u),C=0,E=b.length;E>C;C++)x=b[C],v=x.getAttribute(h),m=!s.getAttribute(l)==p,m||v||(c[y(x)]=1)}r.cC==r.rC&&r.cCreated({})},unmountVframe:function(e){var t=this;e=e||t.id;var n=t.owner,r=n.get(e);if(r){var i=r.fcc;r.unmountView(),n.remove(e,i),t.fire("destroy");var a=n.get(r.pId);a&&d(a.cM,e)&&(delete a.cM[e],a.cC--)}},unmountZoneVframes:function(e){var t,n,r=this;if(e){t=w(e,u);for(var i,a={},o=r.cM,c=t.length-1;c>=0;c--)i=t[c].id,d(o,i)&&(a[i]=1);t=a}else t=r.cM;for(var s in t)n=1,r.unmountVframe(s);return n},cCreated:function(e){var t=this,n=t.view;n&&!t.fcc&&(t.fcc=1,delete t.fca,n.fire(g,e),t.fire(g,e));var r=t.owner;r.vfCreated();var i=t.id,a=r.get(t.pId);a&&!d(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.rC==a.cC&&a.cCreated(e))},cAlter:function(e){var t=this;if(delete t.fcc,!t.fca){var n=t.view,r=t.id;n&&(t.fca=1,n.fire(m,e),t.fire(m,e));var i=t.owner,a=i.get(t.pId);if(a&&d(a.rM,r)){var o=a.rM[r];a.rC--,delete a.rM[r],o&&a.cAlter(e)}}},locChged:function(e,t){var n=this,r=n.view;if(r&&r.sign&&r.rendered){var a=r.olChanged(t),o={location:e,changed:t,prevent:function(){this.cs=[]},toChildren:function(e){e=e||[],i.isString(e)&&(e=e.split(",")),this.cs=e}};a&&i.safeExec(r.locationChange,o,r);for(var c,s=o.cs||i.keys(n.cM),f=0,u=s.length,v=n.owner;u>f;f++)c=v.get(s[f]),c&&c.locChged(e,t)}}}),E}),define("magix/view",function(e){var t=e("magix/magix"),n=e("magix/event"),r=e("magix/body"),i=t.safeExec,a=t.has,o=",",c=[],s=t.mix,f=["render","renderUI"],u="~",v=function(e){return function(){var t,n=this,r=n.notifyUpdate();return r&&(t=e.apply(n,arguments)),t}},p=t.cache(40),d=function(e){var t=this;s(t,e),t.sign=1};s(d,{wrapUpdate:function(){var e=this;if(!e[u]){e[u]=1;for(var n,r,i=e.prototype,a=f.length-1;a>-1;a--)r=f[a],n=i[r],t.isFunction(n)&&n!=t.noop&&(i[r]=v(n))}}});var h=d.prototype,l=/<[a-z]+(?:[^">]|"[^"]*")+(?=>)/g,m=/\smx-owner\s*=/,g=/\smx-[^v][a-z]+\s*=/,x=function(e){return!m.test(e)&&g.test(e)?e+' mx-owner="'+x.t+'"':e},w={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},b=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,y=/(\w+):([^,]+)/g;s(h,n),s(h,{render:t.noop,locationChange:t.noop,init:t.noop,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,n=arguments,r=e.sign,o=a(e,"template"),s=function(a){if(r==e.sign){o||(e.template=e.wrapMxEvent(a)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),i(e.init,n,e),e.fire("inited",0,1),i(e.render,c,e);var s=!t&&!e.rendered;s&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!o?e.fetchTmpl(s):s()},beginUpdate:function(){var e=this;if(e.sign){var t=e.rendered;t&&(e.fire("refresh",0,1),e.fire("prerender"))}},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return x.t=this.id,(e+"").replace(l,x)},setViewHTML:function(e){var t,n=this;n.beginUpdate(),n.sign&&(t=n.$(n.id),t&&(t.innerHTML=e)),n.endUpdate()},observeLocation:function(e){var n,r=this;r.$ol||(r.$ol={keys:[]}),n=r.$ol;var i=n.keys;t.isObject(e)&&(n.pn=e.pathname,e=e.keys),e&&(n.keys=i.concat((e+"").split(o)))},olChanged:function(e){var t=this,n=t.$ol;if(n){var r=0;if(n.pn&&(r=e.isPathname()),!r){var i=n.keys;r=e.isParam(i)}return r}return 1},destroy:function(){var e=this;e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1),e.sign=0},parentView:function(){var e=this,t=e.vom,n=e.owner,r=t.get(n.pId),i=null;return r&&r.viewInited&&(i=r.view),i},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var n=e.info,r=e.se,a=p.get(n);a||(a=n.match(b),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(y,function(e,t,n){a.p[t]=n}),p.set(n,a));var o=t.events;if(o){var c=o[r.type],f=w[a.f];f&&f.call(w,r),f=c&&c[a.n],f&&i(f,s({view:t,currentId:e.cId,targetId:e.tId,domEvent:r,events:o,params:a.p},w),c)}}},delegateEvents:function(e){var t=this,n=t.events,i=e?r.un:r.on,a=t.vom;for(var o in n)i.call(r,o,a)}});var C=t.config("appHome"),E=t.config("debug")?"?t="+Date.now():"",M=function(e,n,r){for(var i in n)t.isObject(n[i])?(a(e,i)||(e[i]={}),M(e[i],n[i],1)):r&&(e[i]=n[i])};return d.prototype.fetchTmpl=function(e){var n=this,r="template"in n;if(r)e(tmpl);else{var a=t.tmpl(n.path);if(a.h)e(a.v);else{var o=C+n.path+".html",c=M[o],s=function(r){e(t.tmpl(n.path,r))};c?c.push(s):(c=M[o]=[s],$.ajax({url:o+E,success:function(e){i(c,e),delete M[o]},error:function(e,t){i(c,t),delete M[o]}}))}}},d.extend=function(e,n,r){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),n&&i(n,arguments,this)};return o.extend=a.extend,t.extend(o,a,e,r)},d.prepare=function(e){var t=this;if(!e.wrapUpdate){e.wrapUpdate=t.wrapUpdate,e.extend=t.extend;for(var n,r=e.prototype,i=e.superclass;i;)n=i.constructor,M(r,n.prototype),i=n.superclass}e.wrapUpdate()},d}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e){var t=e("magix/vframe"),n=e("magix/magix"),r=e("magix/event"),i=n.has,a=n.mix,o=0,c=0,s=0,f=0,u={},v={},p=n.mix({all:function(){return u},add:function(e){i(u,e.id)||(o++,u[e.id]=e,e.owner=p,p.fire("add",{vframe:e}))},get:function(e){return u[e]},remove:function(e,t){var n=u[e];n&&(o--,t&&c--,delete u[e],p.fire("remove",{vframe:n}))},vfCreated:function(){if(!f){c++;var e=c/o;e>s&&p.fire("progress",{percent:s=e},f=1==e)}},root:function(){return t.root(p,v)},locChged:function(e){var t,n=e.loc;if(n?t=1:n=e.location,a(v,n),!t){var r=p.root(),i=e.changed;i.isView()?r.mountView(n.view):r.locChged(n,i)}}},r);return p}),function(e){var t=function(){};e.console||(e.console={log:t,info:t,error:t});var n,r={};e.Magix||(e.Magix={config:function(e){for(var t in e)r[t]=e[t]},start:function(e){n=e}},seajs.use("magix/magix",function(t){e.Magix=t,t.config(r),n&&t.start(n)}))}(this);