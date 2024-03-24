package com.polytech.quiz.dto.quiz;

import com.polytech.quiz.entity.QuizEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class QuizDtoShortInfo {

    private Long id;

    private String topic;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Double successPercent;

    private String userName;

    public QuizDtoShortInfo(Long id, String topic, LocalDateTime startTime, LocalDateTime endTime,
                            double successPercent, String firstName, String lastName) {
        this.id = id;
        this.topic = topic;
        this.startTime = startTime;
        this.endTime = endTime;
        this.successPercent = successPercent;
        this.userName = firstName + " " + lastName;
    }

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
