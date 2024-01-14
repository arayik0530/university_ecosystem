package com.polytech.quiz.service.util.exception;

public class QuestionIsAlreadyAnsweredException extends RuntimeException {
    public QuestionIsAlreadyAnsweredException() {
        super("Question is already answered");
    }
}
