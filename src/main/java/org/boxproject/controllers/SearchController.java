package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.BoxItem;
import org.boxproject.models.BoxUser;
import org.boxproject.models.data.BoxItemRepository;
import org.boxproject.models.data.BoxUserRepository;
import org.boxproject.models.dto.SearchResultsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/search")
public class SearchController {
    @Autowired
    private BoxItemRepository boxItemRepository;

    @Autowired
    private BoxUserRepository boxUserRepository;

    @PostMapping("Results")
    public String searchResults() {
        return "Search Results: ";
    }
        
    @GetMapping("{term}")
    public SearchResultsDTO searchBoxes (@PathVariable String Search) throws Exception {
        System.out.println("Searching for: " + Search);
        final BoxUser boxUser = getBoxUser();
        final SearchResultsDTO searchResultsDTO = new SearchResultsDTO();
        List<Box> boxes = new ArrayList<Box>();
        for(Box box : boxUser.getBoxes()) {
            System.out.println("Items in box: " + box);
            boolean doesBoxContainSearch = false;
            for(BoxItem item : box.getBoxItems()) {
                if (item.getItemName().contains(Search)) {
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

    @GetMapping("{boxId}")
    private BoxUser getBoxUser() throws Exception {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new Exception("User is not authorized!");
        }
        return boxUserRepository.findByUsername(authentication.getName());
    }
}