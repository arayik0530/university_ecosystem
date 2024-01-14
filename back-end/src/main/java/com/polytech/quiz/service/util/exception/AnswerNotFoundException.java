package com.polytech.quiz.service.util.exception;

public class AnswerNotFoundException extends RuntimeException{

    public AnswerNotFoundException(Long id) {
        super(id.toString());
    }
}
