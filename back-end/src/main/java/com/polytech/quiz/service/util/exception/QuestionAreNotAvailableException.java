package com.polytech.quiz.service.util.exception;

public class QuestionAreNotAvailableException extends RuntimeException {
    public QuestionAreNotAvailableException() {
        super("Questions are not available.");
    }
}
