package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.BoxItem;
import org.boxproject.models.data.BoxItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/search")
public class SearchController {
        
        @Autowired
        private BoxItemRepository boxItemRepository;

        @RequestMapping("")
        public String search() {
                return List<BoxItem>;
                return boxItemRepository.findAll();
        }

        @PostMapping("Results")
        public String searchResults() {
                return "searchResults";
        }
}


/*@GetMapping
public Iterable<Box> retrieveBoxes() throws Exception {
        final BoxUser boxUser = getBoxUser();
        System.out.println("User: " + boxUser);
        for(Box box : boxUser.getBoxes()) {
            System.out.println("User owns box: " + box);
        }
        return boxUser.getBoxes();
    }
    */