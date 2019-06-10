package com.main.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Author: 丁凡
 * @Date: Create in 23:57 2019/4/20
 * @Description: 订单Bean
 */
@Entity
@Table(name="orders")
public class OrderBean {
    @Id
    private int id;
    private String drug;
    private String info;
    private String time;

    public OrderBean() {
    }

    public OrderBean(String drug, String info, String time) {
        this.drug = drug;
        this.info = info;
        this.time = time;
    }

    public OrderBean(int id, String drug, String info, String time) {
        this.id = id;
        this.drug = drug;
        this.info = info;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDrug() {
        return drug;
    }

    public void setDrug(String drug) {
        this.drug = drug;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
