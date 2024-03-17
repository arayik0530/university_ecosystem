package com.polytech.quiz.service.util.exception;

public class QuizDeadLinePassedException extends RuntimeException {
    public QuizDeadLinePassedException() {
        super("Quiz already finished.");
    }
}
