package com.polytech.quiz.dto.quiz;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class UpcomingQuizCreationDto {
    private List<Long> userIdList;

    private Long topicId;

    private LocalDate deadline;

    private Integer durationInMinutes;

    private Long questionCount;
}
