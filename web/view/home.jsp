<%--
  Created by IntelliJ IDEA.
  User: 丁凡
  Date: 2019/4/21
  Time: 11:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>药店管理系统</title>
    <link rel="stylesheet" href="../css/libs/bootstrap.css">
    <link rel="stylesheet" href="../css/libs/bootstrap-table.css">
    <link rel="stylesheet" href="../css/base.css">
</head>
<body class="HomeBody">
<%--导航栏--%>
<div class="BaseNav">
    <ul>
        <li>
            <img class="BaseNavLogo" src="../image/logo.png">
        </li>
        <li id="home_nav_drug">
            <a href="#">
                <span class="glyphicon glyphicon-home"></span>
                药品管理
            </a>
        </li>
        <li id="home_nav_sort">
            <a href="#">
                <span class="glyphicon glyphicon-th-list"></span>
                分类管理
            </a>
        </li>
        <li id="home_nav_order">
            <a href="#">
                <span class="glyphicon glyphicon-list-alt"></span>
                订单详情
            </a>
        </li>
        <li id="home_nav_log">
            <a href="#">
                <span class="glyphicon glyphicon-bookmark"></span>
                操作日志
            </a>
        </li>
        <li id="home_nav_staff">
            <a href="#">
                <span class="glyphicon glyphicon-user"></span>
                销售人员管理
            </a>
        </li>
        <li class="fr">
            <a href="/login/view"><span class="glyphicon glyphicon-log-out"></span> &nbsp;<span id="home_nav_name"></span>&nbsp;退出登录</a>
        </li>
    </ul>
</div>
<%--分类栏--%>
<div id="home_nav_left_sort" class="BaseHomeLeftNav">
    <%--分类列表--%>
    <div id="home_nav_sort_list" class="BaseHomeLeftNavList">
        <ul id="home_nav_sort_list_main">
            <li><a id="home_nav_sort_list_main_all">全部分类</a></li>
        </ul>
    </div>
    <%--分类栏展开按钮--%>
    <div id="home_nav_open_sort" class="BaseHomeLeftNavBtn">
        <div>分类&nbsp;<span class="glyphicon glyphicon-chevron-right"></span></div>
    </div>
    <div class="cf"></div>
</div>
<%--主操作区域--%>
<div class="BaseMain">
    <%--分类管理--%>
    <div id="home_main_sort" class="BaseMainBody">
        <%--药品分类工具栏--%>
        <div id='home_main_sort_toolbar' class='btn-group'>
            <button class="btn btn-info" onclick='addSort()' data-toggle="modal" data-target="#home_main_sort_dialog">
                <span class='glyphicon glyphicon-plus'></span>&nbsp;添加新分类
            </button>
        </div>
        <%--药品分类信息表--%>
        <table id="home_main_sort_table" class="table"></table>
    </div>
    <%--药品管理--%>
    <div id="home_main_drug" class="BaseMainBody">
        <h3 style="margin-top: 10px;margin-bottom: 10px;">当前类目：<span id="home_main_drug_sort"></span></h3>
        <%--药品管理工具栏--%>
        <div id='home_main_drug_toolbar' class='btn-group'>
            <button class="btn btn-info" onclick='addDrug()' data-toggle="modal" data-target="#home_main_drug_dialog">
                <span class='glyphicon glyphicon-plus'></span>&nbsp;添加新药品
            </button>
        </div>
        <%--药品管理信息表--%>
        <table id="home_main_drug_table" class="table"></table>
    </div>
    <%--订单详情--%>
    <div id="home_main_order" class="BaseMainBody">
        <table id="home_main_order_table" class="table"></table>
    </div>
    <%--操作日志--%>
    <div id="home_main_log" class="BaseMainBody">
        <table id="home_main_log_table" class="table"></table>
    </div>
    <%--员工管理--%>
    <div id="home_admin_main_user" class="BaseMainBody">
        <%--员工管理工具栏--%>
        <div id='home_admin_main_user_toolbar' class='btn-group'>
            <button class="btn btn-info" data-toggle="modal" data-target="#home_admin_main_user_dialog" onclick='addUser()'>
                <span class='glyphicon glyphicon-plus'></span>&nbsp;添加新销售人员
            </button>
        </div>
        <%--员工管理信息表--%>
        <table id="home_admin_main_user_table" class="table"></table>
    </div>
</div>
<%--分类管理对话框--%>
<div id='home_main_sort_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_main_sort_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_main_sort_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='home_main_sort_dialog_id'/>
                <div class='form-horizontal' id='home_main_sort_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">分类名称</label>
                        <div class="col-sm-10">
                            <input id="home_main_sort_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div id='home_main_sort_dialog_warn'>
                    <h4>请谨慎删除！</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_main_sort_dialog_btn_add" type="button" class="btn btn-info">创建</button>
                <button id="home_main_sort_dialog_btn_edit" type="button" class="btn btn-info">编辑</button>
                <button id="home_main_sort_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--药品管理对话框--%>
<div id='home_main_drug_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_main_drug_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_main_drug_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='home_main_drug_dialog_id'/>
                <input type='hidden' id='home_main_drug_dialog_img_edit'/>
                <input type='hidden' id='home_main_drug_dialog_count_edit'/>
                <div class='form-horizontal' id='home_main_drug_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">药品名称</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">通用名</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_normal" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">品牌名</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_brand" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">包装规格</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_specification" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">剂型/型号</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_type" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">生产企业</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_publish" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">有效期</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_validity" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">批准文号</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_number" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">适应症</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_suit" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">售价</label>
                        <div class="col-sm-10">
                            <input id="home_main_drug_dialog_price" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">图片</label>
                        <div class="col-sm-10">
                            <img id="home_main_drug_dialog_img" src="../image/图片.png" style="max-width:100%;max-height:80px;border-radius: 6px;">
                            <form id="home_main_drug_dialog_img_form" enctype="multipart/form-data" style="display: none;">
                                <input id="home_main_drug_dialog_img_file" name="file" type="file" accept="image/gif, image/png, image/jpg, image/jpeg">
                            </form>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">分类</label>
                        <div class="col-sm-10">
                            <select id="home_main_drug_dialog_sort" class="form-control"></select>
                        </div>
                    </div>
                </div>
                <div id='home_main_drug_dialog_warn'>
                    <h4>请谨慎删除！</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_main_drug_dialog_btn_add" type="button" class="btn btn-info">创建</button>
                <button id="home_main_drug_dialog_btn_edit" type="button" class="btn btn-info">编辑</button>
                <button id="home_main_drug_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--查看图片对话框--%>
<div id='home_main_img_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_main_img_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_main_img_dialog_label' class='modal-title'>药品图片</h4>
            </div>
            <div class='modal-body'>
                <img id="home_main_img_dialog_img" style="width: 100%;">
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<%--进货对话框--%>
<div id='home_main_count_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_main_count_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_main_count_dialog_label' class='modal-title'>药品进货</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <input type="hidden" id="home_main_count_dialog_id">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">当前药品</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_count_dialog_name"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">图片</label>
                        <div class="col-sm-10">
                            <img id="home_main_count_dialog_img" src="../image/图片.png" style="max-width:100%;max-height:80px;border-radius: 6px;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">库存数量</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_count_dialog_old"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">进货数量</label>
                        <div class="col-sm-10">
                            <input id="home_main_count_dialog_count" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_main_count_dialog_btn_add" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<%--出货对话框--%>
<div id='home_main_out_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_main_out_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_main_out_dialog_label' class='modal-title'>药品出货</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <input type="hidden" id="home_main_out_dialog_id">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">当前药品</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_out_dialog_now"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">图片</label>
                        <div class="col-sm-10">
                            <img id="home_main_out_dialog_img" src="../image/图片.png" style="max-width:100%;max-height:80px;border-radius: 6px;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">库存数量</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_out_dialog_old"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">收货人</label>
                        <div class="col-sm-10">
                            <input id="home_main_out_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">电话</label>
                        <div class="col-sm-10">
                            <input id="home_main_out_dialog_phone" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">地址</label>
                        <div class="col-sm-10">
                            <textarea id="home_main_out_dialog_addr" class="form-control" rows="5"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">物流公司</label>
                        <div class="col-sm-10">
                            <input id="home_main_out_dialog_liu" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">物流单号</label>
                        <div class="col-sm-10">
                            <input id="home_main_out_dialog_number" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">出货数量</label>
                        <div class="col-sm-10">
                            <input id="home_main_out_dialog_count" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_main_out_dialog_btn_add" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<%--查看药品详情--%>
<div id='home_main_order_drug_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_main_order_drug_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_main_order_drug_dialog_label' class='modal-title'>药品详情</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">药品名称</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_name"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">通用名</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_normal"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">品牌名</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_brand"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">包装规格</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_specification"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">剂型/型号</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_type"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">生产企业</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_publish"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">有效期</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_validity"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">批准文号</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_number"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">适应症</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_suit"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">售价</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_drug_dialog_price"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">图片</label>
                        <div class="col-sm-10">
                            <img id="home_main_order_drug_dialog_img" src="../image/图片.png" style="max-width:100%;max-height:80px;border-radius: 6px;">
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<%--客户信息--%>
<div id='home_main_order_user_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_main_order_user_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_main_order_user_dialog_label' class='modal-title'>客户信息&物流信息</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">收货人</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_user_dialog_name"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">电话</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_user_dialog_phone"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">地址</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_user_dialog_addr"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">物流公司</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_user_dialog_liu"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">物流单号</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_user_dialog_number"></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<%--修改客户信息--%>
<div id='home_main_order_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_main_order_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_main_order_dialog_label' class='modal-title'>订单修改</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <input type="hidden" id="home_main_order_dialog_id">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">当前药品</label>
                        <div class="col-sm-10">
                            <h4 id="home_main_order_dialog_now"></h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">图片</label>
                        <div class="col-sm-10">
                            <img id="home_main_order_dialog_img" src="../image/图片.png" style="max-width:100%;max-height:80px;border-radius: 6px;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">收货人</label>
                        <div class="col-sm-10">
                            <input id="home_main_order_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">电话</label>
                        <div class="col-sm-10">
                            <input id="home_main_order_dialog_phone" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">地址</label>
                        <div class="col-sm-10">
                            <textarea id="home_main_order_dialog_addr" class="form-control" rows="5"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">物流公司</label>
                        <div class="col-sm-10">
                            <input id="home_main_order_dialog_liu" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">物流单号</label>
                        <div class="col-sm-10">
                            <input id="home_main_order_dialog_number" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_main_order_dialog_btn_edit" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<%--员工管理对话框--%>
<div id='home_admin_main_user_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_admin_main_user_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_admin_main_user_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='home_admin_main_user_dialog_id'/>
                <div class='form-horizontal' id='home_admin_main_user_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机</label>
                        <div class="col-sm-10">
                            <input id="home_admin_main_user_dialog_account" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="home_admin_main_user_dialog_pwd" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="home_admin_main_user_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div id='home_admin_main_user_dialog_warn'>
                    <h4>确认要删除吗？不可恢复哦？</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_admin_main_user_dialog_btn_add" type="button" class="btn btn-info">创建</button>
                <button id="home_admin_main_user_dialog_btn_edit" type="button" class="btn btn-info">编辑</button>
                <button id="home_admin_main_user_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--底部--%>
<div class="BaseBottom">Copyright 2019 药店管理系统 All Rights Reserved</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/libs/bootstrap-datetimepicker.js"></script>
<script src="../js/libs/locale/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="../js/utils/base64.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/home.js"></script>
</body>
</html>
