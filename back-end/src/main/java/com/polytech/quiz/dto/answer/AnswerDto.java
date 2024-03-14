package com.polytech.quiz.dto.answer;

import com.polytech.quiz.entity.AnswerEntity;
import lombok.*;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class AnswerDto {
    private Long id;
    private String text;
    private boolean rightAnswer;
    private boolean selected;

    public AnswerEntity toEntity(){

        AnswerEntity answer = new AnswerEntity();
        answer.setText(this.text);
        answer.setIsRight(this.rightAnswer);

        return answer;
    }

    public static AnswerDto mapFromEntity(AnswerEntity answerEntity) {
        AnswerDto answerDto = new AnswerDto();

        answerDto.id = answerEntity.getId();
        answerDto.text = answerEntity.getText();
        answerDto.rightAnswer = answerEntity.getIsRight();
        return answerDto;
    }

    public static AnswerDto mapFromEntityLight(AnswerEntity answerEntity, Boolean isFinished) {
        AnswerDto answerDto = new AnswerDto();

        answerDto.id = answerEntity.getId();
        answerDto.text = answerEntity.getText();
        if(isFinished){
            answerDto.setRightAnswer(answerEntity.getIsRight());
        }
        return answerDto;
    }

}
