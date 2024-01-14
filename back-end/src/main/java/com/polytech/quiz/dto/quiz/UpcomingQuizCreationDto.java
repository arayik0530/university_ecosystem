package com.polytech.quiz.dto.quiz;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UpcomingQuizCreationDto {
    private Long userId;

    private Long topicId;

    private LocalDate deadline;

    private Integer durationInMinutes;

    private Long questionCount;
}
