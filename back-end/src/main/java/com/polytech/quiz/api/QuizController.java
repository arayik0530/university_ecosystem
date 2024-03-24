package com.polytech.quiz.api;

import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.dto.quiz.*;
import com.polytech.quiz.entity.TopicEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface QuizController {

    QuizDtoForLocalStorage findByQuizId(Long id);

    PastQuizInfoDto findById(Long id);

    Page<QuizDto> getAllQuizes(Pageable pageable);

    Page<QuizDto> getQuizesByTopic(TopicEntity topic, Pageable pageable);

    void remove(Long id);

    QuestionDto startQuiz(Long upComingQuizId);

    QuestionDto openPassedQuiz(@PathVariable Long quizId);

    QuestionDto getNextQuestion(Long nextQuestionId);

    QuestionDto getQuestion(String quizQuestionId);

    QuestionDto getPreviousQuestion(Long previousQuestionId);

    PastQuizInfoDto finishQuiz(Long quizId);

    void answerToQuestion(Long questionId, List<Long> answeredIds);

    List<QuizDtoShortInfo> getQuizesForAuthenticatedUser();

    List<QuizDtoShortInfo> getQuizesForUser(Long userId);

    List<UpcomingQuizDto> getUpcomingQuizForAuthenticatedUser(Pageable pageable);

    List<UpcomingQuizDto> getUpcomingQuizForUser(Long userId, Pageable pageable);

    void createUpcomingQuizForUser(UpcomingQuizCreationDto upcomingQuizCreationDto);

    List<QuizDtoShortInfo> generateReport(QuizReportCriteria reportCriteria);
}
