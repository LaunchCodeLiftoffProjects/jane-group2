package org.boxproject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Box extends AbstractEntity {
    @NotNull
    private String labelName;

    private String labelColor;

    @ManyToOne
    @JsonIgnore
    private BoxUser boxUser;

    @ManyToOne
    private Category category;

    @OneToMany
    @JoinColumn(name = "box_id")
    private final List<BoxItem> boxItems = new ArrayList<>();

    public Box() {}

    public Box(String labelName) {
        this.labelName = labelName;
    }

    public String getLabelName() {
        return labelName;
    }

    public void setLabelName(String labelName) {
        this.labelName = labelName;
    }

    public String getLabelColor() {
        return labelColor;
    }

    public void setLabelColor(String labelColor) {
        this.labelColor = labelColor;
    }

    public BoxUser getBoxUser() {
        return boxUser;
    }

    public void setBoxUser(BoxUser boxUser) {
        this.boxUser = boxUser;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<BoxItem> getBoxItems() {
        return boxItems;
    }
}
