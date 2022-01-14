package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.BoxUser;
import org.boxproject.models.data.BoxRepository;
import org.boxproject.models.data.BoxUserRepository;
import org.boxproject.models.dto.BoxDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/boxes")
public class BoxController {

    @Autowired
    private BoxUserRepository boxUserRepository;

    @Autowired
    private BoxRepository boxRepository;

    @GetMapping
    public Iterable<Box> retrieveBoxes() throws Exception {
        final BoxUser boxUser = getBoxUser();
        System.out.println("User: " + boxUser);
        for(Box box : boxUser.getBoxes()) {
            System.out.println("User owns box: " + box);
        }
        return boxUser.getBoxes();
        //return boxRepository.findAll();
    }

    @GetMapping("{boxId}")
    public Optional<Box> displayBoxDetails(@PathVariable Long boxId) {
        return boxRepository.findById(boxId);
    }

    @PostMapping
    public ResponseEntity<Box> processCreateBoxForm(@RequestBody BoxDTO payload) throws Exception {
        final BoxUser boxUser = getBoxUser();

        final Box newBox = new Box(payload.getLabelName());
        newBox.setBoxUser(boxUser);
        boxRepository.save(newBox);

        return ResponseEntity.ok(newBox);
    }

    @PutMapping("{boxId}/edit")
    public ResponseEntity<Optional<Box>> processUpdateBoxForm(@PathVariable Long boxId, @RequestBody BoxDTO payload) throws Exception {
        final BoxUser boxUser = getBoxUser();

        Optional<Box> updateBox = boxRepository.findById(boxId)
                .map(box -> {
                    box.setLabelName(payload.getLabelName());
                    return boxRepository.save(box);
                });

        return ResponseEntity.ok(updateBox);
    }

    @DeleteMapping("{boxId}")
    public @ResponseBody String processBoxDeletion(@PathVariable Long boxId) throws Exception {
        final BoxUser boxUser = getBoxUser();

        boxRepository.deleteById(boxId);
        return "Deleted";
    }

    private BoxUser getBoxUser() throws Exception {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new Exception("User is not authorized!");
        }
        return boxUserRepository.findByUsername(authentication.getName());
    }
}
