package com.polytech.quiz.service;

import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.dto.quiz.*;
import com.polytech.quiz.entity.TopicEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QuizService {

    QuizDto findById(Long id);

    Page<QuizDto> getAllQuizes(Pageable pageable);

    Page<QuizDto> getQuizesByTopic(TopicEntity topic, Pageable pageable);

    Long generateQuiz(Long topicId);

    void remove(Long id);

    List<QuizDtoShortInfo> getQuizesByUserId(Long userId);

    @Transactional
    QuestionDto getFirstQuestion(Long quizId);

    PastQuizInfoDto getQuizInfo(Long quizId);

    List<UpcomingQuizDto> getUpcomingQuizes(Long userId, Pageable pageable);

    void createUpcomingQuiz(UpcomingQuizCreationDto quizCreationDto);

    QuestionDto getNextQuestion(Long nextQuestionId);

    QuestionDto getPreviousQuestion(Long previousQuizQuestionId);

    void computePercentage(Long quizId);

    void finishQuiz(Long quizId);

    void failQuiz(Long upcomingQuizId);

    void answerToQuestion(Long questionId, List<Long> answeredIds);

    QuizDtoForLocalStorage findByQuizId(Long id);

    QuestionDto getQuizQuestion(Long quizQuestionId);
}
