package com.polytech.quiz.dto.quiz;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class UpcomingQuizCreationDto {
    private List<Long> userIdList;

    private Long topicId;

    private LocalDateTime deadline;

    private Integer durationInMinutes;

    private Long questionCount;

    private List<Long> questionIdLIst;

    private Boolean randomQuestions;
}
