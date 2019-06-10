package com.main.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Author: 丁凡
 * @Date: Create in 23:59 2019/4/20
 * @Description: 分类Bean
 */
@Entity
@Table(name="sort")
public class SortBaen {
    @Id
    private int id;
    private String name;

    public SortBaen() {
    }

    public SortBaen(int id) {
        this.id = id;
    }

    public SortBaen(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public SortBaen(String name) {
        this.name = name;
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
}
