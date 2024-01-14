package com.polytech.quiz.dto.quiz;

import com.polytech.quiz.dto.answer.AnswerForPastQuizDto;
import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.entity.QuizQuestionEntity;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class QuizQuestionDto {
    private Long id;
    private Long quizId;
    private QuestionDto questionDto;
    private List<AnswerForPastQuizDto> answers;


    public static QuizQuestionDto mapFromEntity(QuizQuestionEntity entity) {
        QuizQuestionDto quizQuestionDto = new QuizQuestionDto();
        quizQuestionDto.id = entity.getId();
        quizQuestionDto.quizId = entity.getQuiz().getId();
        quizQuestionDto.questionDto = QuestionDto.mapFromEntity(entity.getQuestion());
        quizQuestionDto.answers = entity.getGivenAnswers().stream()
                .map(AnswerForPastQuizDto::mapFromEntity).collect(Collectors.toList());
        return quizQuestionDto;
    }
}
