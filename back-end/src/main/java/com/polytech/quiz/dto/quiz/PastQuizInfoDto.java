package com.polytech.quiz.dto.quiz;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PastQuizInfoDto {
    private Long id;

    private String topic;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Double successPercent;

    private List<QuizQuestionDto> quizQuestions = new ArrayList<>();

}
