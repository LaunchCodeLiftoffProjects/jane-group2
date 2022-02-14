package org.boxproject.controllers;

import org.boxproject.models.BoxItem;
import org.boxproject.models.data.BoxItemRepository;
import org.boxproject.models.data.BoxRepository;
import org.boxproject.models.data.BoxUserRepository;
import org.boxproject.models.dto.BoxItemDTO;
import org.boxproject.security.BoxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/boxItems")
public class BoxItemController {

    @Autowired
    private BoxUserService boxUserService;

    @Autowired
    private BoxUserRepository boxUserRepository;

    @Autowired
    private BoxRepository boxRepository;

    @Autowired
    private BoxItemRepository boxItemRepository;

    @PutMapping("{itemId}")
    public ResponseEntity<Optional<BoxItem>> processUpdateBoxItem(@PathVariable Long itemId, @RequestBody BoxItemDTO payload) throws Exception {

        Optional<BoxItem> updatedBoxItemName = boxItemRepository.findById(itemId)
                .map(boxItem -> {
                    boxItem.setItemName(payload.getItemName());
                    boxItem.setItemQuantity(payload.getItemQuantity());
                    return boxItemRepository.save(boxItem);
                });

        return ResponseEntity.ok(updatedBoxItemName);
    }

    @DeleteMapping("{itemId}")
    public @ResponseBody String processBoxItemDeletion(@PathVariable Long itemId) throws Exception {

        boxItemRepository.deleteById(itemId);

        return "Item deleted";
    }

}
