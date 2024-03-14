package com.polytech.quiz.dto.question;

import com.polytech.quiz.dto.answer.AnswerDto;
import com.polytech.quiz.entity.AnswerEntity;
import com.polytech.quiz.entity.QuestionEntity;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class QuestionDto {

    private Long id;
    private Long quizQuestionId;

    private Long topicId;

    private String text;

    private Set<AnswerDto> answers;

    private Boolean isMultiAnswer;

    private Long nextQuizQuestionId;

    private Long previousQuizQuestionId;

    private Long quizId;

    private Boolean isUsedInQuizzes;
    public QuestionEntity toEntity() {

        QuestionEntity question = new QuestionEntity();
        question.setText(this.text);
//        question.setAnswers(this.getAnswers().stream()
//                .map(AnswerDto::toEntity)
//                .collect(Collectors.toSet()));

        return question;
    }


    public static QuestionDto mapFromEntity(QuestionEntity question) {

        QuestionDto questionDto = new QuestionDto();
        questionDto.setId(question.getId());
        questionDto.setText(question.getText());
        questionDto.setTopicId(question.getTopic().getId());
        Set<AnswerEntity> answerEntities = question.getAnswers();
        long rightAnswerCount = answerEntities.stream().filter(AnswerEntity::getIsRight).count();
        questionDto.setAnswers(answerEntities.stream()
                .map(AnswerDto::mapFromEntity).collect(Collectors.toSet()));
        questionDto.setIsMultiAnswer(rightAnswerCount > 1);
        questionDto.setIsUsedInQuizzes(!question.getQuizQuestions().isEmpty());
        return questionDto;
    }


    public static QuestionDto mapFromEntityLight(QuestionEntity question, Boolean isFinished) {

        QuestionDto questionDto = new QuestionDto();
        questionDto.setId(question.getId());
        questionDto.setText(question.getText());
        questionDto.setTopicId(question.getTopic().getId());
        Set<AnswerEntity> answerEntities = question.getAnswers();
        long rightAnswerCount = answerEntities.stream().filter(AnswerEntity::getIsRight).count();
        questionDto.setAnswers(answerEntities.stream()
                .map(answerEntity -> AnswerDto.mapFromEntityLight(answerEntity, isFinished)).collect(Collectors.toSet()));
        questionDto.setIsMultiAnswer(rightAnswerCount > 1);
        return questionDto;
    }
}
