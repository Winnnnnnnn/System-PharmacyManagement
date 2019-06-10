package com.main.controller;

import com.main.util.Base64Util;
import com.main.util.SessionUtil;
import net.sf.json.JSONObject;
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
import java.util.List;

import static com.main.util.ConstUtil.ACTION_LOGIN;

/**
 * @Author: 丁凡
 * @Date: Create in 0:13 2019/4/21
 * @Description: 登录页控制器
 */
@Controller
@RequestMapping("/login")
public class Login {
    /**
     * GET请求
     * 获取登录页
     * @return
     */
    @RequestMapping("/view")
    public String login() {
        return "/view/login";
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
            case ACTION_LOGIN:
                printWriter.print(doLogin(req));
                break;
        }
    }

    /**
     * 处理登录动作
     * @param req
     * @return
     */
    private String doLogin(HttpServletRequest req) {
        //获取数据库会话
        final Session session = SessionUtil.getSession();
        Transaction transaction = null;
        List list = null;
        //判断登录类型
        int type = Integer.parseInt(req.getParameter("type"));
        if (0==type) {
            //销售人员登录
            try{
                //开始业务
                transaction = session.beginTransaction();
                Query query = session.createQuery("from StaffBean where account=:account and pwd=:pwd");
                query.setParameter("account",req.getParameter("account"));
                query.setParameter("pwd", Base64Util.encode(req.getParameter("pwd")));
                list = query.list();
                transaction.commit();
            }catch (HibernateException e) {
                if (transaction!=null) transaction.rollback();
                e.printStackTrace();
            }finally {
                session.close();
            }
        } else {
            //管理人员登录
            try{
                //开始业务
                transaction = session.beginTransaction();
                Query query = session.createQuery("from AdminBean where name=:name and pwd=:pwd");
                query.setParameter("name",req.getParameter("name"));
                query.setParameter("pwd", Base64Util.encode(req.getParameter("pwd")));
                list = query.list();
                transaction.commit();
            }catch (HibernateException e) {
                if (transaction!=null) transaction.rollback();
                e.printStackTrace();
            }finally {
                session.close();
            }
        }
        //数据回调给前端
        if (list != null) {
            JSONObject jsonObject = JSONObject.fromObject(list.get(0));
            return jsonObject.toString();
        } else {
            return "";
        }
    }
}
