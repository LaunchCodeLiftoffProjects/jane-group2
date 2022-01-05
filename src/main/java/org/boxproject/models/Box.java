package org.boxproject.models;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class Box extends AbstractEntity {

    @NotNull
    private String labelName;

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
}
