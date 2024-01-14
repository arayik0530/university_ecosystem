package com.polytech.quiz.service.util.exception;

public class QuizQuestionNotFoundException extends RuntimeException {
    public QuizQuestionNotFoundException(Long id) {
        super("Question in quiz with id " + id.toString() + " not found.");
    }
}
