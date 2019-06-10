//订单数据
var drug_data = null;
var order_data = null;
//全部销售人员数据
var admin_data_user = null;

$(function () {
   initNav();
});

/**
 * 初始化导航栏
 */
function initNav() {
    //填充用户名
    $('#home_nav_name').html(getUrlParam("name"));
    //权限判断
    var type = getUrlParam("type");
    if (type != '1') {
        //隐藏指定标签
        $('#home_nav_staff').hide();
    }
    //菜单判断
    var menu = getUrlParam("menu");
    if (menu == null) {
        //药品管理
        initDrug();
    } else {
        switch (menu) {
            case '0':
                //药品管理
                initDrug();
                break;
            case '1':
                //分类管理
                initSort();
                break;
            case '2':
                //订单详情
                initOrder();
                break;
            case '3':
                //操作日志
                initLog();
                break;
            case '4':
                //销售人员管理
                initStaff();
                break;
        }
    }
    //绑定导航键按钮
    $('#home_nav_drug').click(function () {
        window.location = "/home/view?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&type=" + getUrlParam("type") + "&menu=0";
    });
    $('#home_nav_sort').click(function () {
        window.location = "/home/view?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&type=" + getUrlParam("type") + "&menu=1";
    });
    $('#home_nav_order').click(function () {
        window.location = "/home/view?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&type=" + getUrlParam("type") + "&menu=2";
    });
    $('#home_nav_log').click(function () {
        window.location = "/home/view?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&type=" + getUrlParam("type") + "&menu=3";
    });
    $('#home_nav_staff').click(function () {
        window.location = "/home/view?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&type=" + getUrlParam("type") + "&menu=4";
    });
}

/**
 * 初始化分类管理
 */
function initSort() {
    $('#home_main_sort').fadeIn(500);
    initSortTable(1);
}

/**
 * 初始化分类信息表
 * @param pageNumber
 */
function initSortTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home/action',
        data:{action:'ACTION_GET_SORT'},
        id:'#home_main_sort_table',
        toolbar:'#home_main_sort_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'name',
            title: '分类',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            width:'200px',
            formatter: function (value, row, index) {
                var sort = escape(JSON.stringify(row));
                return "<div class='btn-group'><button data-toggle=\"modal\" data-target=\"#home_main_sort_dialog\" class='btn btn-info' onclick='editSort(\"" + sort + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;修改</button><button data-toggle=\"modal\" data-target=\"#home_main_sort_dialog\" class='btn btn-danger' onclick='delSort(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化分类管理对话框
 */
function initSortDialog() {
    $('#home_main_sort_dialog_body').hide();
    $('#home_main_sort_dialog_warn').hide();
    $('#home_main_sort_dialog_btn_add').hide();
    $('#home_main_sort_dialog_btn_edit').hide();
    $('#home_main_sort_dialog_btn_del').hide();
}

/**
 * 添加分类
 */
function addSort() {
    initSortDialog();
    $('#home_main_sort_dialog_body').show();
    $('#home_main_sort_dialog_btn_add').show();
    $('#home_main_sort_dialog_label').html('添加药品分类');
    $('#home_main_sort_dialog_name').val('');
}

/**
 * 绑定添加药品分类
 */
$('#home_main_sort_dialog_btn_add').click(function () {
    //获取数据
    var name = $('#home_main_sort_dialog_name').val();
    if ('' == name) {
        alert('请输入药品分类');
    } else {
        var param = {
            action:'ACTION_ADD_SORT',
            name:name
        };
        $.ajax({
            type: 'post',
            url: '/home/action',
            dataType: "json",
            data: param,
            success: function (res) {
                if (res) {
                    alert('添加成功!');
                    $('#home_main_sort_dialog').modal('hide');
                    initSortTable(1);
                } else {
                    alert('添加失败!');
                }
            },
            error: function() {
                alert('服务器异常，添加失败!');
            }
        });
    }
});

/**
 * 修改分类
 * @param data
 */
function editSort(data) {
    var sort = JSON.parse(unescape(data));
    initSortDialog();
    $('#home_main_sort_dialog_body').show();
    $('#home_main_sort_dialog_btn_edit').show();
    $('#home_main_sort_dialog_label').html('修改药品分类');
    $('#home_main_sort_dialog_name').val(sort.name);
    $('#home_main_sort_dialog_id').val(sort.id);
}

/**
 * 绑定药品分类按钮
 */
$('#home_main_sort_dialog_btn_edit').click(function () {
    //获取数据
    var name = $('#home_main_sort_dialog_name').val();
    var id = $('#home_main_sort_dialog_id').val();
    if ('' == name) {
        alert('请输入药品分类');
    } else {
        var param = {
            action:'ACTION_EDIT_SORT',
            name:name,
            id:id
        };
        $.ajax({
            type: 'post',
            url: '/home/action',
            dataType: "json",
            data: param,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#home_main_sort_dialog').modal('hide');
                    initSortTable($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error: function() {
                alert('服务器异常，修改失败!');
            }
        });
    }
});

/**
 * 删除药品分类
 * @param id
 */
function delSort(id) {
    initSortDialog();
    $('#home_main_sort_dialog_warn').show();
    $('#home_main_sort_dialog_btn_del').show();
    $('#home_main_sort_dialog_label').html('删除药品分类');
    $('#home_main_sort_dialog_id').val(id);
}

/**
 * 绑定删除药品分类按钮
 */
$('#home_main_sort_dialog_btn_del').click(function () {
    //获取数据
    var id = $('#home_main_sort_dialog_id').val();
    var param = {
        action:'ACTION_DEL_SORT',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: param,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                $('#home_main_sort_dialog').modal('hide');
                initSortTable($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error: function() {
            alert('服务器异常，删除失败!');
        }
    });
});

/**
 * 初始化药品管理
 */
function initDrug() {
    $('#home_main_drug').fadeIn(500);
    //判断是否带有分类
    var sort = getUrlParam("sort");
    if (sort == null || sort == '') {
        $('#home_main_drug_sort').html('全部分类');
        initDrugTable(1);
    } else {
        initDrugTableBySort(1,sort);
        $('#home_main_drug_sort').html(getUrlParam("sortname"));
    }
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: {action:'ACTION_GET_SORT'},
        success: function (res) {
            if (res!=null && res.length>0) {
                $.each(res,function (i,obj) {
                    var sort = "<li><a href='/home/view?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&type=" + getUrlParam("type") + "&menu=0&sort=" + obj.id + "&sortname=" + obj.name + "'>"+ obj.name +"</a></li>";
                    $('#home_nav_sort_list_main').append(sort);
                });
            } else {
                console.log('获取商品分类失败');
            }
        },
        error: function() {
            console.log('获取商品分类失败');
        }
    });
    $('#home_nav_left_sort').show();
}

/**
 * 初始化药品信息表
 * @param pageNumber
 */
function initDrugTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home/action',
        data:{action:'ACTION_GET_DRUG'},
        id:'#home_main_drug_table',
        toolbar:'#home_main_drug_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'name',
            title: '名称',
            align: 'center'
        },{
            field: 'normal',
            title: '通用名',
            align: 'center'
        },{
            field: 'brand',
            title: '品牌',
            align: 'center'
        },{
            field: 'specification',
            title: '包装规格',
            align: 'center'
        },{
            field: 'type',
            title: '剂型/型号',
            align: 'center'
        },{
            field: 'publish',
            title: '生产企业',
            align: 'center'
        },{
            field: 'validity',
            title: '有效期',
            align: 'center'
        },{
            field: 'number',
            title: '批准文号',
            align: 'center'
        },{
            field: 'suit',
            title: '适应症',
            align: 'center'
        },{
            field: 'price',
            title: '售价',
            align: 'center'
        },{
            field: 'img',
            title: '图片',
            align: 'center',
            width:'50px',
            formatter: function (value, row, index) {
                return "<a href='#' onclick='openImg(\"" + value + "\")' data-toggle=\"modal\" data-target=\"#home_main_img_dialog\">查看</a>"
            }
        },{
            field: 'count',
            title: '库存',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            width:'100px',
            formatter: function (value, row, index) {
                var drug = escape(JSON.stringify(row));
                return "<div class='btn-group-vertical'><button data-toggle=\"modal\" data-target=\"#home_main_drug_dialog\" class='btn btn-info' onclick='editDrug(\"" + drug + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;修改</button><button onclick='addCount(\"" + drug + "\")' class='btn btn-default' data-toggle=\"modal\" data-target=\"#home_main_count_dialog\"><span class='glyphicon glyphicon-log-in'></span>&nbsp;进货</button><button class='btn btn-primary' data-toggle=\"modal\" data-target=\"#home_main_out_dialog\" onclick='addOrder(\"" + drug + "\")'><span class='glyphicon glyphicon-log-out'></span>&nbsp;出货</button><button data-toggle=\"modal\" data-target=\"#home_main_drug_dialog\" class='btn btn-danger' onclick='delDrug(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 根据分类初始化药品信息表
 * @param pageNumber
 * @param sort
 */
function initDrugTableBySort(pageNumber,sort) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home/action',
        data:{action:'ACTION_GET_DRUG_BY_SORT',sort:sort},
        id:'#home_main_drug_table',
        toolbar:'#home_main_drug_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'name',
            title: '名称',
            align: 'center'
        },{
            field: 'normal',
            title: '通用名',
            align: 'center'
        },{
            field: 'brand',
            title: '品牌',
            align: 'center'
        },{
            field: 'specification',
            title: '包装规格',
            align: 'center'
        },{
            field: 'type',
            title: '剂型/型号',
            align: 'center'
        },{
            field: 'publish',
            title: '生产企业',
            align: 'center'
        },{
            field: 'validity',
            title: '有效期',
            align: 'center'
        },{
            field: 'number',
            title: '批准文号',
            align: 'center'
        },{
            field: 'suit',
            title: '适应症',
            align: 'center'
        },{
            field: 'price',
            title: '售价',
            align: 'center'
        },{
            field: 'img',
            title: '图片',
            align: 'center',
            width:'50px',
            formatter: function (value, row, index) {
                return "<a href='#' onclick='openImg(\"" + value + "\")' data-toggle=\"modal\" data-target=\"#home_main_img_dialog\">查看</a>"
            }
        },{
            field: 'count',
            title: '库存',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            width:'100px',
            formatter: function (value, row, index) {
                var drug = escape(JSON.stringify(row));
                return "<div class='btn-group-vertical'><button data-toggle=\"modal\" data-target=\"#home_main_drug_dialog\" class='btn btn-info' onclick='editDrug(\"" + drug + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;修改</button><button onclick='addCount(\"" + drug + "\")' class='btn btn-default' data-toggle=\"modal\" data-target=\"#home_main_count_dialog\"><span class='glyphicon glyphicon-log-in'></span>&nbsp;进货</button><button class='btn btn-primary' data-toggle=\"modal\" data-target=\"#home_main_out_dialog\" onclick='addOrder(\"" + drug + "\")'><span class='glyphicon glyphicon-log-out'></span>&nbsp;出货</button><button data-toggle=\"modal\" data-target=\"#home_main_drug_dialog\" class='btn btn-danger' onclick='delDrug(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 查看图片
 * @param img
 */
function openImg(img) {
    $('#home_main_img_dialog_img').attr('src','/files/' + img);
}

/**
 * 初始化药品管理对话框
 */
function initDrugDialog() {
    $('#home_main_drug_dialog_body').hide();
    $('#home_main_drug_dialog_warn').hide();
    $('#home_main_drug_dialog_btn_add').hide();
    $('#home_main_drug_dialog_btn_edit').hide();
    $('#home_main_drug_dialog_btn_del').hide();
}

/**
 * 添加药品
 */
function addDrug() {
    initDrugDialog();
    $('#home_main_drug_dialog_body').show();
    $('#home_main_drug_dialog_btn_add').show();
    $('#home_main_drug_dialog_label').html('添加新药品');
    //清除数据
    $('#home_main_drug_dialog_name').val('');
    $('#home_main_drug_dialog_normal').val('');
    $('#home_main_drug_dialog_brand').val('');
    $('#home_main_drug_dialog_specification').val('');
    $('#home_main_drug_dialog_type').val('');
    $('#home_main_drug_dialog_publish').val('');
    $('#home_main_drug_dialog_validity').val('');
    $('#home_main_drug_dialog_number').val('');
    $('#home_main_drug_dialog_suit').val('');
    $('#home_main_drug_dialog_price').val('');
    $('#home_main_drug_dialog_img').attr('src','../image/图片.png');
    $('#home_main_drug_dialog_img_file').val('');
    //获取商品分类
    $('#home_main_drug_dialog_sort').empty();
    $('#home_main_drug_dialog_sort').append('<option>请选择药品分类</option>');
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: {action:'ACTION_GET_SORT'},
        success: function (res) {
            if (res!=null && res.length>0) {
                $.each(res,function (i,obj) {
                   var sort = "<option value='" + obj.id + "'>" + obj.name + "</option>";
                    $('#home_main_drug_dialog_sort').append(sort);
                });
            } else {
                alert('获取商品分类失败，请重试!');
                $('#home_main_drug_dialog').modal('hide');
            }
        },
        error: function() {
            alert('获取商品分类失败，请重试!');
            $('#home_main_drug_dialog').modal('hide');
        }
    });
}

/**
 * 绑定添加药品按钮
 */
$('#home_main_drug_dialog_btn_add').click(function () {
    //获取数据
    var name = $('#home_main_drug_dialog_name').val();
    var normal = $('#home_main_drug_dialog_normal').val();
    var brand = $('#home_main_drug_dialog_brand').val();
    var specification = $('#home_main_drug_dialog_specification').val();
    var type = $('#home_main_drug_dialog_type').val();
    var publish = $('#home_main_drug_dialog_publish').val();
    var validity = $('#home_main_drug_dialog_validity').val();
    var number = $('#home_main_drug_dialog_number').val();
    var suit = $('#home_main_drug_dialog_suit').val();
    var price = $('#home_main_drug_dialog_price').val();
    var file = $('#home_main_drug_dialog_img_file').val();
    var sort = $('#home_main_drug_dialog_sort').val();
    if ('' == name) {
        alert('请输入药品名称!');
        return;
    }
    if ('' == normal) {
        alert('请输入通用名!');
        return;
    }
    if ('' == brand) {
        alert('请输入品牌名!');
        return;
    }
    if ('' == specification) {
        alert('请输入包装规格!');
        return;
    }
    if ('' == type) {
        alert('请输入剂型/型号!');
        return;
    }
    if ('' == publish) {
        alert('请输入生产企业!');
        return;
    }
    if ('' == validity) {
        alert('请输入有效期!');
        return;
    }
    if ('' == number) {
        alert('请输入批准文号!');
        return;
    }
    if ('' == suit) {
        alert('请输入适应症!');
        return;
    }
    if ('' == price) {
        alert('请输入售价!');
        return;
    }
    if ('' == file) {
        alert('请选择图片!');
        return;
    }
    if (sort == '请选择药品分类') {
        alert('请选择药品分类!');
        return;
    }
    //上传图片
    $.ajax({
        url: '/file',
        type: 'post',
        cache: false,
        data: new FormData($('#home_main_drug_dialog_img_form')[0]),
        processData: false,
        contentType: false,
        dataType: "json",
        complete: function (res) {
            var img = res.responseText;
            //数据封装
            var param = {
                action:'ACTION_ADD_DRUG',
                name:name,
                normal:normal,
                brand:brand,
                specification:specification,
                type:type,
                publish:publish,
                validity:validity,
                number:number,
                suit:suit,
                price:price,
                img:img,
                sort:sort
            };
            $.ajax({
                type: 'post',
                url: '/home/action',
                dataType: "json",
                data: param,
                success: function (res) {
                    if (res) {
                        alert('添加成功!');
                        $('#home_main_drug_dialog').modal('hide');
                        //判断是否带有分类
                        var sort = getUrlParam("sort");
                        if (sort == null || sort == '') {
                            initDrugTable(1);
                        } else {
                            initDrugTableBySort(1,sort);
                        }
                    } else {
                        alert('添加失败!');
                    }
                },
                error: function() {
                    alert('服务器异常，添加失败!');
                }
            });
        }
    });
});

/**
 * 编辑药品
 * @param data
 */
function editDrug(data) {
    var drug = JSON.parse(unescape(data));
    initDrugDialog();
    $('#home_main_drug_dialog_body').show();
    $('#home_main_drug_dialog_btn_edit').show();
    $('#home_main_drug_dialog_label').html('修改药品');
    //填充数据
    $('#home_main_drug_dialog_id').val(drug.id);
    $('#home_main_drug_dialog_img_edit').val(drug.img);
    $('#home_main_drug_dialog_count_edit').val(drug.count);
    $('#home_main_drug_dialog_name').val(drug.name);
    $('#home_main_drug_dialog_normal').val(drug.normal);
    $('#home_main_drug_dialog_brand').val(drug.brand);
    $('#home_main_drug_dialog_specification').val(drug.specification);
    $('#home_main_drug_dialog_type').val(drug.type);
    $('#home_main_drug_dialog_publish').val(drug.publish);
    $('#home_main_drug_dialog_validity').val(drug.validity);
    $('#home_main_drug_dialog_number').val(drug.number);
    $('#home_main_drug_dialog_suit').val(drug.suit);
    $('#home_main_drug_dialog_price').val(drug.price);
    $('#home_main_drug_dialog_img').attr('src','../files/' + drug.img);
    $('#home_main_drug_dialog_img_file').val('');
    //获取商品分类
    $('#home_main_drug_dialog_sort').empty();
    $('#home_main_drug_dialog_sort').append('<option>请选择药品分类</option>');
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: {action:'ACTION_GET_SORT'},
        success: function (res) {
            if (res!=null && res.length>0) {
                $.each(res,function (i,obj) {
                    var sort = "<option value='" + obj.id + "'>" + obj.name + "</option>";
                    $('#home_main_drug_dialog_sort').append(sort);
                });
                var select = document.getElementById("home_main_drug_dialog_sort");
                for(var i=0; i<select.options.length; i++){
                    if(select.options[i].value == drug.sort){
                        select.options[i].selected = true;
                        break;
                    }
                }
            } else {
                alert('获取商品分类失败，请重试!');
                $('#home_main_drug_dialog').modal('hide');
            }
        },
        error: function() {
            alert('获取商品分类失败，请重试!');
            $('#home_main_drug_dialog').modal('hide');
        }
    });
}

/**
 * 绑定编辑药品按钮
 */
$('#home_main_drug_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#home_main_drug_dialog_id').val();
    var name = $('#home_main_drug_dialog_name').val();
    var normal = $('#home_main_drug_dialog_normal').val();
    var brand = $('#home_main_drug_dialog_brand').val();
    var specification = $('#home_main_drug_dialog_specification').val();
    var type = $('#home_main_drug_dialog_type').val();
    var publish = $('#home_main_drug_dialog_publish').val();
    var validity = $('#home_main_drug_dialog_validity').val();
    var number = $('#home_main_drug_dialog_number').val();
    var suit = $('#home_main_drug_dialog_suit').val();
    var price = $('#home_main_drug_dialog_price').val();
    var file = $('#home_main_drug_dialog_img_file').val();
    var sort = $('#home_main_drug_dialog_sort').val();
    if ('' == name) {
        alert('请输入药品名称!');
        return;
    }
    if ('' == normal) {
        alert('请输入通用名!');
        return;
    }
    if ('' == brand) {
        alert('请输入品牌名!');
        return;
    }
    if ('' == specification) {
        alert('请输入包装规格!');
        return;
    }
    if ('' == type) {
        alert('请输入剂型/型号!');
        return;
    }
    if ('' == publish) {
        alert('请输入生产企业!');
        return;
    }
    if ('' == validity) {
        alert('请输入有效期!');
        return;
    }
    if ('' == number) {
        alert('请输入批准文号!');
        return;
    }
    if ('' == suit) {
        alert('请输入适应症!');
        return;
    }
    if ('' == price) {
        alert('请输入售价!');
        return;
    }
    if (sort == '请选择药品分类') {
        alert('请选择药品分类!');
        return;
    }
    if (file == '') {
        //不需要更新图片
        var param = {
            action:'ACTION_EDIT_DRUG',
            id:id,
            name:name,
            normal:normal,
            brand:brand,
            specification:specification,
            type:type,
            publish:publish,
            validity:validity,
            number:number,
            suit:suit,
            price:price,
            img:$('#home_main_drug_dialog_img_edit').val(),
            sort:sort,
            count:$('#home_main_drug_dialog_count_edit').val()
        };
        $.ajax({
            type: 'post',
            url: '/home/action',
            dataType: "json",
            data: param,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#home_main_drug_dialog').modal('hide');
                    //判断是否带有分类
                    var sort = getUrlParam("sort");
                    if (sort == null || sort == '') {
                        initDrugTable($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber);
                    } else {
                        initDrugTableBySort($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber,sort);
                    }
                } else {
                    alert('修改失败!');
                }
            },
            error: function() {
                alert('服务器异常，修改失败!');
            }
        });
    } else {
        //需要更新图片，上传图片
        $.ajax({
            url: '/file',
            type: 'post',
            cache: false,
            data: new FormData($('#home_main_drug_dialog_img_form')[0]),
            processData: false,
            contentType: false,
            dataType: "json",
            complete: function (res) {
                var img = res.responseText;
                //数据封装
                var param = {
                    action:'ACTION_EDIT_DRUG',
                    id:id,
                    name:name,
                    normal:normal,
                    brand:brand,
                    specification:specification,
                    type:type,
                    publish:publish,
                    validity:validity,
                    number:number,
                    suit:suit,
                    price:price,
                    img:img,
                    sort:sort,
                    count:$('#home_main_drug_dialog_count_edit').val()
                };
                $.ajax({
                    type: 'post',
                    url: '/home/action',
                    dataType: "json",
                    data: param,
                    success: function (res) {
                        if (res) {
                            alert('修改成功!');
                            $('#home_main_drug_dialog').modal('hide');
                            initDrugTable($('#home_main_drug_table').bootstrapTable('getOptions').pageNumber);
                        } else {
                            alert('修改失败!');
                        }
                    },
                    error: function() {
                        alert('服务器异常，修改失败!');
                    }
                });
            }
        });
    }
});

/**
 * 删除药品
 * @param id
 */
function delDrug(id) {
    initDrugDialog();
    $('#home_main_drug_dialog_warn').show();
    $('#home_main_drug_dialog_btn_del').show();
    $('#home_main_drug_dialog_label').html('删除药品');
    //填充数据
    $('#home_main_drug_dialog_id').val(id);
}

/**
 * 绑定删除药品按钮
 */
$('#home_main_drug_dialog_btn_del').click(function () {
    var id =  $('#home_main_drug_dialog_id').val();
    var param = {
        action:'ACTION_DEL_DRUG',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: param,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                $('#home_main_drug_dialog').modal('hide');
                //判断是否带有分类
                var sort = getUrlParam("sort");
                if (sort == null || sort == '') {
                    initDrugTable($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    initDrugTableBySort($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber,sort);
                }
            } else {
                alert('删除失败!');
            }
        },
        error: function() {
            alert('服务器异常，删除失败!');
        }
    });
});

/**
 * 药品进货
 * @param data
 */
function addCount(data) {
    var drug = JSON.parse(unescape(data));
    $('#home_main_count_dialog_img').attr('src','/files/' + drug.img);
    $('#home_main_count_dialog_name').html(drug.name);
    $('#home_main_count_dialog_old').html(drug.count);
    $('#home_main_count_dialog_count').val('');
    $('#home_main_count_dialog_id').val(drug.id);
}

/**
 * 绑定进货按钮
 */
$('#home_main_count_dialog_btn_add').click(function () {
    var id = $('#home_main_count_dialog_id').val();
    var count = $('#home_main_count_dialog_count').val();
    if ('' == count) {
        alert('请输入进货数量!');
    } else {
        var param = {
            action:'ACTION_IN_DRUG',
            id:id,
            count:count
        };
        $.ajax({
            type: 'post',
            url: '/home/action',
            dataType: "json",
            data: param,
            success: function (res) {
                if (res) {
                    alert('进货成功!');
                    $('#home_main_count_dialog').modal('hide');
                    //判断是否带有分类
                    var sort = getUrlParam("sort");
                    if (sort == null || sort == '') {
                        initDrugTable($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber);
                    } else {
                        initDrugTableBySort($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber,sort);
                    }
                } else {
                    alert('进货失败!');
                }
            },
            error: function() {
                alert('服务器异常，进货失败!');
            }
        });
    }
});

/**
 * 药品出货
 * @param data
 */
function addOrder(data) {
    var drug = JSON.parse(unescape(data));
    drug_data = drug;
    $('#home_main_out_dialog_img').attr('src','/files/' + drug.img);
    $('#home_main_out_dialog_now').html(drug.name);
    $('#home_main_out_dialog_old').html(drug.count);
    $('#home_main_out_dialog_id').val(drug.id);
    $('#home_main_out_dialog_name').val('');
    $('#home_main_out_dialog_phone').val('');
    $('#home_main_out_dialog_addr').val('');
    $('#home_main_out_dialog_liu').val('');
    $('#home_main_out_dialog_number').val('');
    $('#home_main_out_dialog_count').val('');
}

/**
 * 绑定药品出货按钮
 */
$('#home_main_out_dialog_btn_add').click(function () {
    //获取数据
    var id = $('#home_main_out_dialog_id').val();
    var name = $('#home_main_out_dialog_name').val();
    var phone = $('#home_main_out_dialog_phone').val();
    var addr = $('#home_main_out_dialog_addr').val();
    var liu = $('#home_main_out_dialog_liu').val();
    var number = $('#home_main_out_dialog_number').val();
    var count = $('#home_main_out_dialog_count').val();
    if ('' == name) {
        alert('请输入收货人姓名!');
        return;
    }
    if ('' == phone) {
        alert('请输入收货人电话!');
        return;
    }
    if ('' == addr) {
        alert('请输入收货人地址!');
        return;
    }
    if ('' == liu) {
        alert('请输入物流公司!');
        return;
    }
    if ('' == number) {
        alert('请输入物流单号!');
        return;
    }
    if ('' == count) {
        alert('请输入出货数量!');
        return;
    }
    if (parseInt(count)>parseInt($('#home_main_out_dialog_old').html())) {
        alert('出货数量不能大于库存数量!');
        return;
    }
    //数据封装
    var drug = JSON.stringify(drug_data);
    var info = {
        name:name,
        phone:phone,
        addr:setFormatCode(addr),
        liu:liu,
        number:number,
        count:count
    };
    var param = {
        action:'ACTION_OUT_DRUG',
        id:id,
        count:count,
        drug:drug,
        info:JSON.stringify(info),
        time:getNowFormatDate()
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: param,
        success: function (res) {
            if (res) {
                alert('出货成功!');
                $('#home_main_out_dialog').modal('hide');
                //判断是否带有分类
                var sort = getUrlParam("sort");
                if (sort == null || sort == '') {
                    initDrugTable($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    initDrugTableBySort($('#home_main_sort_table').bootstrapTable('getOptions').pageNumber,sort);
                }
            } else {
                alert('出货失败!');
            }
        },
        error: function() {
            alert('服务器异常，出货失败!');
        }
    });
});

/**
 * 绑定药品图片选择
 */
$('#home_main_drug_dialog_img').click(function () {
    $('#home_main_drug_dialog_img_file').click();
});

/**
 * 绑定图片文件选择结果
 */
$('#home_main_drug_dialog_img_file').on('change',function () {
    if (this.files[0]) {
        var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            $("#home_main_drug_dialog_img").attr("src", objUrl); //将图片路径存入src中，显示出图片
        }
    }
});

/**
 * 绑定打开分类栏
 */
$('#home_nav_open_sort').click(function () {
    $('#home_nav_sort_list').slideToggle(300);
});

/**
 * 绑定全部分类
 */
$('#home_nav_sort_list_main_all').click(function () {
    window.location = "/home/view?id=" + getUrlParam("id") + "&name=" + getUrlParam("name") + "&type=" + getUrlParam("type") + "&menu=0";
});

/**
 * 初始化订单详情
 */
function initOrder() {
    $('#home_main_order').fadeIn(500);
    initOrderTable(1);
}

/**
 * 初始化订单详情表
 * @param pageNumber
 * @param sort
 */
function initOrderTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home/action',
        data:{action:'ACTION_GET_ORDER'},
        id:'#home_main_order_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'drug',
            title: '药品',
            align: 'center',
            formatter: function (value, row, index) {
                var drug = JSON.parse(value);
                var tmp = escape(value);
                return "<a onclick='showDrugDetail(\"" + tmp + "\")' href='#' data-toggle=\"modal\" data-target=\"#home_main_order_drug_dialog\">" + drug.name + "</a>"
            }
        },{
            field: 'drug',
            title: '单价',
            align: 'center',
            formatter: function (value, row, index) {
                var drug = JSON.parse(value);
                return drug.price;
            }
        },{
            field: 'info',
            title: '出货数量',
            align: 'center',
            formatter: function (value, row, index) {
                var info = JSON.parse(value);
                return info.count;
            }
        },{
            field: 'info',
            title: '客户信息&物流信息',
            align: 'center',
            formatter: function (value, row, index) {
                var info = JSON.parse(value);
                var tmp = escape(value);
                return "<a onclick='showUserDetail(\"" + tmp + "\")' href='#' data-toggle=\"modal\" data-target=\"#home_main_order_user_dialog\">查看</a>";
            }
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            width:'100px',
            formatter: function (value, row, index) {
                var data = escape(JSON.stringify(row));
                return "<div class='btn-group'><button data-toggle=\"modal\" data-target=\"#home_main_order_dialog\" class='btn btn-info' onclick='editOrder(\"" + data + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;修改</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 查看药品详情
 * @param data
 */
function showDrugDetail(data) {
    var drug = JSON.parse(unescape(data));
    $('#home_main_order_drug_dialog_name').html(drug.name);
    $('#home_main_order_drug_dialog_normal').html(drug.normal);
    $('#home_main_order_drug_dialog_brand').html(drug.brand);
    $('#home_main_order_drug_dialog_specification').html(drug.specification);
    $('#home_main_order_drug_dialog_type').html(drug.type);
    $('#home_main_order_drug_dialog_publish').html(drug.publish);
    $('#home_main_order_drug_dialog_validity').html(drug.validity);
    $('#home_main_order_drug_dialog_number').html(drug.number);
    $('#home_main_order_drug_dialog_suit').html(drug.suit);
    $('#home_main_order_drug_dialog_price').html(drug.price);
    $('#home_main_order_drug_dialog_img').attr('src','/files/' + drug.img);
}

/**
 * 显示客户信息
 * @param data
 */
function showUserDetail(data) {
    var info = JSON.parse(unescape(data));
    $('#home_main_order_user_dialog_name').html(info.name);
    $('#home_main_order_user_dialog_phone').html(info.phone);
    $('#home_main_order_user_dialog_addr').html(info.addr);
    $('#home_main_order_user_dialog_liu').html(info.liu);
    $('#home_main_order_user_dialog_number').html(info.number);
}

/**
 * 编辑订单
 * @param data
 */
function editOrder(data) {
    var order = JSON.parse(unescape(data));
    order_data = order;
    var drug = JSON.parse(order.drug);
    var info = JSON.parse(order.info);
    $('#home_main_order_dialog_id').val(order.id);
    $('#home_main_order_dialog_now').html(drug.name);
    $('#home_main_order_dialog_img').attr('src','/files/' + drug.img);
    $('#home_main_order_dialog_name').val(info.name);
    $('#home_main_order_dialog_phone').val(info.phone);
    $('#home_main_order_dialog_addr').val(getFormatCode(info.addr));
    $('#home_main_order_dialog_liu').val(info.liu);
    $('#home_main_order_dialog_number').val(info.number);
}

/**
 * 绑定确认修改客户信息按钮
 */
$('#home_main_order_dialog_btn_edit').click(function () {
    //获取数据
    var info_tmp = JSON.parse(order_data.info);
    var name = $('#home_main_order_dialog_name').val();
    var phone = $('#home_main_order_dialog_phone').val();
    var addr = $('#home_main_order_dialog_addr').val();
    var liu = $('#home_main_order_dialog_liu').val();
    var number = $('#home_main_order_dialog_number').val();
    if ('' == name) {
        alert('请输入收货人姓名!');
        return;
    }
    if ('' == phone) {
        alert('请输入收货人电话!');
        return;
    }
    if ('' == addr) {
        alert('请输入收货人地址!');
        return;
    }
    if ('' == liu) {
        alert('请输入物流公司!');
        return;
    }
    if ('' == number) {
        alert('请输入物流单号!');
        return;
    }
    var info = {
        name:name,
        phone:phone,
        addr:setFormatCode(addr),
        liu:liu,
        number:number,
        count:info_tmp.count
    };
    var param = {
        action:'ACTION_EDIT_ORDER',
        id:order_data.id,
        drug:order_data.drug,
        info:JSON.stringify(info),
        time:order_data.time
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: param,
        success: function (res) {
            if (res) {
                alert('修改成功!');
                $('#home_main_order_dialog').modal('hide');
                initOrderTable($('#home_main_order_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('修改失败!');
            }
        },
        error: function() {
            alert('服务器异常，修改失败!');
        }
    });
});

/**
 * 初始化操作日志
 */
function initLog() {
    $('#home_main_log').fadeIn(500);
    initLogTable(1);
}

/**
 * 初始化操作日志表
 * @param pageNumber
 */
function initLogTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home/action',
        data:{action:'ACTION_GET_LOG'},
        id:'#home_main_log_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'detail',
            title: '操作详情',
            align: 'center'
        },{
            field: 'time',
            title: '操作时间',
            align: 'center'
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化销售人员管理
 */
function initStaff() {
    $('#home_admin_main_user').show();
    initStaffTable(1);
}

/**
 * 初始化销售人员管理信息表
 * @param pageNumber
 */
function initStaffTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home/action',
        data:{action:'ACTION_ADMIN_GET_USER'},
        id:'#home_admin_main_user_table',
        toolbar:'#home_admin_main_user_toolbar',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'account',
            title: '账号',
            align: 'center'
        }, {
            field: 'name',
            title: '姓名',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var user = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#home_admin_main_user_dialog\" onclick='editUser(\"" + user + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#home_admin_main_user_dialog\" onclick='delUser(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化销售人员管理对话框
 */
function initAdminToUserDialog() {
    $('#home_admin_main_user_dialog_body').hide();
    $('#home_admin_main_user_dialog_warn').hide();
    $('#home_admin_main_user_dialog_btn_add').hide();
    $('#home_admin_main_user_dialog_btn_edit').hide();
    $('#home_admin_main_user_dialog_btn_del').hide();
    //获取全部员工数据
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data:{action:'ACTION_ADMIN_GET_USER'},
        success: function (res) {
            admin_data_user = res;
        },
        error: function () {
            admin_data_user = null;
        }
    });
    $('#home_admin_main_user_dialog_account').removeAttr("disabled");
}

/**
 * 添加新销售人员
 */
function addUser() {
    initAdminToUserDialog();
    $('#home_admin_main_user_dialog_body').show();
    $('#home_admin_main_user_dialog_btn_add').show();
    $('#home_admin_main_user_dialog_label').html('添加新销售人员');
    //清除数据
    $('#home_admin_main_user_dialog_account').val('');
    $('#home_admin_main_user_dialog_pwd').val('');
    $('#home_admin_main_user_dialog_name').val('');
}

/**
 * 绑定添加新销售人员按钮
 */
$('#home_admin_main_user_dialog_btn_add').click(function () {
    //获取数据
    var account = $('#home_admin_main_user_dialog_account').val();
    var pwd = $('#home_admin_main_user_dialog_pwd').val();
    var name = $('#home_admin_main_user_dialog_name').val();
    //数据校验
    if (account == '') {
        alert('请输入手机号!');
        return;
    }
    if (!isPoneAvailable(account)) {
        alert('请输入正确格式的手机号!');
        return;
    }
    //判断是否已经被注册过
    var flag_account = false;
    if (admin_data_user != null) {
        $.each(admin_data_user,function (i,obj) {
            if (obj.account == account) {
                flag_account = true;
            }
        });
    }
    if (flag_account) {
        alert('该手机号已经绑定员工!');
        return;
    }
    if (pwd == '') {
        alert('请输入密码!');
        return;
    }
    if (name == '') {
        alert('请输入姓名!');
        return;
    }
    //数据封装
    var data = {
        action:'ACTION_ADMIN_ADD_USER',
        account:account,
        pwd:pwd,
        name:name
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('添加成功!');
                $('#home_admin_main_user_dialog').modal('hide');
                initStaffTable(1);
            } else {
                alert('添加失败!');
            }
        },
        error: function() {
            alert('服务器异常，添加失败!');
        }
    });
});

/**
 * 编辑销售人员信息
 * @param data
 */
function editUser(data) {
    initAdminToUserDialog();
    $('#home_admin_main_user_dialog_body').show();
    $('#home_admin_main_user_dialog_btn_edit').show();
    $('#home_admin_main_user_dialog_label').html('修改销售人员资料');
    var user = JSON.parse(unescape(data));
    $('#home_admin_main_user_dialog_account').attr("disabled","disabled");
    //填充员工信息
    $('#home_admin_main_user_dialog_id').val(user.id);
    $('#home_admin_main_user_dialog_account').val(user.account);
    $('#home_admin_main_user_dialog_pwd').val(new Base64().decode(user.pwd));
    $('#home_admin_main_user_dialog_name').val(user.name);
}

/**
 * 绑定修改
 */
$('#home_admin_main_user_dialog_btn_edit').click(function () {
    //获取数据
    var id = $('#home_admin_main_user_dialog_id').val();
    var account = $('#home_admin_main_user_dialog_account').val();
    var pwd = $('#home_admin_main_user_dialog_pwd').val();
    var name = $('#home_admin_main_user_dialog_name').val();
    //数据校验
    if (pwd == '') {
        alert('请输入密码!');
        return;
    }
    if (name == '') {
        alert('请输入姓名!');
        return;
    }
    //数据封装
    var data = {
        action:'ACTION_ADMIN_EDIT_USER',
        account:account,
        pwd:pwd,
        name:name,
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('修改成功!');
                $('#home_admin_main_user_dialog').modal('hide');
                initStaffTable($('#home_admin_main_user_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('修改失败!');
            }
        },
        error: function() {
            alert('服务器异常，修改失败!');
        }
    });
});

/**
 * 删除销售人员
 * @param id
 */
function delUser(id) {
    initAdminToUserDialog();
    $('#home_admin_main_user_dialog_warn').show();
    $('#home_admin_main_user_dialog_btn_del').show();
    $('#home_admin_main_user_dialog_label').html('删除销售人员');
    $('#home_admin_main_user_dialog_id').val(id);
}

/**
 * 绑定删除员工按钮
 */
$('#home_admin_main_user_dialog_btn_del').click(function () {
    //获取数据
    var id = $('#home_admin_main_user_dialog_id').val();
    //数据封装
    var data = {
        action:'ACTION_ADMIN_DEL_USER',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/home/action',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                $('#home_admin_main_user_dialog').modal('hide');
                initStaffTable($('#home_admin_main_user_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error: function() {
            alert('服务器异常，删除失败!');
        }
    });
});


/**
 * 获取图片的url
 * @param file
 * @returns {*}
 */
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) {
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) {
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

/**
 * 获取url中的指定参数
 * @param {any} name
 */
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

/**
 * 手机号校验
 * @param phone
 * @returns {boolean}
 */
function isPoneAvailable(phone) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 文本转html
 * @param strValue
 * @returns {string}
 */
function getFormatCode(strValue) {
    return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
}

/**
 * html转文本
 * @param strValue
 * @returns {string}
 */
function setFormatCode(strValue) {
    return strValue.replace(/<br\/>/g, '\r\n').replace(/<br\/>/g, '\n').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}