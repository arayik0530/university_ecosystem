package com.polytech.quiz.dto.question;

import com.polytech.quiz.dto.answer.CreateAnswerDto;
import com.polytech.quiz.entity.AnswerEntity;
import com.polytech.quiz.entity.QuestionEntity;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CreateQuestionDto {

    private Long topicId;

    private String text;

    private List<CreateAnswerDto> createAnswerDtoList;
    private Boolean isMultiAnswer;


    public QuestionEntity toEntity() {

        QuestionEntity question = new QuestionEntity();
        List<AnswerEntity> answerEntities =
                createAnswerDtoList
                        .stream()
                        .map(CreateAnswerDto::toEntity)
                        .collect(Collectors.toList());

        question.setIsMultiAnswer(isMultiAnswer);
        question.setAnswers(answerEntities);
        question.setText(this.text);
        return question;
    }
}
