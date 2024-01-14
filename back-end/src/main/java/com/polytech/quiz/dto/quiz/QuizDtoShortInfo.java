package com.polytech.quiz.dto.quiz;

import com.polytech.quiz.entity.QuizEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuizDtoShortInfo {

    private Long id;

    private String topic;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Double successPercent;


    public static QuizDtoShortInfo mapFromEntity(QuizEntity quiz) {
        QuizDtoShortInfo quizDtoShortInfo = new QuizDtoShortInfo();

        quizDtoShortInfo.setId(quiz.getId());
        quizDtoShortInfo.setTopic(quiz.getTopic().getTitle());
        quizDtoShortInfo.setSuccessPercent(quiz.getSuccessPercent());
        quizDtoShortInfo.setStartTime(quiz.getStartTime());
        quizDtoShortInfo.setEndTime(quiz.getEndTime());

        return quizDtoShortInfo;
    }

}
