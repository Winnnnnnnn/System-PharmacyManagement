package com.main.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Author: 丁凡
 * @Date: Create in 0:00 2019/4/21
 * @Description: 销售人员Bean
 */
@Entity
@Table(name="staff")
public class StaffBean {
    @Id
    private int id;
    private String account;
    private String pwd;
    private String name;

    public StaffBean() {
    }

    public int getId() {
        return id;
    }

    public StaffBean(int id) {
        this.id = id;
    }

    public StaffBean(String account, String pwd, String name) {
        this.account = account;
        this.pwd = pwd;
        this.name = name;
    }

    public StaffBean(int id, String account, String pwd, String name) {
        this.id = id;
        this.account = account;
        this.pwd = pwd;
        this.name = name;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
