package org.boxproject.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoginResponse {
    @Getter
    private final String message;
    @Getter
    private final LoginResponseUser user;
}