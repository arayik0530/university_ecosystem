package com.polytech.quiz.dto.quiz;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class QuizReportCriteria {

    private List<Long> userIdList;

    private Long groupId;

    private Long topicId;

    private LocalDateTime startRange;

    private LocalDateTime endRange;
}
