package org.boxproject.controllers;

import org.boxproject.models.dto.BasicMessageDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
public class TestController {
    private final Random random = new Random();
    private final String[] strings = new String[] {
            "Backend asks: How do you do?",
            "Backend says: Hello!",
            "Backend says: Welcome to React!",
            "This message came from the backend."
    };

    @GetMapping("/api/test")
    public String test() {
        return strings[random.nextInt(strings.length)];
    }

    // non whitelisted mapping to test authorization
    @GetMapping("/api/testWithAuth")
    public BasicMessageDTO testAuthorized() {
        return new BasicMessageDTO(strings[random.nextInt(strings.length)]);
    }
}