package com.polytech.quiz.dto.quiz;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class UpcomingQuizCreationDto {
    private List<Long> userIdList;

    private Long topicId;

    private LocalDate deadline;

    private Integer durationInMinutes;

    private Long questionCount;
}
