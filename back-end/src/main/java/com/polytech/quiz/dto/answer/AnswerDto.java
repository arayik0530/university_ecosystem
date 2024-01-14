package com.polytech.quiz.dto.answer;

import com.polytech.quiz.entity.AnswerEntity;
import lombok.Data;

@Data
public class AnswerDto {
    private Long id;
    private String text;

    public AnswerEntity toEntity(){

        AnswerEntity answer = new AnswerEntity();
        answer.setText(this.text);

        return answer;
    }

    public static AnswerDto mapFromEntity(AnswerEntity answerEntity) {
        AnswerDto answerDto = new AnswerDto();

        answerDto.id = answerEntity.getId();
        answerDto.text = answerEntity.getText();

        return answerDto;
    }

}
