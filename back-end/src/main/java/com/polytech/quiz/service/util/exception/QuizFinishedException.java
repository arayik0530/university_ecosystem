package com.polytech.quiz.service.util.exception;

public class QuizFinishedException extends RuntimeException {
    public QuizFinishedException() {
        super("Quiz already finished.");
    }
}
