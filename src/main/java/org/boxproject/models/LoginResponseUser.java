package org.boxproject.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoginResponseUser {
    @Getter
    private final String username;
    @Getter
    private final String token;
}