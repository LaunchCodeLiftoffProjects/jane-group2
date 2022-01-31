package org.boxproject.models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Category extends AbstractEntity{
    private String categoryName;

    @ManyToOne
    private BoxUser boxUser;

    @ManyToOne
    private Box box;

    public Category () {}

    public Category(String categoryName) {
        this.categoryName=categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public BoxUser getBoxUser() {
        return boxUser;
    }

    public void setBoxUser(BoxUser boxUser) {
        this.boxUser = boxUser;
    }

    public Box getBox() {
        return box;
    }

    public void setBox(Box box) {
        this.box = box;
    }
}
