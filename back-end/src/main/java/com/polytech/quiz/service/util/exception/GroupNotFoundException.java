package com.polytech.quiz.service.util.exception;


public class GroupNotFoundException extends RuntimeException {



    public GroupNotFoundException(Long id) {
        super("No such group : " + id);
    }
}
