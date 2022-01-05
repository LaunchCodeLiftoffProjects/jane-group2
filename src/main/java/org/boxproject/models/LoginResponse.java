package org.boxproject.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoginResponse {
    @RequiredArgsConstructor
    public static class User {
        @Getter
        private final String username;
        @Getter
        private final String token;
    }

    @Getter
    private final boolean success;
    @Getter
    private final String message;
    @Getter
    private final User user;
}
