package com.polytech.quiz.service.util.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.BAD_REQUEST, reason="Invalid Answer Count")  // 400
public class InvalidAnswerCountException extends RuntimeException {

    public InvalidAnswerCountException(String s) {
        super(s);
    }
}
