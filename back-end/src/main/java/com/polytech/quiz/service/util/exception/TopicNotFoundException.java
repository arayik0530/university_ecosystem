package com.polytech.quiz.service.util.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class TopicNotFoundException extends RuntimeException {



    public TopicNotFoundException(Long id) {
        super("No such topic : " + id);
    }
}
