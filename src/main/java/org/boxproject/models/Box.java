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
public class Box extends AbstractEntity {

    @NotBlank
    private String labelName;

    @NotBlank
    private String labelColor;

    @NotNull
    private long catId;

    @ManyToOne
    @JsonIgnore
    private BoxUser boxUser;

    @ManyToOne
    @JsonIgnore
    private Category category;

    @OneToMany
    @JoinColumn(name = "box_id")
    private final List<BoxItem> boxItems = new ArrayList<>();

    public Box() {}

    public Box(String labelName, long catId) {
        this.labelName = labelName;
        this.catId = catId;
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

    public long getCatId() {
        return catId;
    }

    public void setCatId(long catId) {
        this.catId = catId;
    }

    public List<BoxItem> getBoxItems() {
        return boxItems;
    }

}
