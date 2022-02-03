package org.boxproject.controllers;

import org.boxproject.models.BoxUser;
import org.boxproject.models.Category;
import org.boxproject.models.data.CategoryRepository;
import org.boxproject.models.dto.CategoryDTO;
import org.boxproject.security.BoxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private BoxUserService boxUserService;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public Iterable<Category> retrieveCategories() throws Exception {
        return boxUserService.getBoxUser().getCategories();
    }

    @GetMapping("{categoryId}")
    public Optional<Category> displayCategoryDetails(@PathVariable Long categoryId) throws Exception {
        return categoryRepository.findById(categoryId);
    }

    @PostMapping
    public ResponseEntity<Category> processCreateCategoryForm(@RequestBody CategoryDTO payload) throws Exception {

        final BoxUser boxUser = boxUserService.getBoxUser();
        final Category newCategory = new Category(payload.getCategoryName());

        System.out.println(payload.getCategoryName());

        newCategory.setBoxUser(boxUser);
        categoryRepository.save(newCategory);

        return ResponseEntity.ok(newCategory);
    }

    @DeleteMapping("{categoryId}")
    public @ResponseBody String processBoxDeletion(@PathVariable Long categoryId) throws Exception {

        final List<Category> userCategories = boxUserService.getBoxUser().getCategories();
        final Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (categoryOptional.isPresent() && userCategories.contains(categoryOptional.get())) {
            categoryRepository.deleteById(categoryId);
        }

        return "Box Deleted";
    }

}
