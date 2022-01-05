package org.boxproject.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtTokenResponse {
    @Getter
    private final boolean success;
    @Getter
    private final String message;
    @Getter
    private final String token;
}
