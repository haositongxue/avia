﻿window.MooTools&&(window.MooTools.mobile={version:"1.0.0",requires:"1.5.2"});window.Platform||(window.Platform={});
!function(a){var c=window.navigator.userAgent;a.ios="ios"==Browser.platform;a.android="android"==Browser.platform;a.mobile=a.ios||a.android;a.app=/x5app|betwinapp/i.test(c);a.callback={};a.touch="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch;a.app&&(document.writeln('<script type="text/javascript" src="/cordova.js">\x3c/script>'),document.addEventListener("deviceready",function(){a.callback.appVersion=function(a,b){b||(b=function(){alert("\u7248\u672c\u53f7\u83b7\u53d6\u5931\u8d25")});
cordova.getAppVersion.getVersionNumber(a,b)};a.callback.cacheClear=function(a,b){a||(a=function(a){alert("\u7f13\u5b58\u6e05\u9664\u6210\u529f");location.reload()});b||(b=function(a){alert("\u7f13\u5b58\u6e05\u7406\u5931\u8d25\uff0c"+a)});window.cache.clear(a,b)};a.callback.touchCheck=function(a,b){b||(b=function(){});navigator.touchid.checkSupport(a,b)};a.callback.touchidAuthenticate=function(a,b,e){b||(b=function(){});e||(e="\u8bf7\u5f00\u59cb\u6307\u7eb9\u8bc6\u522b\uff1a\u5c06\u624b\u6307\u653e\u4e8ehome\u952e\uff0c\u6838\u5bf9\u6307\u7eb9\u3002");
navigator.touchid.authenticate(a,b,e)};a.callback.share=function(a,b){a||(a="");b||(b=window.location.href);plugins.socialsharing.share(a,null,null,b)}}))}(Platform);
!function(){Platform.mobile&&Platform.touch&&(!function(){delete Element.Events.click;Element.Events.touch=Element.Events.click={base:"touchend",condition:function(a){if(0!==a.targetTouches.length)return!1;a=a.changedTouches[0];a=document.elementFromPoint(a.clientX,a.clientY);do if(a==this)return!0;while(a&&(a=a.parentNode));return!1}}}(),!function(){var a={},c,d=function(){c=!1},b={touchstart:function(b){1<b.touches.length||(b=b.touches[0],c=!0,a={x:b.pageX,y:b.pageY})},touchmove:function(b){if(c){var f=
b.changedTouches[0],f={x:f.pageX,y:f.pageY};if(this.retrieve("swipe:cancelVertical")&&10<Math.abs(a.y-f.y))c=!1;else{var d=this.retrieve("swipe:distance",50),e=f.x-a.x,h=e<-d;if(e>d||h)b.preventDefault(),c=!1,b.direction=h?"left":"right",b.start=a,b.end=f,this.fireEvent("swipe",b)}}},touchend:d,touchcancel:d};Element.Events.swipe={onAdd:function(){this.addEvents(b)},onRemove:function(){this.removeEvents(b)}}}())}();window.Frame||(window.Frame={});
!function(a){a.header=null;a.title=null;a.setting=null;a.footer=null;a.frames=null;a.size={width:0,height:0};a.list=[];a.init=function(){if(this.header=$$("header").getLast())this.title=this.header.getElement("h1"),this.setting=this.header.getElement(".setting");this.footer=$$("footer").getLast();this.frames=$("frames");this.size.width=document.body.getStyle("width").toInt()||document.body.getWidth()};a.open=function(a,d,b,e){var c=Frame,g=c.list.indexOf(d);-1!=g?c.show.apply(c,[g,!0]):(b=new Element("div",
{"class":"frame-item","data-bind-action":a,"data-bind-type":"control","data-bind-callback":(e?e+",":"")+"mobile-check,mobile-tab","data-bind-post":b,styles:{width:c.size.width}}),b.inject(c.frames),BW.Bind(b),c.list.push(d),c.show.apply(c),location.href="#"+a)};a.show=function(a,d){void 0==a&&(a=this.list.length-1);this.frames.getElements(".frame-item").each(function(b,c){c>a&&BW.callback["mobile-dispose"].apply(b.getBindEvent())});this.frames.setStyles({width:this.size.width*(a+1),"margin-left":this.size.width*
a*-1});d&&(this.list=this.list.filter(function(b,c){return c<=a}),BW.callback["mobile-check"].apply(this.frames.getElements(".frame-item").getLast().getBindEvent()))};a.back=function(){1>=this.list.length||this.show(this.list.length-2,!0)};a.newopen=function(a,d){if(Platform.app&!d)window.open(a,"_blank");else{d||(d="");var b=new Element("div",{"class":"newopen",html:'<div class="title">'+d+"</div>"});b.inject(document.body);d=b.getHeight();(new Element("iframe",{src:a,height:d-32,scrolling:"yes"})).inject(b);
(new Element("a",{href:"javascript:","class":"close",events:{touchend:function(){b.addClass("dispose");b.dispose.delay(500,b)}}})).inject(b)}}}(Frame);