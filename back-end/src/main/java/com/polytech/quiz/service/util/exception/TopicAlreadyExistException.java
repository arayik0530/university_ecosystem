package com.polytech.quiz.service.util.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.BAD_REQUEST, reason="Topic already exists")
public class TopicAlreadyExistException extends RuntimeException {
    public TopicAlreadyExistException(String s) {
        super("Topic " + s + " already exists.");
    }
}
