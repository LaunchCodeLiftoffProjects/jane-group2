package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.BoxUser;
import org.boxproject.models.Category;
import org.boxproject.models.data.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {


    @Autowired
    private CategoryRepository categoryRepository;


    @GetMapping
    public Iterable<Category> retrieveCategories() throws Exception {
        final BoxUser boxUser = getBoxUser();
        System.out.println("User: " + boxUser);
        for(Category category : boxUser.getCategory()) {
            System.out.println("User owns box: " + category);
        }
        return boxUser.getCategory();
    }
}
