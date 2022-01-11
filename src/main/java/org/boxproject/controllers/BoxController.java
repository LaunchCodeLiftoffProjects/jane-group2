package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.data.BoxRepository;
import org.boxproject.models.dto.BoxDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/boxes")
public class BoxController {

    @Autowired
    private BoxRepository boxRepository;

    @GetMapping
    public Iterable<Box> retrieveBoxes() {
        return boxRepository.findAll();
    }

    @GetMapping("{boxId}")
    public Optional<Box> displayBoxDetails(@PathVariable String boxId) {
        return boxRepository.findById(Long.parseLong(boxId));
    }

    @PostMapping
    public ResponseEntity<Box> processCreateBoxForm(@RequestBody BoxDTO payload) {
        System.out.println("We got it");
        Box newBox = new Box(payload.getLabelName());
        boxRepository.save(newBox);
        return ResponseEntity.ok(newBox);
    }

    @PutMapping("{boxId}/edit")
    public ResponseEntity<Optional<Box>> processUpdateBoxForm(@PathVariable String boxId, @RequestBody BoxDTO payload) {
        System.out.println("Updated!");

        Optional<Box> updateBox = boxRepository.findById(Long.parseLong(boxId))
                .map(box -> {
                    box.setLabelName(payload.getLabelName());
                    return boxRepository.save(box);
                });

        return ResponseEntity.ok(updateBox);
    }

    @DeleteMapping("{boxId}")
    public @ResponseBody String processBoxDeletion(@PathVariable Long boxId) {
        boxRepository.deleteById(boxId);
        return "Deleted";
    }

}
