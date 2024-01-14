package com.polytech.quiz.dto.answer;

import com.polytech.quiz.entity.AnswerEntity;
import lombok.Data;

@Data
public class AnswerForPastQuizDto {
    private Long id;
    private String text;
    private Boolean isRight;

    public static AnswerForPastQuizDto mapFromEntity(AnswerEntity answerEntity) {

        AnswerForPastQuizDto answerForPastQuizDto = new AnswerForPastQuizDto();
        answerForPastQuizDto.id = answerEntity.getId();
        answerForPastQuizDto.text = answerEntity.getText();
        answerForPastQuizDto.isRight = answerEntity.getIsRight();

        return answerForPastQuizDto;
    }

}
