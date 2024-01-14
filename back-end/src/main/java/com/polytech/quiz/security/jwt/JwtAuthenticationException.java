package com.polytech.quiz.security.jwt;

import org.springframework.security.core.AuthenticationException;

public class JwtAuthenticationException extends AuthenticationException {

    public JwtAuthenticationException() {
        super("JWT token is expired or invalid");
    }
}
