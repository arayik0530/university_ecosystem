package com.polytech.quiz.service.util.exception;

public class InactiveUserException extends RuntimeException {
    public InactiveUserException(String s) {
        super(s);
    }
}
