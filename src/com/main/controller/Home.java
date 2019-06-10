package com.main.controller;

import com.main.bean.*;
import com.main.util.Base64Util;
import com.main.util.SessionUtil;
import com.main.util.SqlHelper;
import net.sf.json.JSONArray;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.main.util.ConstUtil.*;

/**
 * @Author: 丁凡
 * @Date: Create in 11:18 2019/4/21
 * @Description: 首页控制器
 */
@Controller
@RequestMapping("/home")
public class Home {
    /**
     * GET请求
     * 获取首页
     * @return
     */
    @RequestMapping("/view")
    public String login() {
        return "/view/home";
    }

    /**
     * 处理浏览器POST请求
     * @param req
     * @param res
     */
    @RequestMapping(value="/action",method= RequestMethod.POST)
    public void action(HttpServletRequest req, HttpServletResponse res) throws IOException {
        //调整编码，防止中文乱码
        req.setCharacterEncoding("utf-8");
        res.setCharacterEncoding("utf-8");
        //获取动作
        String action = req.getParameter("action");
        //获取回写对象
        PrintWriter printWriter = res.getWriter();
        //动作分发
        switch (action) {
            case ACTION_GET_SORT:
                printWriter.print(doGetSort(req));
                break;
            case ACTION_ADD_SORT:
                printWriter.print(doAddSort(req));
                break;
            case ACTION_EDIT_SORT:
                printWriter.print(doEditSort(req));
                break;
            case ACTION_DEL_SORT:
                printWriter.print(doDelSort(req));
                break;
            case ACTION_GET_DRUG:
                printWriter.print(doGetDrug(req));
                break;
            case ACTION_ADD_DRUG:
                printWriter.print(doAddDrug(req));
                break;
            case ACTION_EDIT_DRUG:
                printWriter.print(doEditDrug(req));
                break;
            case ACTION_DEL_DRUG:
                printWriter.print(doDelDrug(req));
                break;
            case ACTION_IN_DRUG:
                printWriter.print(doInDrug(req));
                break;
            case ACTION_OUT_DRUG:
                printWriter.print(doOutDrug(req));
                break;
            case ACTION_GET_DRUG_BY_SORT:
                printWriter.print(doGetDrugBySort(req));
                break;
            case ACTION_GET_ORDER:
                printWriter.print(doGetOrder(req));
                break;
            case ACTION_EDIT_ORDER:
                printWriter.print(doEditOrder(req));
                break;
            case ACTION_GET_LOG:
                printWriter.print(doGetLog(req));
                break;
            case ACTION_ADMIN_GET_USER:
                printWriter.print(doGetUser(req));
                break;
            case ACTION_ADMIN_ADD_USER:
                printWriter.print(doAddUser(req));
                break;
            case ACTION_ADMIN_EDIT_USER:
                printWriter.print(doEditUser(req));
                break;
            case ACTION_ADMIN_DEL_USER:
                printWriter.print(doDelUser(req));
                break;
        }
    }

    /**
     * 获取全部分类
     * @param req
     * @return
     */
    private String doGetSort(HttpServletRequest req) {
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        List list = null;
        try{
            transaction = session.beginTransaction();
            Query query = session.createQuery("FROM SortBaen ORDER BY id DESC");
            list = query.list();
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        if (list != null) {
            JSONArray jsonArray = JSONArray.fromObject(list);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加分类
     * @param req
     * @return
     */
    private Boolean doAddSort(HttpServletRequest req) {
        //实例化对象
        SortBaen sortBaen = new SortBaen(
                req.getParameter("name")
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.save(sortBaen);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        //记录日志
        doAddLog("添加分类：" + req.getParameter("name"));
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 编辑分类
     * @param req
     * @return
     */
    private Boolean doEditSort(HttpServletRequest req) {
        //实例化对象
        SortBaen sortBaen = new SortBaen(
                Integer.parseInt(req.getParameter("id")),
                req.getParameter("name")
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.update(sortBaen);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        //记录日志
        doAddLog("修改分类编号：" + req.getParameter("id") + "为" + req.getParameter("name"));
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除分类
     * @param req
     * @return
     */
    private Boolean doDelSort(HttpServletRequest req) {
        //实例化对象
        SortBaen sortBaen = new SortBaen(
                Integer.parseInt(req.getParameter("id"))
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.delete(sortBaen);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        //记录日志
        doAddLog("删除分类编号为：" + req.getParameter("id") + "的药品分类");
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取全部药品
     * @param req
     * @return
     */
    private String doGetDrug(HttpServletRequest req) {
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        List list = null;
        try{
            transaction = session.beginTransaction();
            Query query = session.createQuery("FROM DrugBean ORDER BY id DESC");
            list = query.list();
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        if (list != null) {
            JSONArray jsonArray = JSONArray.fromObject(list);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加药品
     * @param req
     * @return
     */
    private Boolean doAddDrug(HttpServletRequest req) {
        //实例化对象
        DrugBean drugBean = new DrugBean(
                req.getParameter("name"),
                req.getParameter("normal"),
                req.getParameter("brand"),
                req.getParameter("specification"),
                req.getParameter("type"),
                req.getParameter("publish"),
                req.getParameter("validity"),
                req.getParameter("number"),
                req.getParameter("suit"),
                req.getParameter("price"),
                req.getParameter("img"),
                Integer.parseInt(req.getParameter("sort")),
                0
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.save(drugBean);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        //记录日志
        doAddLog("添加药品：" + req.getParameter("name"));
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 编辑药品
     * @param req
     * @return
     */
    private Boolean doEditDrug(HttpServletRequest req) {
        //实例化对象
        DrugBean drugBean = new DrugBean(
                Integer.parseInt(req.getParameter("id")),
                req.getParameter("name"),
                req.getParameter("normal"),
                req.getParameter("brand"),
                req.getParameter("specification"),
                req.getParameter("type"),
                req.getParameter("publish"),
                req.getParameter("validity"),
                req.getParameter("number"),
                req.getParameter("suit"),
                req.getParameter("price"),
                req.getParameter("img"),
                Integer.parseInt(req.getParameter("sort")),
                Integer.parseInt(req.getParameter("count"))
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.update(drugBean);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        //记录日志
        doAddLog("修改药品编号：" + req.getParameter("id") + "的内容");
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除药品
     * @param req
     * @return
     */
    private Boolean doDelDrug(HttpServletRequest req) {
        //实例化对象
        DrugBean drugBean = new DrugBean(
                Integer.parseInt(req.getParameter("id"))
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.delete(drugBean);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        //记录日志
        doAddLog("删除药品编号为：" + req.getParameter("id") + "的药品");
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 药品进货
     * @param req
     * @return
     */
    private Boolean doInDrug(HttpServletRequest req) {
        String sql = "update drug set count=count+? where id=?";
        String p[] = {
                req.getParameter("count"),
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        //记录日志
        doAddLog("添加药品编号为：" + req.getParameter("id") + "的库存，添加量：" + req.getParameter("count"));
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 药品出货
     * @param req
     * @return
     */
    private Boolean doOutDrug(HttpServletRequest req) {
        //实例化对象
        OrderBean orderBean = new OrderBean(
                req.getParameter("drug"),
                req.getParameter("info"),
                req.getParameter("time")
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.save(orderBean);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        //记录日志
        doAddLog("添加订单，药品编号：" + req.getParameter("id") + "，数量：" + req.getParameter("count"));
        if (result) {
            //订单创建成功，修改库存数量
            String sql = "update drug set count=count-? where id=?";
            String p[] = {
                    req.getParameter("count"),
                    req.getParameter("id")
            };
            int r = SqlHelper.doUpdate(sql,p);
            if (r>0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * 根据类别获取全部药品
     * @param req
     * @return
     */
    private String doGetDrugBySort(HttpServletRequest req) {
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        List list = null;
        try{
            transaction = session.beginTransaction();
            Query query = session.createQuery("FROM DrugBean where sort=:sort ORDER BY id DESC");
            query.setParameter("sort",Integer.parseInt(req.getParameter("sort")));
            list = query.list();
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        if (list != null) {
            JSONArray jsonArray = JSONArray.fromObject(list);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取全部订单
     * @param req
     * @return
     */
    private String doGetOrder(HttpServletRequest req) {
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        List list = null;
        try{
            transaction = session.beginTransaction();
            Query query = session.createQuery("FROM OrderBean ORDER BY id DESC");
            list = query.list();
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        if (list != null) {
            JSONArray jsonArray = JSONArray.fromObject(list);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 编辑订单
     * @param req
     * @return
     */
    private Boolean doEditOrder(HttpServletRequest req) {
        //实例化对象
        OrderBean orderBean = new OrderBean(
                Integer.parseInt(req.getParameter("id")),
                req.getParameter("drug"),
                req.getParameter("info"),
                req.getParameter("time")
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.update(orderBean);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        //记录日志
        doAddLog("修改订单，订单编号："+ req.getParameter("id"));
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 记录日志
     * @param message
     */
    private void doAddLog(String message) {
        //获取记录时间
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String time = df.format(new Date());
        //实例化对象
        LogBean logBean = new LogBean(
                message,
                time
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        try{
            transaction = session.beginTransaction();
            session.save(logBean);
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
    }

    /**
     * 获取日志
     * @param req
     * @return
     */
    private String doGetLog(HttpServletRequest req) {
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        List list = null;
        try{
            transaction = session.beginTransaction();
            Query query = session.createQuery("FROM LogBean ORDER BY id DESC");
            list = query.list();
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        if (list != null) {
            JSONArray jsonArray = JSONArray.fromObject(list);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取全部员工信息
     * @param req
     * @return
     */
    private String doGetUser(HttpServletRequest req) {
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        List list = null;
        try{
            transaction = session.beginTransaction();
            Query query = session.createQuery("FROM StaffBean ORDER BY id DESC");
            list = query.list();
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        if (list != null) {
            JSONArray jsonArray = JSONArray.fromObject(list);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加新员工
     * @param req
     * @return
     */
    private Boolean doAddUser(HttpServletRequest req) {
        //实例化对象
        StaffBean staffBean = new StaffBean(
                req.getParameter("account"),
                Base64Util.encode(req.getParameter("pwd")),
                req.getParameter("name")
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.save(staffBean);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 编辑员工资料
     * @param req
     * @return
     */
    private Boolean doEditUser(HttpServletRequest req) {
        //实例化对象
        StaffBean staffBean = new StaffBean(
                Integer.parseInt(req.getParameter("id")),
                req.getParameter("account"),
                Base64Util.encode(req.getParameter("pwd")),
                req.getParameter("name")
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.update(staffBean);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除员工
     * @param req
     * @return
     */
    private Boolean doDelUser(HttpServletRequest req) {
        //实例化对象
        StaffBean staffBean = new StaffBean(
                Integer.parseInt(req.getParameter("id"))
        );
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        Boolean result = false;
        try{
            transaction = session.beginTransaction();
            session.delete(staffBean);
            transaction.commit();
            result = true;
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        if (result) {
            return true;
        } else {
            return false;
        }
    }
}
