﻿var Platform={Andoird:null,IOS:null,APP:null,callback:{}};
!function(d){var a=window.navigator.userAgent;d.APP=/x5app|betwinapp/i.test(a);d.IOS=/iPhone|iPad/i.test(a);d.Andoird=/Android/i.test(a);d.APP&&(document.writeln('<script type="text/javascript" src="/cordova.js">\x3c/script>'),document.addEventListener("deviceready",function(){d.callback.appVersion=function(a,b){b||(b=function(){alert("\u7248\u672c\u53f7\u83b7\u53d6\u5931\u8d25")});cordova.getAppVersion.getVersionNumber(a,b)};d.callback.cacheClear=function(){window.cache.clear(function(a){alert("\u7f13\u5b58\u6e05\u9664\u6210\u529f")},
function(a){alert("\u7f13\u5b58\u6e05\u7406\u5931\u8d25\uff0c"+a)})};d.callback.touchCheck=function(a,b){b||(b=function(){});navigator.touchid.checkSupport(a,b)};d.callback.touchidAuthenticate=function(a,b,e){b||(b=function(){});e||(e="\u8bf7\u5f00\u59cb\u6307\u7eb9\u8bc6\u522b\uff1a\u5c06\u624b\u6307\u653e\u4e8ehome\u952e\uff0c\u6838\u5bf9\u6307\u7eb9\u3002");navigator.touchid.authenticate(a,b,e)}}))}(Platform);window.BW||(window.BW={});
(function(d){d.BindEvent=new Class({Implements:[Events,Options],options:{action:null,type:null,event:null,data:null,search:null,pagesplit:null,pageindex:1,pagesize:20,load:null,callback:null,"callback-error":null,target:null,stop:!1,"confirm-tip":"\u786e\u8ba4\u8981\u8fdb\u884c\u8be5\u64cd\u4f5c\u5417\uff1f"},loading:"bw-loading",dom:{element:null,container:null,searchbox:null,pagesplit:null},loadOptions:function(a){var c=this;Object.forEach(Element.GetAttribute(c.dom.element,"data-bind-"),function(a,
e){c.options[e]||(c.options[e]=a)})},initialize:function(a,c){var b=this;b.setOptions(c);b.dom.element=a=$(a);b.loadOptions();switch(b.dom.element.get("tag")){case "form":b.options.type="form",b.dom.element.set("action",b.options.action)}if(a=b.getPostData())b.options.data=a;b.dom.container=b.options.target?$(b.options.target):b.dom.element;b.load();b.loadOptions();b.options.search&&(b.dom.searchbox=$(b.options.search));if(b.options.search&&null==b.dom.searchbox)alert("\u6307\u5b9a\u7684\u641c\u7d22\u6846\u5bf9\u8c61"+
b.options.search+"\u4e0d\u5b58\u5728");else if(b.options.pagesplit&&(b.dom.pagesplit=$(b.options.pagesplit)),b.options.pagesplit&&null==b.dom.pagesplit)alert("\u6307\u5b9a\u7684\u5206\u9875\u63a7\u4ef6"+b.options.pagesplit+"\u4e0d\u5b58\u5728");else if(null!=b.dom.container)switch(b.options.stop||b.fire(),b.options.event){case "click":case "submit":b.dom.element.addEvent(b.options.event,function(){b.fire.apply(b)});break;case "confirm":b.dom.element.addEvent("click",function(){new BW.Tip(b.options["confirm-tip"],
{type:"confirm",callback:function(){b.fire.apply(b)}})})}},load:function(){var a=this;a.options.load&&a.options.load.split(",").each(function(c){d.load[c]&&d.load[c].apply(a)})},run:function(a,c){var b=this;c||(c=b.options.callback);c&&("object"!=typeof a||a.success||b.options["callback-error"]||!BW.callback["golbal-error"]||BW.callback["golbal-error"].apply(b,[a]),c.split(",").each(function(c){d.callback[c]&&d.callback[c].apply(b,[a])}))},updateDelay:function(){this.dom.container.getElements("[data-bind-action-delay]").each(function(a){var c=
a.get("data-bind-action-delay");a.set("data-bind-action",c);a.set("data-bind-action-delay",null)})},bindAction:function(){this.updateDelay();this.dom.container.getElements("[data-bind-action]").each(function(a){d.Bind(a)})},getPostData:function(){var a=this;if(!a.dom.element.get("data-bind-data"))return null;var c={};a.dom.element.get("data-bind-data").split(",").each(function(b){switch(b){case "parent":b=a.dom.element.getParent("[data-bind-post]");null!=b&&(a.options.data=Object.merge(c,b.get("data-bind-post").parseQueryString()));
break;case "form":(b=a.dom.element.getParent("form"))&&(c=Element.GetData(b));break;default:b.contains("=")&&(c=Object.merge(c,b.parseQueryString()))}});return c},fire:function(a){var c=this.getPostData();c&&(this.options.data=c);this[this.options.type]&&this[this.options.type].apply(this,[a])},control:function(){var a=this;(new Request.HTML({url:a.options.action,onRequest:function(){document.body.addClass(a.loading)},onComplete:function(){document.body.removeClass(a.loading)},onSuccess:function(c,
b,e,f){a.dom.container.set("html",e);a.run(e);a.bindAction()}})).get()},ajax:function(a){var c=this,b=c.options.data;if(c.dom.searchbox)var e=Element.toQueryString(c.dom.searchbox).parseQueryString(),b=Object.merge(e,b);(new Request.JSON({url:c.options.action,onRequest:function(){document.body.addClass(c.loading)},onComplete:function(){document.body.removeClass(c.loading)},onFailure:function(a){switch(a.status){case 503:a=null;break;default:a=a.response}a&&(a=a.replace(/\<a .+?\<\/a\>/g,"BetWin 2.0.1"),
new BW.Tip(a))},onSuccess:function(b){c.run(b,a);c.bindAction()}})).post(b)},form:function(){var a=this,c=a.dom.element,b=c.get("id");b||(b="form-"+(new Date).getTime(),c.set("id",b));var e=!1;c.getElement("[type=file]")&&(e=!0);var f={onRequest:function(){document.body.addClass(a.loading)},onComplete:function(){document.body.removeClass(a.loading)},onFailure:function(a){new BW.Tip(a.response)},onSuccess:function(b){b=JSON.decode(b);a.run(b)}};c.set({"data-bind":!0,send:f,events:{submit:function(b){b&&
b.stop();var g=!0;c.getElements("[data-regex]").each(function(a){g&&!Regex.test(a.get("data-regex"),a.get("value"))&&(new BW.Tip(a.get("placeholder"),{callback:function(){a.focus()}}),g=!1)});if(g)if(e){var h=new XMLHttpRequest;h.open("POST",c.get("action"),!0);h.onload=function(a){f.onComplete();if(200==h.status)f.onSuccess(h.response);else f.onFailure(h)};f.onRequest();h.send(new FormData(c))}else"search"==c.get("data-bind-type")?d.Bind(a.dom.container).fire():this.hasClass(a.loading)||(null!=a.options.data&&
Object.forEach(a.options.data,function(a,b){var e=c.getElement("input[name="+b+"]");null==e&&(e=new Element("input",{type:"hidden",name:b}),e.inject(c));e.set("value",a)}),c.send())}}})},list:function(){var a=this,c={};null!=a.dom.searchbox&&(c=Element.toQueryString(a.dom.searchbox).parseQueryString());c.pageindex=a.options.pageindex;null!=a.options.data&&(c=Object.merge(c,a.options.data));(new Request.JSON({url:a.options.action,onRequest:function(){document.body.addClass(a.loading)},onComplete:function(){document.body.removeClass(a.loading)},
onSuccess:function(b){a.run(b);a.bindAction()}})).post(c)}});d.Bind=function(a){null==a.retrieve("bind")&&a.store("bind",new BW.BindEvent(a));return a.retrieve("bind")}})(BW);
(function(d){d.callback={html:function(a){var c=this.dom.container.retrieve("html",this.dom.container.get("html"));this.dom.container.store("html",c);a.info&&(this.dom.container=this.dom.container.set("html",c.toHtml(a.info)))},"html-img":function(a){this.dom.container.getElements("img[data-src]").each(function(a){a.set("src",a.get("data-src"));a.set("data-src",null)})},"html-field":function(a){a.success?this.dom.container.getElements("[data-bind-html]").each(function(c){var b=c.retrieve("html",c.get("html"));
c.store("html",c);c.set("html",b.toHtml(a.info))}):new BW.Tip(a.msg)},list:function(a){if(a.success){var c=this.dom.container.getElement("[data-list-element]");if(null==c)alert("\u5217\u8868\u5bf9\u8c61\u4e2d\u6ca1\u6709\u6307\u5b9adata-list-element\u5bf9\u8c61");else{var b=c.retrieve("template");null==b&&(b=c.get("html"),c.store("template",b));c.empty();var e=[];a.info.length&&(a.info={RecordCount:a.info.length,list:a.info});if(0==a.info.RecordCount)if("table"==this.dom.container.get("tag")){var f=
this.dom.container.getElement("thead tr").getElements("th").length;e.push('<tr><td colspan="'+f+'"><p class="am-alert am-text-center">\u6ca1\u6709\u7b26\u5408\u5f53\u524d\u6761\u4ef6\u7684\u8bb0\u5f55</p></td></tr>')}else e.push("");else a.info.list.each(function(a){e.push(b.toHtml(a))});c.set("html",e.join(""));null!=this.dom.pagesplit&&d.callback.pagesplit.apply(this,[a])}}else new BW.Tip(a.msg)},pagesplit:function(a){var c=this,b=c.dom.pagesplit;b.empty();a=a.info;a.PageIndex=a.PageIndex.toInt();
var e=a.MaxPage=0==a.RecordCount%a.PageSize?a.RecordCount/a.PageSize:Math.floor(a.RecordCount/a.PageSize)+1;if(0!=e){b.addClass("mui-content-padded");var d=new Element("ul",{"class":"mui-pagination"});(new Element("li",{"class":"mui-previous "+(1==a.PageIndex?"mui-disabled":""),html:'<a href="javascript:" data-page="1">\u00ab</a>'})).inject(d);for(var g=Math.max(1,a.PageIndex-2);g<=Math.min(a.PageIndex+2,e);g++)(new Element("li",{"class":g==a.PageIndex?"mui-active":"",html:'<a href="javascript:" data-page="'+
g+'">'+g+"</a>"})).inject(d);(new Element("li",{"class":"mui-next "+(a.PageIndex==e?"mui-disabled":""),html:'<a href="javascript:" data-page="'+a.MaxPage+'">\u00bb</a>'})).inject(d);d.inject(b);d.getElements("a").addEvent("click",function(a){this.hasClass("am-disabled")||this.hasClass("am-active")||(c.options.pageindex=this.get("data-page"),c.fire())})}},fire:function(a){a=this;a=null==a.dom.element.get("data-bind-fire-target")?a.dom.element:$(a.dom.element.get("data-bind-fire-target"));null==a?alert("\u6307\u5b9a\u7684\u6267\u884c\u5bf9\u8c61\u4e3a\u7a7a data-bind-fire-target"):
(a=d.Bind(a),a.fire())},"success-fire":function(a){a.success&&d.callback.fire.apply(this)},"error-tip":function(a){if(!a.success){var c=this;new BW.Tip(a.msg,{callback:function(){var b=c.dom.element.get("data-bind-error-tip");b&&BW.callback[b]&&c.run(a,b)}})}},tip:function(){d.load.tip.apply(this)},"form-fill":function(a){var c=this;if(a.success){var b=a.info;null==b?new BW.Tip("\u7ed1\u5b9a\u63a7\u4ef6\u4e3a\u7a7a"):c.dom.container.getElements("[name],[data-name]").each(function(c){var e=c.get("name")||
c.get("data-name"),e=Object.getValue(b,e);switch(c.get("type")){case "checkbox":c.set("checked",1==e||"true"==e);break;case "image":c.set("src",e);break;default:switch(c.get("tag")){case "select":c.set("data-selected",e);break;case "img":c.set("src",e)}c.set("value",e)}Object.each(Element.GetAttribute(c),function(b,e){/\$\{(.+?)\}/.test(b)&&(b=b.toHtml(a.info),c.set("data-"+e,b))})})}else new BW.Tip(a.msg,{callback:function(){var b=c.dom.element.get("data-bind-form-fill-faild");b&&c.run(a,b)}})},
"form-tip":function(a){var c=this;new BW.Tip(a.msg,{callback:function(){if(a.success){"form"==c.dom.element.get("tag")&&c.dom.element.reset();var b=c.dom.element.get("data-bind-form-tip");b&&c.run(a,b)}}})},"form-refser":function(a){if(a.success){a=this.dom.element.get("data-bind-refser");if(null==a)return null;a=$(a);if(null==a)return null;d.Bind(a).fire()}},"delete":function(a){var c=this;new BW.Tip(a.msg,{callback:function(){if(a.success){var b=c.dom.element.getParent("[data-bind-delete]");null!=
b&&b.dispose()}}})},"diag-close":function(a){a=this.dom.element.getParent(".diag[data-name]");if(null!=a){a=a.get("data-name");if(!BW.diagObj[a]||!BW.diagObj[a].target)return null;BW.diagObj[a].target.Close()}},select:function(a){var c=this;if(a.info)if("array"==typeOf(a.info)&&(a.info={list:a.info,recordCount:a.info.length}),!a.info.list)Object.forEach(a.info,function(a,b){var e=new Element("optgroup",{label:b});Object.forEach(a,function(a,b){(new Element("option",{text:a,value:b,selected:d==b?!0:
null,"data-option":1})).inject(e)});e.inject(c.dom.element)});else if("select"==c.dom.element.get("tag")){var b=c.dom.element.get("data-select-value")||"value",e=c.dom.element.get("data-select-text")||"text";c.dom.element.getElements("[data-option]").dispose();var d=c.dom.element.get("data-selected");a.info.list.each(function(a){(new Element("option",{text:a[e],value:a[b],selected:d==a[b]?!0:null,"data-option":1})).inject(c.dom.element)})}},count:function(a){if(a.success){var c=this.dom.container.getElement("[data-list-element]");
if(null!=c&&(c=c.getNext("tfoot,.list-tfoot"),null!=c)){var b=c.retrieve("html",c.get("html"));c.store("html",b);c.set("html",b.toHtml(a.info))}}},tab:function(a){var c={};this.dom.container.getElements("[data-tab-link],[data-tab-target]").each(function(a){var b=a.get("data-tab-link"),d=a.get("data-tab-target");b&&(c[b]||(c[b]={link:[],target:[]}),a.get("data-tab-current")&&(c[b].current=a.get("data-tab-current")),c[b].link.push(a));d&&(c[d]||(c[d]={link:[],target:[]}),c[d].target.push(a))});Object.forEach(c,
function(a,c){if(a.link.length==a.target.length){var b=a.current||"current";a.link.each(function(c,e){c.addEvent("click",function(){c.hasClass(b)||(a.link.removeClass(b),a.target.setStyle("display","none"),this.addClass(b),a.target[e].setStyle("display","block"))})});a.link[0].fireEvent("click")}})},"image-upload":function(a){this.dom.element.getElements("img[data-upload]").each(function(a){(new Element("input",{type:"file"})).inject(a)})}};d.load={tip:function(){this.dom.element.getElements("[placeholder]").addEvents({focus:function(){var a=
this.get("placeholder");if(null!=a&&""!=a){var c=this.getNext();if(null==c||!c.hasClass("input-tip")){var c=this.getParent(".diag"),b=this.getParent(".page-header"),c=null==c?this.getPosition(b):this.getPosition(c),c=new Element("span",{"class":"input-tip",styles:{left:c.x,top:c.y},text:a});c.inject(this,"after")}c.addClass.delay(100,c,["focus"])}},blur:function(){var a=this.getNext();null!=a&&a.hasClass("input-tip")&&a.removeClass("focus")}});this.dom.element.getElements("[data-type=datetime],[data-type=date]").each(function(a){var c=
a.get("id");null==c&&(c="datetime_"+Math.round(1E5*Math.random()),a.set("id",c));a.get("data-type")})},search:function(){var a=this,c=a.dom.container.getParent(".frame-item")||a.dom.container.getParent("[data-bind-search]")||a.dom.container.getParent();if(null==c)return null;var b=c.getElement("form");null!=b&&(c=b.get("id"),null==c&&(c="search-"+(new Date).getTime(),b.set("id",c)),a.dom.element.set("data-bind-search",c),b.set("onsubmit","return false;"),c=a.dom.element.get("id"),null==c&&(c="list-"+
(new Date).getTime(),a.dom.element.set("id",c)),c=b.getElement("[type=submit]"),null!=c&&c.addEvent("click",function(){a.fire()}),(c=b.getElement("[type=reset]"))&&c.addEvent("click",function(){b.removeClass("show")}))},pagesplit:function(){var a=this.dom.container.getNext(".pageSplit");null==a&&(a=new Element("div",{"class":"pageSplit",id:"pagesplit-"+(new Date).getTime()}),a.inject(this.dom.container,"after"));a=a.get("id");null==a&&(a="pagesplit-"+(new Date).getTime());this.dom.element.set("data-bind-pagesplit",
a)},"form-parent":function(){var a=this,c=a.dom.element.getParent("[data-bind-post]");null!=c&&(c=c.get("data-bind-post").parseQueryString(),Object.forEach(c,function(b,c){var e=a.dom.element.getElement("[name="+c+"]");null==e&&(e=new Element("input",{name:c,type:"hidden"}),e.inject(a.dom.element));e.set("value",b)}))}};d._post={status:!1,list:[],run:function(){this.status||(0==this.list.length?this.status=!1:this.list[0].post())}};d.POST=function(a,c,b){b||(b={});a=new Request.JSON({url:a,data:c,
onRequest:function(){d._post.status=!0},onComplete:function(){d._post.list.shift();d._post.status=!1;d._post.run.delay(100,d._post)},onSuccess:function(a){b.callback&&b.callback.apply(this,[a])}});d._post.list.push(a);d._post.run()}})(BW);
(function(d){d.Tip=new Class({Implements:[Events,Options],options:{callback:null,mask:!0,drag:!0,cssname:null,title:"\u7cfb\u7edf\u63d0\u793a",type:"alert",delay:0,width:null},dom:{alert:null,mask:null},message:null,initialize:function(a,c){var b=this;b.setOptions(c);c=[];b.options.title&&c.push('<div class="title">'+b.options.title+"</div>");c.push('<div class="content"><div class="content-msg">'+a+'</div><p class="button"></p></div>');b.dom.alert=new Element("div",{id:"bw-tip","class":"bw-tip bw-tip-hide bw-tip-"+
b.options.type,html:c.join("")});b.options.cssname&&b.dom.alert.addClass(b.options.cssname);b.options.width&&b.dom.alert.setStyle("width",b.options.width);a=b.dom.alert.getElement(".button");switch(b.options.type){case "alert":b.dispose();b.dom.alert.inject(document.body);(new Element("a",{href:"javascript:",text:"\u786e\u5b9a","class":"alert-btn-submit",events:{click:function(){b.options.callback&&b.options.callback.apply(b);b.close()}}})).inject(a);!function(){var a=b.dom.alert.getSize();b.dom.alert.setStyles({"margin-top":a.y/
-2})}();break;case "confirm":b.dispose();b.dom.alert.inject(document.body);(new Element("a",{href:"javascript:",text:"\u786e\u5b9a","class":"alert-btn-submit",events:{click:function(){b.options.callback&&b.options.callback.apply(b);b.close()}}})).inject(a);(new Element("a",{href:"javascript:",text:"\u53d6\u6d88","class":"alert-btn-submit alert-btn-cancel",events:{click:function(){b.close()}}})).inject(a);break;case "tip":0==b.options.delay&&(b.options.delay=2E3),b.dom.alert.inject(document.body)}b.dom.alert.removeClass.delay(100,
b.dom.alert,["bw-tip-hide"]);b.options.mask&&(b.dom.mask=new Element("div",{id:"bw-tip-mask","class":"tip-mask tip-mask-hide"}),b.dom.mask.inject(document.body),b.dom.mask.removeClass.delay(50,b.dom.mask,["tip-mask-hide"]));0<b.options.delay&&b.autoclose(b.options.delay)},autoclose:function(a){0>=a?(this.close(),"tip"==this.options.type&&this.options.callback&&this.options.callback.apply(this)):this.autoclose.delay(1E3,this,[a-1E3])},close:function(){console.log("\u6267\u884c\u5173\u95ed");null!=
this.dom.alert&&(this.dom.alert.addClass("bw-tip-hide"),this.dom.alert.dispose.delay(500,this.dom.alert));null!=this.dom.mask&&(this.dom.mask.addClass("tip-mask-hide"),this.dom.mask.dispose.delay(500,this.dom.mask))},dispose:function(){null!=$("bw-tip")&&$("bw-tip").dispose();null!=$("bw-tip-mask")&&$("bw-tip-mask").dispose()}})})(BW);Element.prototype.getBindEvent=function(){return this.retrieve("bind")};
var Frame={header:null,title:null,setting:null,footer:null,frames:null,size:{width:0,height:0},list:[],init:function(){if(this.header=$$("header").getLast())this.title=this.header.getElement("h1"),this.setting=this.header.getElement(".setting");this.footer=$$("footer").getLast();this.frames=$("frames");this.size.width=document.body.getStyle("width").toInt()||document.body.getWidth()},open:function(d,a,c,b){var e=Frame,f=e.list.indexOf(a);-1!=f?e.show.apply(e,[f,!0]):(c=new Element("div",{"class":"frame-item",
"data-bind-action":d,"data-bind-type":"control","data-bind-callback":(b?b+",":"")+"mobile-check,mobile-tab","data-bind-post":c,styles:{width:e.size.width}}),c.inject(e.frames),BW.Bind(c),e.list.push(a),e.show.apply(e),location.href="#"+d)},show:function(d,a){void 0==d&&(d=this.list.length-1);this.frames.getElements(".frame-item").each(function(a,b){b>d&&BW.callback["mobile-dispose"].apply(a.getBindEvent())});this.frames.setStyles({width:this.size.width*(d+1),"margin-left":this.size.width*d*-1});a&&
(this.list=this.list.filter(function(a,b){return b<=d}),BW.callback["mobile-check"].apply(this.frames.getElements(".frame-item").getLast().getBindEvent()))},back:function(){1>=this.list.length||this.show(this.list.length-2,!0)},newopen:function(d,a){if(Platform.APP)window.open(d,"_blank");else{a||(a="");var c=new Element("div",{"class":"newopen",html:'<div class="title">'+a+"</div>"});c.inject(document.body);a=c.getHeight();(new Element("iframe",{src:d,height:a-32,scrolling:"yes"})).inject(c);(new Element("a",
{href:"javascript:","class":"close",events:{touchend:function(){c.addClass("dispose");c.dispose.delay(500,c)}}})).inject(c)}}};
(function(d){d.callback["mobile-check"]=function(){var a=this,c=null;if(c=a.dom?a.dom.element.getElement("div"):a.getElement("div")){var b=c.get("data-hide");!function(){b&&(b=b.split(","));["header","footer"].each(function(a){Frame[a]&&(b&&b.contains(a)?Frame[a].addClass("hide"):Frame[a].removeClass("hide"))})}();!function(){if("footer"!=b&&Frame.footer){var a=c.get("data-home");Frame.footer.getElements("[data-home]").each(function(b){b.get("data-home")==a?b.addClass("current"):b.removeClass("current")})}}();
!function(){if(Frame.title){var a=c.get("data-title");a||(a=Frame.list.getLast());Frame.title.set("html",a)}}();!function(){if(Frame.setting){var a=c.get("data-setting-name");a?(Frame.setting.addClass("show"),Frame.setting.set({html:a,href:"javascript:"+c.get("data-setting-href")})):Frame.setting.removeClass("show")}}();!function(){var b=c.get("data-callback");b&&b.split(",").each(function(b){d.callback[b]&&d.callback[b].apply(a)})}();!function(){Platform.APP||c.getElements("[data-app=x5]").each(function(a){a.dispose()})}()}};
d.callback["mobile-tab"]=function(){var a=this.dom.element.getElements("[data-tab-index]");if(0!=a.length){var c={};this.dom.element.getElements("[data-tab-content]").each(function(a){c[a.get("data-tab-content")]=a});var b=a.filter(function(a){return a.hasClass("current")}).getLast(),d=null;b&&(d=c[b.get("data-tab-index")]);a.addEvent("touchend",function(a){b!=this&&(b&&b.removeClass("current"),a=this.get("data-tab-index"),this.addClass("current"),b=this,d&&d.removeClass("show"),c[a]&&(c[a].addClass("show"),
d=c[a]))})}};d.callback["mobile-back"]=function(){Frame.back()};d.callback["mobile-dispose"]=function(){var a=this,c=null,b=null;a.dom?(b=a.dom.element,c=a.dom.element.getElement("div")):(b=c,c=a.getElement("div"));c&&c.get("data-dispose")&&c.get("data-dispose").split(",").each(function(b){d.callback[b]&&d.callback[b].apply(a)});b.dispose()}})(BW);window.addEvents({domready:function(){$$("[data-bind-action]").each(function(d){BW.Bind(d)})}});