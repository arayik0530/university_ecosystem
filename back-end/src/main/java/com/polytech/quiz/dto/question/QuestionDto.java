package com.polytech.quiz.dto.question;

import com.polytech.quiz.dto.answer.AnswerDto;
import com.polytech.quiz.entity.QuestionEntity;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class QuestionDto {

    private Long id;
    private Long quizQuestionId;

    private Long topicId;

    private String text;

    private List<AnswerDto> answers;

    private Boolean isMultiAnswer;

    private Long nextQuizQuestionId;

    private Long quizId;

    private Boolean isUsedInQuizzes;
    public QuestionEntity toEntity() {

        QuestionEntity question = new QuestionEntity();
        question.setText(this.text);
        456
                //TODO implement

        return question;
    }


    public static QuestionDto mapFromEntity(QuestionEntity question) {

        QuestionDto questionDto = new QuestionDto();
        questionDto.setId(question.getId());
        questionDto.setText(question.getText());
        questionDto.setTopicId(question.getTopic().getId());
        questionDto.setAnswers(question.getAnswers().stream()
                .map(AnswerDto::mapFromEntity).collect(Collectors.toList()));
        questionDto.setIsMultiAnswer(question.getIsMultiAnswer());
        questionDto.setIsUsedInQuizzes(!question.getQuizQuestions().isEmpty());
        return questionDto;
    }


}
