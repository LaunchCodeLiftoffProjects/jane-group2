package org.boxproject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

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
    @Getter
    @Setter
    private String labelName;

    @Getter
    @Setter
    private String labelColor;

    @ManyToOne
    @Getter
    @Setter
    @JsonIgnore
    private BoxUser boxUser;

    @Getter
    @OneToMany
    @JoinColumn(name = "box_id")
    private final List<BoxItem> boxItems = new ArrayList<>();

    public Box() {}

    public Box(String labelName) {
        this.labelName = labelName;
    }
}
