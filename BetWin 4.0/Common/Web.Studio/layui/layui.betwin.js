﻿document.writeln('<script src="/studio/layui/layui.betwin.config.js">\x3c/script>');
var IM_REPLY_INDEX=0,IM_REPLY_INSERT=null,IM_REPLY_SEND=null,IM_ONLINE=0,IM_REPLY=function(a){IM_REPLY_INSERT(a.innerText);layer.close(IM_REPLY_INDEX)},IM_BLOCK=function(a){a=$(a);IM_REPLY_INSERT("@BLOCK:"+(a.get("data-time")||0));IM_REPLY_SEND();layer.close(IM_REPLY_INDEX)},LAYIM=null,IM=function(a){if(a.server)(new Element("a",{href:a.server,target:"_blank","class":"layim-customerserver"})).inject(document.body);else{var w=a.siteid,l=a.mobile,x=location.protocol,q=a.callback||{},r=a.onmessage;window.GET_LAYIM_HOST&&
window.GET_LAYIM_HOST(a.host);var y={"http:":"ws","https:":"wss"}[x]+"://"+LAYIM_HOST+"/service/"+w,h=function(){for(var a=[/(ADMIN)=(\w{32})/,/(USER)=(\w{32})/,/(GHOST)=(\w{32})/],d=0;d<a.length;d++)if(a[d].test(document.cookie))return a=a[d].exec(document.cookie),d={},d[a[1]]=a[2],d;return null},m={},n;for(n in h())m["_auth_"+n.toLowerCase()]=h()[n];var z="//"+LAYIM_HOST+"/service/layim/init",p=a.uploadimage||"/handler/user/im/uploadimage",v=function(e){var d,g;!function(){d={online:function(b){var a=
{Action:"Online"};b&&(a.Group=b);c.send(JSON.stringify(a))},offline:function(){},message:function(b){var a="Message";switch(b.to.type){case "group":a="Group"}c.send(JSON.stringify({Action:a,Content:b.mine.content,TalkKey:b.to.id,Time:b.mine.timestamp}))},read:function(b,a){c.send(JSON.stringify({Action:"Read",MsgID:b||0,NotifyID:a||0}))},sign:function(b){c.send(JSON.stringify({Action:"Sign",Content:b}))},pong:function(){c.send(JSON.stringify({Action:"Pong"}))},ping:function(){c.send(JSON.stringify({Action:"Ping"}))},
test:function(){}};g={Online:function(b){e.setFriendStatus(b.Key,"online")},Offline:function(b){e.setFriendStatus(b.Key,"offline")},Message:function(b){e.getMessage({username:b.Name,avatar:b.Avatar,id:b.Key,type:b.Type||"friend",content:b.Content,cid:0,mine:!1,fromid:"100000",timestamp:Number(b.Time)});d.read(b.ID,b.NotifyID);r&&r.apply(this,[b])},Tip:function(b){if(q[b.Type])q[b.Type](b);else e.getMessage({system:!0,id:b.Key,type:b.ChatType||"friend",content:b.Content})},Ping:function(b){k=new Date;
d.pong()},Pong:function(b){k=new Date;b.Online&&(IM_ONLINE=b.Online)}}}();var c,k=null,f=[],t=function(){c&&c.close();c=window.ReconnectingWebSocket?new ReconnectingWebSocket(f.join("/")):new WebSocket(f.join("/"));c.onopen=function(){k=new Date;d.online(a.group)};c.onmessage=function(b){var a=JSON.parse(b.data);if(a&&a.Action){var c=a.Action;if(g[c])g[c](a);else console.log("\u672a\u6307\u5b9a\u7684\u52a8\u4f5c\uff1a"+b.data)}else console.log("\u6536\u5230\u975ejson\u7684\u5185\u5bb9:"+b.data)};
c.onclose=function(a){console.log("websocket\u88ab\u4e3b\u52a8\u5173\u95ed");console.log(a)};c.onerror=function(a){console.log(a)}},u=function(){f.push(y);for(var a in h())f.push(a),f.push(h()[a]);!function(){t();LAYIM=e;var a=0;setInterval(function(){if(c&&1==c.readyState){0==a%10&&(d.ping(),d.test());a++;document.body.removeAttribute("data-layim-loading");var b=new Date-k;6E4<b&&(b=new Date,c.close(),function(){t()}.delay(1500))}else document.body.setAttribute("data-layim-loading",1)},1E3)}()};
if(l)u();else e.on("ready",u);e.on("sendMessage",function(a){d.message(a)});e.on("sign",function(a){d.sign(a)});e.on("chatChange",function(a){var b=a.elem.find("textarea");b.on("paste",function(a){if(a=a.originalEvent.clipboardData.items)for(var c=0;c<a.length;++c){var d=a[c];if("file"==d.kind&&/image\/.*/.test(d.type)){var f=d.getAsFile();window.URL=window.URL||window.webkitURL;d='<div class="layim-chat-paste-image" style="width:300px; height:300px; background:url(\''+window.URL.createObjectURL(f)+
"') no-repeat center center; background-size:cover;\"></div>";layer.confirm(d,{btn:["\u786e\u8ba4","\u53d6\u6d88"],scrollbar:!1,closeBtn:0,title:"\u4e0a\u4f20\u56fe\u7247"},function(a,c){c=new FormData;c.append("file",f,"image.png");c.append("id",Math.floor(1E6*Math.random()));var d=new XMLHttpRequest;d.onload=function(a){b.attr({value:"",disabled:!1});200==d.status?(a=JSON.parse(a.target.response),0==a.code?b.val("img["+a.data.src+"]"):layer.msg(a.msg||"\u4e0a\u4f20\u5931\u8d25")):layer.msg("\u56fe\u7247\u4e0a\u4f20\u9519\u8bef")};
d.open("POST",p,!0);b.attr({value:"\u6b63\u5728\u4e0a\u4f20...",disabled:!0});d.send(c);layer.close(a)},function(a){})}}})})};!function(){l||layui.use("layim",function(e){var d={min:!0,title:"\u5728\u7ebf\u5ba2\u670d",init:{url:z,type:"post",data:m},members:{url:"//"+LAYIM_HOST+"/service/layim/member",type:"post",data:m},uploadImage:{url:p,type:"post"},isgroup:a.isgroup,tool:[],copyright:!0};a.reply&&d.tool.push({alias:"reply",title:"\u5feb\u6377\u56de\u590d",icon:"&#xe60a;"});a.block&&d.tool.push({alias:"block",
title:"\u8bbe\u7f6e\u7981\u8a00",icon:"&#xe651;"});!function(){if(a.tool)for(var e in a.tool){var c=a.tool[e];d.tool.push({alias:e,title:c.title,icon:c.icon})}}();a.chatLog&&(d.chatLog=a.chatLog);e.config(d);!function(){if(a.reply)e.on("tool(reply)",function(a,c,d){var f=[];IM_REPLY_INSERT=a;IM_REPLY_SEND=c;(new Request.JSON({url:"admin/im/getreplylist",onSuccess:function(a){f.push('<div class="layui-collapse">');Object.forEach(a.info,function(a,b){f.push('<div "class"="layui-colla-item">');f.push('<h2 class="layui-colla-title">${Category}</h2> <div class="layui-colla-content layui-show">${List}</div>'.toHtml({Category:b,
List:a.map(function(a){return'<a href="javascript:" onclick="IM_REPLY(this);" class="layui-reply-item">'+a+"</a>"}).join("")}));f.push("</div>")});f.push("</div>");IM_REPLY_INDEX=layer.open({type:1,content:f.join(""),maxWidth:640})}})).post()})}();!function(){if(a.block)e.on("tool(block)",function(a,c,d){var f=[];IM_REPLY_INSERT=a;IM_REPLY_SEND=c;(new Request.JSON({url:"admin/im/getreplylist",onSuccess:function(a){f.push('<div class="layui-collapse layim-tool-block">');f.push('<a href="javascript:" onclick="IM_BLOCK(this);">\u53d6\u6d88\u7981\u8a00</a>');
f.push('<a href="javascript:" onclick="IM_BLOCK(this);" data-time="60">\u7981\u8a001\u5206\u949f</a>');f.push('<a href="javascript:" onclick="IM_BLOCK(this);" data-time="300">\u7981\u8a005\u5206\u949f</a>');f.push('<a href="javascript:" onclick="IM_BLOCK(this);" data-time="600">\u7981\u8a0010\u5206\u949f</a>');f.push('<a href="javascript:" onclick="IM_BLOCK(this);" data-time="1800">\u7981\u8a0030\u5206\u949f</a>');f.push('<a href="javascript:" onclick="IM_BLOCK(this);" data-time="3600">\u7981\u8a001\u5c0f\u65f6</a>');
f.push('<a href="javascript:" onclick="IM_BLOCK(this);" data-time="86400">\u7981\u8a0024\u5c0f\u65f6</a>');f.push("</div>");IM_REPLY_INDEX=layer.open({type:1,content:f.join(""),maxWidth:320})}})).post()})}();v(e)})}();!function(){l&&layui.use("mobile",function(){var e=layui.mobile.layim,d={init:a.init,brief:a.brief,uploadImage:{url:p},copyright:!0,title:"\u5728\u7ebf\u5ba2\u670d",isNewFriend:!1,chatTitleColor:"#3e80cc",tool:[]};!function(){if(a.tool)for(var c in a.tool){var e=a.tool[c];d.tool.push({alias:c,
title:e.title,iconUnicode:e.icon})}}();e.config(d);!function(){if(a.tool)for(var c in a.tool)console.log(c),e.on("tool("+c+")",a.tool[c].event)}();if(a.brief){var g=null,g=a.isgroup?a.init.group[0]:a.init.friend[0].list[0];e.chat({id:g.id,name:a.isgroup?g.groupname:g.username,type:a.isgroup?"group":"friend",avatar:g.avatar})}e.on("back",function(){});v(e)})}()}};