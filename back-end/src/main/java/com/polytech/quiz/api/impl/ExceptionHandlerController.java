package com.polytech.quiz.api.impl;

import com.polytech.quiz.security.jwt.JwtAuthenticationException;
import com.polytech.quiz.service.util.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@ControllerAdvice
@Component
public class ExceptionHandlerController {

    public void handleFilterExceptions(Throwable throwable, HttpServletResponse response) throws IOException {
        if (throwable instanceof JwtAuthenticationException) {

            ResponseEntity responseEntity = handleJwtAuthException((JwtAuthenticationException) throwable);
            response.setStatus(responseEntity.getStatusCode().value());

            if (responseEntity.getBody() != null) {
                response.getWriter().write(responseEntity.getBody().toString());
            }
        }
    }


    @ExceptionHandler(value = {JwtAuthenticationException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity handleJwtAuthException(JwtAuthenticationException exception) {
        return new ResponseEntity<>("JWT token is expired or invalid.", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {InactiveUserException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity handleInactiveUserException(InactiveUserException exception) {
        return new ResponseEntity<>("User with email " + exception.getMessage() + " is not activated.",
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({
            UserNotFoundException.class,
            UsernameNotFoundException.class,
            TopicNotFoundException.class,
            QuestionNotFoundException.class,
            QuizNotFoundException.class,
            UpcomingQuizNotFoundException.class,
            InvalidTokenException.class,
            QuizQuestionNotFoundException.class,
            AnswerNotFoundException.class,
            QuestionAreNotAvailableException.class})

    public ResponseEntity<String> handleAllNotFoundExceptions(RuntimeException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({UserAlreadyExistsException.class,
            TopicAlreadyExistException.class,
            QuestionAlreadyExistException.class,
            QuizFinishedException.class,
            QuestionIsAlreadyAnsweredException.class
    })
    public ResponseEntity<String> handleAllAlreadyExistExceptions(RuntimeException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidAnswerCountException.class)
    public ResponseEntity<String> handleInvalidAnswerCountException(RuntimeException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ActionForbiddenException.class)
    public ResponseEntity<String> handleActionForbiddenException(RuntimeException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.FORBIDDEN);
    }
}
