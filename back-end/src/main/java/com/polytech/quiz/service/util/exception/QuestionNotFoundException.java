package com.polytech.quiz.service.util.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class QuestionNotFoundException extends RuntimeException {

    public QuestionNotFoundException(String s) {
        super(s);
    }

    public QuestionNotFoundException(Long id) {
        super("Question " + id + " not found");
    }

}
