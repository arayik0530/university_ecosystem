package com.polytech.quiz.dto.quiz;

import com.polytech.quiz.entity.UpcomingQuizEntity;
import lombok.*;

import java.time.LocalDate;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class UpcomingQuizDto {
    private Long id;

    private String topic;

    private LocalDate deadline;

    public static UpcomingQuizDto mapFromEntity(UpcomingQuizEntity upcomingQuizEntity) {
        UpcomingQuizDto upcomingQuizDto = new UpcomingQuizDto();
        upcomingQuizDto.setId(upcomingQuizEntity.getId());
        upcomingQuizDto.setTopic(upcomingQuizEntity.getTopic().getTitle());
        upcomingQuizDto.setDeadline(upcomingQuizEntity.getDeadline().toLocalDate());
        return upcomingQuizDto;
    }

}
