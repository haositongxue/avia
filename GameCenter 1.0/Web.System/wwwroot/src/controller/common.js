layui.define(function (exports) {
    var $ = layui.$
        , layer = layui.layer
        , laytpl = layui.laytpl
        , setter = layui.setter
        , view = layui.view
        , admin = layui.admin
        , table = layui.table;

    //退出
    admin.events.logout = function () {
        //执行退出接口
        admin.req({
            url: 'System/Admin/Logout'
            , done: function (res) { //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行        
                //清空本地记录的 token，并跳转到登入页
                admin.exit();
            }
        });
    };

    table.set({
        "method": "post",
        "limits": [20, 50, 100, 250, 500, 1000],
        "headers": {
            "Authorization": layui.data(setter.tableName).Authorization
        }
    });

    //对外暴露的接口
    exports('common', {});
});