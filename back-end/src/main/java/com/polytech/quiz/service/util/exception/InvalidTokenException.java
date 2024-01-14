package com.polytech.quiz.service.util.exception;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException() {
        super("The token is invalid or broken");
    }
}
