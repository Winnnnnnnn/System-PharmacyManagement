package com.main.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Author: 丁凡
 * @Date: Create in 23:55 2019/4/20
 * @Description: 日志Bean
 */
@Entity
@Table(name="logs")
public class LogBean {
    @Id
    private int id;
    private String detail;
    private String time;

    public LogBean() {
    }

    public LogBean(String detail, String time) {
        this.detail = detail;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
