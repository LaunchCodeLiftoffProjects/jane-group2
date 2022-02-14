package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.BoxItem;
import org.boxproject.models.BoxUser;
import org.boxproject.models.Category;
import org.boxproject.models.data.BoxItemRepository;
import org.boxproject.models.data.BoxRepository;
import org.boxproject.models.data.BoxUserRepository;
import org.boxproject.models.data.CategoryRepository;
import org.boxproject.models.dto.BoxDTO;
import org.boxproject.models.dto.BoxItemDTO;
import org.boxproject.security.BoxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/boxes")
public class BoxController {
    private static final Random random = new Random();

    @Autowired
    private BoxUserService boxUserService;

    @Autowired
    private BoxUserRepository boxUserRepository;

    @Autowired
    private BoxRepository boxRepository;

    @Autowired
    private BoxItemRepository boxItemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public Iterable<Box> retrieveBoxes() throws Exception {
        final BoxUser boxUser = boxUserService.getBoxUser();
        System.out.println("User: " + boxUser);
        for(Box box : boxUser.getBoxes()) {
            System.out.println("User owns box: " + box);
        }
        return boxUser.getBoxes();
    }

    @GetMapping("{boxId}")
    public Optional<Box> displayBoxDetails(@PathVariable Long boxId) {
        return boxRepository.findById(boxId);
    }

    @PostMapping
    public ResponseEntity<Box> processCreateBoxForm(@RequestBody BoxDTO payload) throws Exception {

        final BoxUser boxUser = boxUserService.getBoxUser();
        final Box newBox = new Box(payload.getLabelName(), payload.getCatId());
        final Optional<Category> boxCategory = categoryRepository.findById(payload.getCatId());

        boxCategory.ifPresent(newBox::setCategory);
        newBox.setBoxUser(boxUser);
        newBox.setLabelColor(generateRandomHexColor());

        boxRepository.save(newBox);
        return ResponseEntity.ok(newBox);
    }

    @PostMapping("{boxId}")
    public ResponseEntity<BoxItem> processAddItemToBoxForm(@PathVariable Long boxId, @RequestBody BoxItemDTO payload) throws Exception {

        final Optional<Box> boxToAddItem = boxRepository.findById(boxId);
        final BoxItem newItem = new BoxItem(payload.getItemName());

        boxToAddItem.ifPresent(newItem::setBox);

        boxItemRepository.save(newItem);
        return ResponseEntity.ok(newItem);
    }

    @PutMapping("{boxId}")
    public ResponseEntity<Optional<Box>> processUpdateBoxForm(@PathVariable Long boxId, @RequestBody BoxDTO payload) throws Exception {

        final BoxUser boxUser = boxUserService.getBoxUser();

        Optional<Box> updateBox = boxRepository.findById(boxId)
                .map(box -> {
                    box.setLabelName(payload.getLabelName());
                    return boxRepository.save(box);
                });

        return ResponseEntity.ok(updateBox);
    }

    @DeleteMapping("{boxId}")
    public @ResponseBody String processBoxDeletion(@PathVariable Long boxId) throws Exception {

        final BoxUser boxUser = boxUserService.getBoxUser();
        final Optional<Box> boxOptional = boxRepository.findById(boxId);

        if (boxOptional.isPresent() && boxUser.getBoxes().contains(boxOptional.get())) {
            final Box box = boxOptional.get();

            for(BoxItem item : box.getBoxItems()) {
                boxItemRepository.deleteById(item.getId());
            }

            boxRepository.deleteById(boxId);
        }

        return "Box Deleted";
    }

    @PostMapping("{boxId}/randomizeColor")
    public ResponseEntity<Box> processRandomizeBoxColor(@PathVariable Long boxId) throws Exception {
        final Box box = boxRepository.findById(boxId).orElse(null);

        if (box == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        box.setLabelColor(generateRandomHexColor());
        boxRepository.save(box);

        return ResponseEntity.ok(box);
    }

    // TODO: bound these in a special range, or perhaps hand select colors and pop them from a queue before wrapping the queue
    private String generateRandomHexColor() {
        int rand_num = random.nextInt(0xffffff + 1);
        // format it as hexadecimal string and print
        return String.format("#%06x", rand_num);
    }
}
