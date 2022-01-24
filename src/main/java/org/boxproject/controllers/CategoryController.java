package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.BoxUser;
import org.boxproject.models.Category;
import org.boxproject.models.data.CategoryRepository;
import org.boxproject.models.dto.BoxDTO;
import org.boxproject.models.dto.CategoryDTO;
import org.boxproject.security.BoxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CategoryController {
    @Autowired
    private BoxUserService boxUserService;

    @Autowired
    private CategoryRepository categoryRepository;


    @GetMapping
    public Iterable<Category> retrieveCategories() throws Exception {
        final BoxUser boxUser = boxUserService.getBoxUser();
        System.out.println("User: " + boxUser);
        for(Category category : boxUser.getCategories()) {
            System.out.println("User owns categories: " + category);
        }
        return boxUser.getCategories();
    }

    @GetMapping("{categoryId}")
    public Optional<Category> displayCategoryDetails(@PathVariable Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @PostMapping
    public ResponseEntity<Category> processCreateCategoryForm(@RequestBody CategoryDTO payload) throws Exception {
        final BoxUser boxUser = boxUserService.getBoxUser();

        final Category newCategory = new Category(payload.getCategoryName());

        newCategory.setBoxUser(boxUser);

        categoryRepository.save(newCategory);

        return ResponseEntity.ok(newCategory);
    }


}
