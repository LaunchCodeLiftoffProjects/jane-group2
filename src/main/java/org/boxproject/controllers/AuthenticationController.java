package org.boxproject.controllers;

import org.boxproject.models.data.BoxUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class AuthenticationController {

    @Autowired
    BoxUserRepository userRepository;

    private static final String userSessionKey = "user";
}
