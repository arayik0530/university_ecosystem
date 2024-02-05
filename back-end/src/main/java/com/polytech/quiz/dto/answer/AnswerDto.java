package com.polytech.quiz.dto.answer;

import com.polytech.quiz.entity.AnswerEntity;
import lombok.Data;

@Data
public class AnswerDto {
    private Long id;
    private String text;
    private boolean isRightAnswer;

    public AnswerEntity toEntity(){

        AnswerEntity answer = new AnswerEntity();
        answer.setText(this.text);
        answer.setIsRight(this.isRightAnswer);

        return answer;
    }

    public static AnswerDto mapFromEntity(AnswerEntity answerEntity) {
        AnswerDto answerDto = new AnswerDto();

        answerDto.id = answerEntity.getId();
        answerDto.text = answerEntity.getText();
        answerDto.isRightAnswer = answerEntity.getIsRight();
        return answerDto;
    }

}
