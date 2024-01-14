package com.polytech.quiz.dto.quiz;

import com.polytech.quiz.entity.QuizEntity;
import lombok.Data;

import java.time.LocalDateTime;


@Data
public class QuizDtoForLocalStorage {

    private Long id;

    private LocalDateTime startTime;

    private Integer countOfQuestions;

    private Integer durationInMinutes;


    public static QuizDtoForLocalStorage mapFromEntity(QuizEntity quizEntity) {

        QuizDtoForLocalStorage quizDtoForLocalStorage = new QuizDtoForLocalStorage();

        quizDtoForLocalStorage.setId(quizEntity.getId());
        quizDtoForLocalStorage.setStartTime(quizEntity.getStartTime());
        quizDtoForLocalStorage.setCountOfQuestions(quizEntity.getQuizQuestions().size());
        quizDtoForLocalStorage.setDurationInMinutes(quizEntity.getDuration());

        return quizDtoForLocalStorage;
    }
}
