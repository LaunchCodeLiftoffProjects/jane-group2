package org.boxproject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class Box extends AbstractEntity {

    @NotNull
    @Getter
    @Setter
    private String labelName;

    @ManyToOne
    @Getter
    @Setter
    @JsonIgnore
    private BoxUser boxUser;

    public Box() {}

    public Box(String labelName) {
        this.labelName = labelName;
    }
}
