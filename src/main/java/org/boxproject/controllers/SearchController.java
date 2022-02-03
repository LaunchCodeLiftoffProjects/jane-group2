package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.BoxItem;
import org.boxproject.security.BoxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    @Autowired
    private BoxUserService boxUserService;

    @GetMapping("{term}")
    public Iterable<Box> searchBoxes(@PathVariable String term) throws Exception {
        System.out.println("Searching for: " + term);
        List<Box> boxes = new ArrayList<>();
        for(Box box : boxUserService.getBoxUser().getBoxes()) {
            boolean doesBoxContainSearch = false;
            for(BoxItem item : box.getBoxItems()) {
                if (item.getItemName().contains(term)) {
                    doesBoxContainSearch = true;
                    break;
                }
            }
            if (doesBoxContainSearch) {
                boxes.add(box);
            }
        }
        System.out.println("Results: " + boxes.size());
        return boxes;
    }
}