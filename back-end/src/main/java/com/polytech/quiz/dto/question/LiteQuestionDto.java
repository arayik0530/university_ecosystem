package com.polytech.quiz.dto.question;

import com.polytech.quiz.dto.answer.AnswerDto;
import com.polytech.quiz.entity.AnswerEntity;
import com.polytech.quiz.entity.QuestionEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@EqualsAndHashCode
public class LiteQuestionDto {

    private Long id;

    private String text;

    public LiteQuestionDto(Long id, String text) {
        this.id = id;
        this.text = text;
    }
}
