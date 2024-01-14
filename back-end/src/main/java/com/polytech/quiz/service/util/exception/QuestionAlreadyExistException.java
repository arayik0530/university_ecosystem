package com.polytech.quiz.service.util.exception;

public class QuestionAlreadyExistException extends RuntimeException {

    public QuestionAlreadyExistException(String questionName) {
        super("Question" + questionName + " already exists.");
    }
}
