package com.polytech.quiz.dto.answer;

import com.polytech.quiz.entity.AnswerEntity;
import lombok.Data;

@Data
public class CreateAnswerDto {

    private String text;

    private Boolean isRight;

    public AnswerEntity toEntity(){
        AnswerEntity answer = new AnswerEntity();

        answer.setIsRight(this.isRight);
        answer.setText(this.text);
        return answer;
    }
}
