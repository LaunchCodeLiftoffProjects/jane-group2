package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.BoxItem;
import org.boxproject.models.BoxUser;
import org.boxproject.models.data.BoxItemRepository;
import org.boxproject.models.data.BoxUserRepository;
import org.boxproject.models.dto.SearchResultsDTO;
import org.boxproject.security.BoxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;
=======
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
>>>>>>> 08cbca54da5f1b4bf01f35a12edd8512cc7b4aca

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    @Autowired
    private BoxItemRepository boxItemRepository;

    @Autowired
    private BoxUserRepository boxUserRepository;

    @Autowired
    private BoxUserService boxUserService;

    @PostMapping("Results")
    public String searchResults() {
        return "Search Results: ";
    }

    @GetMapping("{term}")
<<<<<<< HEAD
    public SearchResultsDTO searchBoxes(@PathVariable String term) throws Exception {
        System.out.println("Searching for: " + term);
        final BoxUser boxUser = boxUserService.getBoxUser();
=======
    public SearchResultsDTO searchBoxes (@PathVariable String term) throws Exception {
        System.out.println("Searching for: " + term);
        final BoxUser boxUser = getBoxUser();
>>>>>>> 08cbca54da5f1b4bf01f35a12edd8512cc7b4aca
        final SearchResultsDTO searchResultsDTO = new SearchResultsDTO();
        List<Box> boxes = new ArrayList<Box>();
        for(Box box : boxUser.getBoxes()) {
            System.out.println("Items in box: " + box);
            boolean doesBoxContainSearch = false;
            for(BoxItem item : box.getBoxItems()) {
                if (item.getItemName().contains(term)) {
                    doesBoxContainSearch = true;
                }
            }
            if (doesBoxContainSearch) {
                boxes.add(box);
            }
        }
        searchResultsDTO.result = boxes;
        return searchResultsDTO;
    }
}