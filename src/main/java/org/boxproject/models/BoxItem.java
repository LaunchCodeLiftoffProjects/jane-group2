package org.boxproject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class BoxItem extends AbstractEntity {

    @NotNull
    @Getter
    @Setter
    private String itemName;

    @ManyToOne
    @Getter
    @Setter
    @JsonIgnore
    private Box box;

    public BoxItem() {}

    public BoxItem(String itemName) {
        this.itemName = itemName;
    }
}
