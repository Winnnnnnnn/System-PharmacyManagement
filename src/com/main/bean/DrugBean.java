package com.main.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Author: 丁凡
 * @Date: Create in 23:51 2019/4/20
 * @Description: 药品Bean
 */
@Entity
@Table(name="drug")
public class DrugBean {
    @Id
    private int id;
    private String name;
    private String normal;
    private String brand;
    private String specification;
    private String type;
    private String publish;
    private String validity;
    private String number;
    private String suit;
    private String price;
    private String img;
    private int sort;
    private int count;

    public DrugBean() {
    }

    public DrugBean(int id) {
        this.id = id;
    }

    public DrugBean(String name, String normal, String brand, String specification, String type, String publish, String validity, String number, String suit, String price, String img, int sort, int count) {
        this.name = name;
        this.normal = normal;
        this.brand = brand;
        this.specification = specification;
        this.type = type;
        this.publish = publish;
        this.validity = validity;
        this.number = number;
        this.suit = suit;
        this.price = price;
        this.img = img;
        this.sort = sort;
        this.count = count;
    }

    public DrugBean(int id, String name, String normal, String brand, String specification, String type, String publish, String validity, String number, String suit, String price, String img, int sort, int count) {
        this.id = id;
        this.name = name;
        this.normal = normal;
        this.brand = brand;
        this.specification = specification;
        this.type = type;
        this.publish = publish;
        this.validity = validity;
        this.number = number;
        this.suit = suit;
        this.price = price;
        this.img = img;
        this.sort = sort;
        this.count = count;
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

    public String getNormal() {
        return normal;
    }

    public void setNormal(String normal) {
        this.normal = normal;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPublish() {
        return publish;
    }

    public void setPublish(String publish) {
        this.publish = publish;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getSuit() {
        return suit;
    }

    public void setSuit(String suit) {
        this.suit = suit;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
