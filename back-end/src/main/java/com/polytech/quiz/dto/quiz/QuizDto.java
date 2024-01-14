package com.polytech.quiz.dto.quiz;

import com.polytech.quiz.entity.QuizEntity;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class QuizDto {

    private Long id;

    private Long userId;

    private Long topicId;

    private List<QuizQuestionDto> questions;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Double successPercent;


    public static QuizDto mapFromEntity(QuizEntity quiz) {
        QuizDto quizDto = new QuizDto();

        quizDto.setId(quiz.getId());
        quizDto.setTopicId(quiz.getTopic().getId());
        quizDto.setQuestions(quiz.getQuizQuestions().stream()
                .map(QuizQuestionDto::mapFromEntity).collect(Collectors.toList()));
        quizDto.setSuccessPercent(quiz.getSuccessPercent());
        quizDto.setStartTime(quiz.getStartTime());
        quizDto.setEndTime(quiz.getEndTime());

        return quizDto;
    }

}
