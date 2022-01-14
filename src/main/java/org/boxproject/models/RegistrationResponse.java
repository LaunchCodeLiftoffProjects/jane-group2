package org.boxproject.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RegistrationResponse {
    @Getter
    private final String message;
}
