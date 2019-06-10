<%--
  Created by IntelliJ IDEA.
  User: 丁凡
  Date: 2019/4/21
  Time: 0:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>药店管理系统</title>
    <link rel="stylesheet" href="../css/base.css">
</head>
<body class="LoginBody">
<%--顶部--%>
<div class="LoginTop">
    <%--logo--%>
    <img src="../image/logo.png">
    <%--分割线--%>
    <div class="LoginTopLine"></div>
    <h3 class="LoginTopTitle">药店管理系统登录</h3>
</div>
<%--消除布局--%>
<div class="cf"></div>
<%--底部--%>
<div class="LoginBottom">
    <%--登录框--%>
    <div class="LoginBg">
        <h3 class="LoginBgTopTitle">登录</h3>
        <div class="LoginBgTopLine"></div>
        <%--用户名--%>
        <div class="LoginBgInputBg">
            <img src="../image/用户.png">
            <input id="name" type="text" placeholder="请输入账号">
        </div>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <%--密码--%>
        <div class="LoginBgInputBg">
            <img src="../image/密码.png">
            <input id="pwd" type="password" placeholder="请输入密码">
        </div>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <%--类型选择--%>
        <div class="LoginBgInputBg">
            <img src="../image/类别.png">
            <select id="type">
                <option value="0">销售人员</option>
                <option value="1">管理员</option>
            </select>
        </div>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <%--登录按钮--%>
        <button id="login">立即登录</button>
        <div class="cf" style="margin-bottom: 20px;"></div>
        <div class="sigma-content">
            <div class="sigma-middle-line">
                <span class="sigma-line-text">温馨提示：忘记密码可联系管理员重置</span>
            </div>
        </div>
    </div>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/login.js"></script>
</body>
</html>
