package org.boxproject.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RegisterResponse {
    @Getter
    private boolean success;
    @Getter
    private String message;
}
