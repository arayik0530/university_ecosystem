package com.polytech.quiz.service.util.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.BAD_REQUEST, reason="Group already exists")
public class GroupAlreadyExistException extends RuntimeException {
    public GroupAlreadyExistException(String s) {
        super("Group " + s + " already exists.");
    }
}
