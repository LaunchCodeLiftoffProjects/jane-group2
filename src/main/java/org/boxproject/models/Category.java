package org.boxproject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Category extends AbstractEntity{

    @NotBlank
    @NotNull
    private String categoryName;

    @ManyToOne
    @JsonIgnore
    private BoxUser boxUser;

    @OneToMany
    @JoinColumn(name = "category_id")
    private final List<Box> boxes = new ArrayList<>();

    public Category () {}

    public Category(String categoryName) {
        this.categoryName = categoryName;
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

    public List<Box> getBoxes() {
        return boxes;
    }

}
