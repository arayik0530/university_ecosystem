package com.polytech.quiz.service.util.exception;

public class UpcomingQuizNotFoundException extends RuntimeException {
    public UpcomingQuizNotFoundException(String s) {

        super(s);
    }

    public UpcomingQuizNotFoundException(Long id) {
        super("Quiz " + id + " not found.");
    }
}
