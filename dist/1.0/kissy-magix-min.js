KISSY.add("magix/body",function(j,a,t){var v=a.has,i=a.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),k=document.body,o={},n={},u=65536,m=function(l,d,h){h?l.setAttribute(d,h):h=l.getAttribute(d);return h},p,q={process:function(l){for(var d=l.target||l.srcElement;d&&1!=d.nodeType;)d=d.parentNode;var h=d,a=l.type,i=n[a]||(n[a]=RegExp("(?:^|,)"+a+"(?:,|$)"));if(!i.test(m(d,"mx-ie"))){for(var w="mx-"+a,r,c,b=[];h&&h!=k&&!(r=m(h,w),c=m(h,"mx-ie"),r||i.test(c));)b.push(h),
h=h.parentNode;if(r){a=m(h,"mx-owner");if(!a){i=h;for(c=p.all();i&&i!=k;)if(v(c,i.id)){m(h,"mx-owner",a=i.id);break}else i=i.parentNode}if(a)(a=(a=p.get(a))&&a.view)&&a.processEvent({info:r,se:l,tId:d.id||(d.id="mx-e-"+u--),cId:h.id||(h.id="mx-e-"+u--)});else throw Error("miss mx-owner:"+r);}else for(;b.length;)l=b.shift(),c=m(l,"mx-ie"),i.test(c)||(c=c?c+","+a:a,m(l,"mx-ie",c))}},on:function(a,d){var h=this;o[a]?o[a]++:(p=d,o[a]=1,i[a]?h.unbubble(0,k,a):k["on"+a]=function(a){(a=a||window.event)&&
h.process(a)})},un:function(a){var d=o[a];0<d&&(d--,d||(i[a]?this.unbubble(1,k,a):k["on"+a]=null),o[a]=d)}};q.unbubble=function(a,d,h){(a?t.undelegate:t.delegate).call(t,d,h,"[mx-"+h+"]",q.process)};return q},{requires:["magix/magix","event","sizzle"]});
KISSY.add("magix/event",function(j,a){var t=a.safeExec;return{fire:function(a,i,k,o){var n="~"+a,j=this[n];if(j){i||(i={});if(!i.type)i.type=a;for(var a=j.length,m=a-1,p,q;a--;){p=o?a:m-a;q=j[p];if(q.d||q.r)j.splice(p,1),m--;q.d||t(q.f,i,this)}}k&&delete this[n]},on:function(j,i,k){j="~"+j;j=this[j]||(this[j]=[]);a.isNumeric(k)?j.splice(k,0,{f:i}):j.push({f:i,r:k})},un:function(a,i){var k="~"+a,j=this[k];if(j)if(i)for(var k=j.length-1,n;0<=k;k--){if(n=j[k],n.f==i&&!n.d){n.d=1;break}}else delete this[k]}}},
{requires:["magix/magix"]});
KISSY.add("magix/magix",function(j){var a=[].slice,t=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,v=/\/[^\/]*$/,i=/[#?].*$/,k=/([^=&?\/#]+)=([^&=#?]*)/g,o=/^https?:\/\//i,n={},u=0,m={debug:false,iniFile:"app/ini",appName:"app",appHome:"./",tagName:"vframe",rootId:"magix_vf_root"},p=n.hasOwnProperty,q=function(b){return function(a,g,f){switch(arguments.length){case 0:f=b;break;case 1:f=c.isObject(a)?x(b,a):h(b,a)?b[a]:null;break;case 2:null===g?(delete b[a],f=g):b[a]=f=g}return f}},l=function(b){this.c=
[];this.x=b||20;this.b=this.x+5},d=function(b){return new l(b)},h=function(b,a){return b?p.call(b,a):0},x=function(b,a,g){for(var f in a)if(!g||!h(g,f))b[f]=a[f];return b};x(l.prototype,{get:function(b){var a=this.c,g,b="pathname"+b;if(h(a,b)&&(g=a[b],1<=g.f))g.f++,g.t=u++,g=g.v;return g},set:function(b,a){var g=this.c,b="pathname"+b,f=g[b];if(!h(g,b)){if(g.length>=this.b){g.sort(function(e,b){return b.f==e.f?b.t-e.t:b.f-e.f});for(var e=this.b-this.x;e--;)f=g.pop(),delete g[f.k]}f={};g.push(f);g[b]=
f}f.k=b;f.v=a;f.f=1;f.t=u++;return f},del:function(b){var b="pathname"+b,a=this.c,g=a[b];if(g)g.f=-1E5,g.v="",delete a[b]},has:function(b){return h(this.c,"pathname"+b)}});var y=d(60),w=d(),r=function(b,a,g,f,e,s){c.isArray(b)||(b=[b]);if(!a||!c.isArray(a)&&!a.callee)a=[a];for(f=0;f<b.length;f++)try{s=b[f],e=c.isFunction(s)&&s.apply(g,a)}catch(d){}return e},c={isNumeric:function(b){return!isNaN(parseFloat(b))&&isFinite(b)},mix:x,has:h,safeExec:r,noop:function(){},config:q(m),start:function(b){var a=
this,b=x(m,b);a.libEnv(b);a.libRequire(b.iniFile,function(g){m=x(b,g,b);var f=b.progress;a.libRequire(["magix/router","magix/vom"],function(e,g){e.on("!ul",g.locChged);e.on("changed",g.locChged);f&&g.on("progress",f);a.libRequire(b.extensions,e.start)})});b.ready&&(r(b.ready),delete b.ready)},keys:Object.keys||function(b){var a=[],g;for(g in b)h(b,g)&&a.push(g);return a},local:q({}),path:function(b,a){var g=b+"\n"+a,f=w.get(g);if(!f){o.test(a)?f=a:(b=b.replace(i,"").replace(v,"")+"/","/"==a.charAt(0)?
(f=o.test(b)?8:0,f=b.indexOf("/",f),f=b.substring(0,f)+a):f=b+a);for(;t.test(f);)f=f.replace(t,"$1/");w.set(g,f)}return f},pathToObject:function(b,a){var g=y.get(b);if(!g){var g={},f={},e="";i.test(b)?e=b.replace(i,""):~b.indexOf("=")||(e=b);if(e&&o.test(e))var c=e.indexOf("/",8),e=-1==c?"/":e.substring(c);b.replace(k,function(e,b,g){if(a)try{g=decodeURIComponent(g)}catch(c){}f[b]=g});g.pathname=e;g.params=f;y.set(b,g)}return g},objectToPath:function(b,a){var g=b.pathname,c=[],e=b.params,s,d;for(d in e)s=
e[d],a&&encodeURIComponent(s),c.push(d+"="+s);return g+(g&&c.length?"?":"")+c.join("&")},tmpl:function(b,a){return 1==arguments.length?{v:n[b],h:h(n,b)}:n[b]=a},listToMap:function(a,c){var g,f,e={},s;this.isString(a)&&(a=a.split(","));if(a&&(s=a.length))for(g=0;g<s;g++)f=a[g],e[c?f[c]:f]=c?f:1;return e},cache:d};return x(c,{libRequire:function(b,c){b?j.use(b.toString(),function(b){c&&c.apply(b,a.call(arguments,1))}):c&&c()},libEnv:function(a){var c=a.appHome,g=location,f=a.appName,c=this.path(g.href,
c+"/");a.appHome=c;var e=a.debug;e&&(e=0==c.indexOf(g.protocol+"//"+g.host+"/"));g="";(g=e?j.now():a.appTag)&&(g+=".js");j.config({packages:[{name:f,path:c,debug:a.debug=e,combine:a.appCombine,tag:g}]})},isArray:j.isArray,isFunction:j.isFunction,isObject:j.isObject,isRegExp:j.isRegExp,isString:j.isString,isNumber:j.isNumber})});
KISSY.add("magix/router",function(j,a,t,v){var i=window,k=a.has,o=a.mix,n=document,u=/^UTF-8$/i.test(n.charset||n.characterSet||"UTF-8"),m=a.config(),p=a.cache(),q=a.cache(),l,d,h,x=/#.*$/,y=/^[^#]*#?!?/,w=m.nativeHistory,r,c,b=function(e,b,c){if(e){c=this.params;a.isArray(e)||(e=e.split(","));for(var g=0;g<e.length&&!(b=k(c,e[g]));g++);}return b},A=function(){return k(this,"pathname")},g=function(){return k(this,"view")},f=function(){return this.hash.pathname!=this.query.pathname},e=function(a){return this.hash.params[a]!=
this.query.params[a]},s=function(a){return k(this.hash.params,a)},C=function(a){return k(this.query.params,a)},D=function(a){return this.params[a]},B=function(e){var e=a.pathToObject(e,u),b=e.pathname;b&&c&&(e.pathname=a.path(i.location.pathname,b));return e},z=o({getView:function(e){if(!h){h={rs:m.routes||{},nf:m.notFoundView};var b=m.defaultView;if(!b)throw Error("unset defaultView");h.home=b;var c=m.defaultPathname||"";h.rs[c]=b;h.pathname=c}e||(e=h.pathname);b=h.rs;b=a.isFunction(b)?b.call(m,
e):b[e];return{view:b?b:h.nf||h.home,pathname:b?e:h.nf?e:h.pathname}},start:function(){var a=z,e=i.history;r=w&&e.pushState;c=w&&!r;r?a.useState():a.useHash();a.route()},parseQH:function(a){var a=a||i.location.href,b=z,c=p.get(a);if(!c){var c=a.replace(x,""),g=a.replace(y,""),d=B(c),r=B(g),h={};o(h,d.params);o(h,r.params);c={pathnameDiff:f,paramDiff:e,hashOwn:s,queryOwn:C,get:D,href:a,srcQuery:c,srcHash:g,query:d,hash:r,params:h};p.set(a,c)}c.view||(a=b.getView(w?c.hash.pathname||c.query.pathname:
c.hash.pathname),o(c,a));return c},getChged:function(a,e){var c=e.href,f=a.href+"\n"+c,d=q.get(f);d||(f=c+"\n"+f,d=q.get(f));if(!d){var s,d={params:{}};if(a.pathname!=e.pathname)s=d.pathname=1;if(a.view!=e.view)s=d.view=1;var c=a.params,w=e.params,h;for(h in c)c[h]!=w[h]&&(s=1,d.params[h]=1);for(h in w)c[h]!=w[h]&&(s=1,d.params[h]=1);d.occur=s;d.isParam=b;d.isPathname=A;d.isView=g;q.set(f,d)}return d},route:function(){var a=z,e=a.parseQH(),b=d||{params:{},href:"~"},c=!d;d=e;b=a.getChged(b,e);b.occur&&
(l=e,a.fire("changed",{location:e,changed:b,force:c}))},navigate:function(e,b,g){var d=z;!b&&a.isObject(e)&&(b=e,e="");b&&(e=a.objectToPath({params:b,pathname:e},u));if(e){b=B(e);e={};e.params=o({},b.params);e.pathname=b.pathname;if(e.pathname){if(c&&(b=l.query)&&(b=b.params))for(var f in b)k(b,f)&&!k(e.params,f)&&(e.params[f]="")}else f=o({},l.params),e.params=o(f,e.params),e.pathname=l.pathname;f=a.objectToPath(e);if(r?f!=l.srcQuery:f!=l.srcHash)r?(d.poped=1,history[g?"replaceState":"pushState"]({},
n.title,f),d.route()):(o(e,l,e),e.srcHash=f,e.hash={params:e.params,pathname:e.pathname},d.fire("!ul",{loc:l=e}),f="#!"+f,g?location.replace(f):location.hash=f)}}},t);z.useState=function(){var e=z,a=location.href;v.on(i,"popstate",function(){var b=location.href==a;if(e.poped||!b)e.poped=1,e.route()})};z.useHash=function(){v.on(i,"hashchange",z.route)};return z},{requires:["magix/magix","magix/event","event"]});
KISSY.add("magix/vframe",function(j,a,t,v){var i=document,k=65536,o=window.CollectGarbage||a.noop,n=a.mix,j=a.config(),u=j.tagName,m=j.rootId,p=a.has,q,l,d=function(a){return"object"==typeof a?a:i.getElementById(a)};i.createElement(u);var h=/<script[^>]*>[\s\S]*?<\/script>/ig,x,y=function(a){this.id=a;this.cM={};this.rC=this.cC=0;this.sign=-2147483648;this.rM={}};n(y,{root:function(a,h){if(!q){x=h;var c=d(m);if(!c)c=i.createElement(u),c.id=m,i.body.insertBefore(c,i.body.firstChild);q=new y(m);a.add(q)}return q}});
n(n(y.prototype,t),{mountView:function(w,r){var c=this,b=d(c.id);b._bak?b._chgd=1:(b._bak=1,b._tmpl=b.innerHTML.replace(h,""));c.unmountView();if(w){var i=a.pathToObject(w),g=i.pathname,f=--c.sign;a.libRequire(g,function(e){if(f==c.sign){var a=c.owner;v.prepare(e);var h=new e({owner:c,id:c.id,$:d,path:g,vom:a,location:x});c.view=h;h.on("interact",function(e){if(!e.tmpl){if(b._chgd)b.innerHTML=b._tmpl;c.mountZoneVframes(0,0,1)}h.on("rendered",function(){c.mountZoneVframes(0,0,1)});h.on("prerender",
function(){c.unmountZoneVframes()});h.on("inited",function(){c.viewInited=1;c.fire("viewInited",{view:h})})},0);r=r||{};h.load(n(r,i.params,r))}})}},unmountView:function(){if(this.view){l||(l={caused:this.id});this.unmountZoneVframes();this.cAlter(l);this.view.destroy();var a=d(this.id);if(a&&a._bak)a.innerHTML=a._tmpl;delete this.view;delete this.viewInited;l=0;this.fire("viewUnmounted");o()}this.un("viewInited");this.sign--},mountVframe:function(a,d,c,b){var h=this.owner,g=h.get(a);if(!g)g=new y(a),
g.pId=this.id,p(this.cM,a)||this.cC++,this.cM[a]=b,h.add(g);g.mountView(d,c);return g},mountZoneVframes:function(a,h,c){this.unmountZoneVframes(a);var a=d(a||this.id).getElementsByTagName(u),b=a.length,i={};if(b)for(var g=0,f,e,s,j;g<b;g++){f=a[g];e=f.id||(f.id="magix_vf_"+k--);p(i,e)||(s=f.getAttribute("mx-view"),j=f.getAttribute("mx-defer"),(!j||s)&&this.mountVframe(e,s,h,c));f=d(f).getElementsByTagName(u);e=0;for(s=f.length;e<s;e++)i[f[e].id||(f[e].id="magix_vf_"+k--)]=1}this.cC==this.rC&&this.cCreated({})},
unmountVframe:function(a){var a=a||this.id,d=this.owner,c=d.get(a);if(c){var b=c.fcc;c.unmountView();d.remove(a,b);if((d=d.get(c.pId))&&p(d.cM,a))delete d.cM[a],d.cC--}},unmountZoneVframes:function(a){if(a){for(var a=d(a).getElementsByTagName(u),h={},c=this.cM,b=a.length-1,i;0<=b;b--)i=a[b].id,p(c,i)&&(h[i]=1);a=h}else a=this.cM;for(var g in a)this.unmountVframe(g)},cCreated:function(a){var d=this.view;if(d&&!this.fcc)this.fcc=1,delete this.fca,d.fire("created",a),this.fire("created",a);var c=this.owner;
c.vfCreated();d=this.id;if((c=c.get(this.pId))&&!p(c.rM,d))c.rM[d]=c.cM[d],c.rC++,c.rC==c.cC&&c.cCreated(a)},cAlter:function(a){delete this.fcc;if(!this.fca){var d=this.view,c=this.id;if(d)this.fca=1,d.fire("alter",a),this.fire("alter",a);if((d=this.owner.get(this.pId))&&p(d.rM,c)){var b=d.rM[c];d.rC--;delete d.rM[c];b&&d.cAlter(a)}}},locChged:function(d,h){var c=this.view;if(c&&c.sign&&c.rendered){var b=c.olChanged(h),i={location:d,changed:h,prevent:function(){this.cs=[]},toChildren:function(e){e=
e||[];a.isString(e)&&(e=e.split(","));this.cs=e}};b&&a.safeExec(c.locationChange,i,c);for(var c=i.cs||a.keys(this.cM),b=0,i=c.length,g=this.owner,f;b<i;b++)(f=g.get(c[b]))&&f.locChged(d,h)}}});return y},{requires:["magix/magix","magix/event","magix/view"]});
KISSY.add("magix/view",function(j,a,t,v,i){var k=a.safeExec,o=a.has,n=[],u=a.config(),m=a.mix,p=["render","renderUI"],q=function(a){return function(){var b;this.notifyUpdate()&&(b=a.apply(this,arguments));return b}},l=a.cache(40),d=function(a){m(this,a);this.sign=1};m(d,{wrapUpdate:function(){if(!this["~"]){this["~"]=1;for(var e=this.prototype,b,c=p.length-1,d;-1<c;c--)d=p[c],b=e[d],a.isFunction(b)&&b!=a.noop&&(e[d]=q(b))}}});var h=d.prototype,x=window.CollectGarbage||a.noop,y=/<[a-z]+(?:[^">]|"[^"]*")+(?=>)/g,
w=/\smx-owner\s*=/,r=/\smx-[^v][a-z]+\s*=/,c=function(a){return!w.test(a)&&r.test(a)?a+' mx-owner="'+c.t+'"':a},b={prevent:function(a){a=a||this.domEvent;a.preventDefault?a.preventDefault():a.returnValue=!1},stop:function(a){a=a||this.domEvent;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},halt:function(a){this.prevent(a);this.stop(a)}},A=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,g=/(\w+):([^,]+)/g;m(h,t);m(h,{render:a.noop,locationChange:a.noop,init:a.noop,hasTmpl:!0,enableEvent:!0,load:function(){var a=
this,b=a.hasTmpl,c=arguments,d=a.sign,g=o(a,"template"),f=function(f){if(d==a.sign){if(!g)a.template=a.wrapMxEvent(f);a.delegateEvents();a.fire("interact",{tmpl:b},1);k(a.init,c,a);a.fire("inited",0,1);k(a.render,n,a);if(!b&&!a.rendered)a.rendered=!0,a.fire("primed",null,1)}};b&&!g?a.fetchTmpl(f):f()},beginUpdate:function(){this.sign&&this.rendered&&(this.fire("refresh",0,1),this.fire("prerender"))},endUpdate:function(){if(this.sign)this.rendered||this.fire("primed",0,1),this.rendered=!0,this.fire("rendered"),
x()},notifyUpdate:function(){this.sign&&(this.sign++,this.fire("rendercall"));return this.sign},wrapMxEvent:function(a){c.t=this.id;return(""+a).replace(y,c)},setViewHTML:function(a){var b;this.beginUpdate();if(this.sign&&(b=this.$(this.id)))b.innerHTML=a;this.endUpdate()},observeLocation:function(b){var c;if(!this.$ol)this.$ol={keys:[]};c=this.$ol;var d=c.keys;if(a.isObject(b))c.pn=b.pathname,b=b.keys;if(b)c.keys=d.concat(a.isString(b)?b.split(","):b)},olChanged:function(a){var b=this.$ol;if(b){var c=
0;b.pn&&(c=a.isPathname());c||(c=a.isParam(b.keys));return c}return 1},destroy:function(){this.fire("refresh",0,1);this.fire("destroy",0,1,1);this.delegateEvents(1);this.sign=0},parentView:function(){var a=this.vom.get(this.owner.pId),b=null;if(a&&a.viewInited)b=a.view;return b},processEvent:function(a){if(this.enableEvent&&this.sign){var c=a.info,d=a.se,f=l.get(c);f||(f=c.match(A),f={n:f[1],f:f[2],i:f[3],p:{}},f.i&&f.i.replace(g,function(a,b,c){f.p[b]=c}),l.set(c,f));if(c=this.events){var h=c[d.type],
i=b[f.f];i&&i.call(b,d);(i=h&&h[f.n])&&k(i,m({view:this,currentId:a.cId,targetId:a.tId,domEvent:d,events:c,params:f.p},b),h)}}},delegateEvents:function(a){var b=this.events,a=a?v.un:v.on,c=this.vom,d;for(d in b)a.call(v,d,c)}});var f=function(a,b,c){for(var d in b)j.isObject(b[d])?(o(a,d)||(a[d]={}),f(a[d],b[d],1)):c&&(a[d]=b[d])};d.prototype.fetchTmpl=function(b){var c=this,d=c.template;if(j.isUndefined(d))if(d=a.tmpl(c.path),d.h)b(d.v);else{var g=u.appHome+c.path+".html",h=f[g],d=function(d){b(a.tmpl(c.path,
d))};h?h.push(d):(h=f[g]=[d],i({url:g+(u.debug?"?t="+j.now():""),success:function(a){k(h,a);delete f[g]},error:function(a,b){k(h,b);delete f[g]}}))}else b(d)};d.extend=function(a,b){var c=function(){c.superclass.constructor.apply(this,arguments);b&&k(b,arguments,this)};c.extend=this.extend;return j.extend(c,this,a)};d.prepare=function(a){if(!a.wrapUpdate){a.wrapUpdate=this.wrapUpdate;a.extend=this.extend;for(var b=a.prototype,c=a.superclass;c;)c=c.constructor,f(b,c.prototype),c=c.superclass}a.wrapUpdate()};
return d},{requires:["magix/magix","magix/event","magix/body","ajax"]});
KISSY.add("magix/vom",function(j,a,t,v){var i=t.has,k=t.mix,o=0,n=0,u=0,m=0,p={},q={},l=t.mix({all:function(){return p},add:function(a){if(!i(p,a.id))o++,p[a.id]=a,a.owner=l,l.fire("add",{vframe:a})},get:function(a){return p[a]},remove:function(a,h){var i=p[a];i&&(o--,h&&n--,delete p[a],l.fire("remove",{vframe:i}))},vfCreated:function(){if(!m){n++;var a=n/o;u<a&&l.fire("progress",{percent:u=a},m=1==a)}},root:function(){return a.root(l,q)},locChged:function(a){var h=a.loc,i;h?i=1:h=a.location;k(q,
h);if(!i)i=l.root(),a=a.changed,a.isView()?i.mountView(h.view):i.locChged(h,a)}},v);return l},{requires:["magix/vframe","magix/magix","magix/event"]});(function(j){var a=function(){};if(!j.console)j.console={log:a,info:a,error:a};var t,v={};if(!j.Magix)j.Magix={config:function(a){for(var j in a)v[j]=a[j]},start:function(a){t=a}},KISSY.use("magix/magix",function(a,k){j.Magix=k;k.config(v);t&&k.start(t)})})(this);