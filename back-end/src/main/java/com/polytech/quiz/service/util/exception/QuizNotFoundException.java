package com.polytech.quiz.service.util.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="No such Quiz")  // 404
public class QuizNotFoundException extends RuntimeException {

    public QuizNotFoundException(String s) {

        super(s);
    }

    public QuizNotFoundException(Long id) {
        super("Quiz " + id + " not found.");
    }
}

