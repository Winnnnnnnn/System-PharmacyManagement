$(function () {
    //绑定登录按钮
    $('#login').click(function () {
        var name = $('#name').val();
        var pwd = $('#pwd').val();
        var type = $('#type').val();
        if ('' == name) {
            alert('请输入账号!');
            return;
        }
        if ('' == pwd) {
            alert('请输入密码!');
            return;
        }
        var param = null;
        if ('0' == type) {
            //销售人员登录
            param = {
                action:'ACTION_LOGIN',
                account:name,
                pwd:pwd,
                type:type
            };
        } else {
            //管理员登录
            param = {
                action:'ACTION_LOGIN',
                name:name,
                pwd:pwd,
                type:type
            };
        }
        $.ajax({
            type: 'post',
            url: '/login/action',
            dataType: "json",
            data: param,
            success: function (res) {
                //登录成功，跳转到首页
                window.location = '/home/view?id=' + res.id + '&name=' + res.name + "&type=" + type;
            },
            error: function () {
                alert('用户名/密码错误!');
            }
        });
    });
    //监听用户按键
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            //回车绑定登录按钮
            $('#login').click();
        }
        if (event.keyCode == 40) {
            //向下键绑定密码输入框
            $('#pwd').focus();
        }
        if (event.keyCode == 38) {
            //向上键绑定用户名输入框
            $('#name').focus();
        }
    });
});