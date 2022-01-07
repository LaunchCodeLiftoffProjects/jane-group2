package org.boxproject.controllers;

import org.boxproject.models.Box;
import org.boxproject.models.data.BoxRepository;
import org.boxproject.models.dto.BoxDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class BoxController {

    @Autowired
    private BoxRepository boxRepository;

    @GetMapping("/api/boxes")
    public Iterable<Box> retrieveBoxes() {
        return boxRepository.findAll();
    }

    @PostMapping("/api/boxes")
    public ResponseEntity<Box> processCreateBoxForm(@RequestBody BoxDTO payload) {
        System.out.println("We got it");
        Box newBox = new Box(payload.getLabelName());
        boxRepository.save(newBox);
        return ResponseEntity.ok(newBox);
    }
}
