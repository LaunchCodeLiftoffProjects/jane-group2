package org.boxproject.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class Category extends AbstractEntity{

    @NotNull

    @Getter
    @Setter
    private String categoryName;

    @ManyToOne
    @Setter
    BoxUser boxUser;

    @ManyToOne
    Box box;



    public Category () {}

    public Category(String categoryName) {this.categoryName=categoryName;}
}
