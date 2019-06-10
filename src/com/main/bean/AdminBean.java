package com.main.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Author: 丁凡
 * @Date: Create in 23:40 2019/4/20
 * @Description: 管理员Bean
 */
@Entity
@Table(name="admin")
public class AdminBean {
    @Id
    private int id;
    private String name;
    private String pwd;

    public AdminBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
