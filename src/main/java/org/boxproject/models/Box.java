package org.boxproject.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Box extends AbstractEntity {

    @NotNull
    @Getter
    @Setter
    private String labelName;

    @Getter
    @ManyToOne
    private BoxUser boxUser;

    public Box() {}

    public Box(String labelName) {
        this.labelName = labelName;
    }
}
