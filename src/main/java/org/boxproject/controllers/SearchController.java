package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.BoxItem;
import org.boxproject.security.BoxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

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
            boolean match = isMatch(box.getLabelName(), term);
            if(!match) {
                for (BoxItem item : box.getBoxItems()) {
                    if (isMatch(item.getItemName(), term)) {
                        match = true;
                        break;
                    }
                }
            }
            if (match) {
                boxes.add(box);
            }
        }
        System.out.println("Results: " + boxes.size());
        return boxes;
    }

    private boolean isMatch(String input, String term) {
        return Pattern.compile(Pattern.quote(term), Pattern.CASE_INSENSITIVE).matcher(input).find();
    }
}