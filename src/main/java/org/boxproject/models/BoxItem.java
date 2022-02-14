package org.boxproject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class BoxItem extends AbstractEntity {

    @NotNull
    @NotBlank
    private String itemName;

    @NotNull
    private int itemQuantity;

    @ManyToOne
    @JsonIgnore
    private Box box;

    public BoxItem() {}

    public BoxItem(String itemName) {
        this.itemName = itemName;
        this.itemQuantity = 1;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(int itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public Box getBox() {
        return box;
    }

    public void setBox(Box box) {
        this.box = box;
    }
}
