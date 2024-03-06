package com.polytech.quiz.api.impl;

import com.polytech.quiz.api.QuizController;
import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.dto.quiz.*;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.service.QuizService;
import com.polytech.quiz.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz/")
@CrossOrigin(value = "*")
@AllArgsConstructor
public class QuizControllerImpl implements QuizController {

    private QuizService quizService;
    private UserService userService;


    @Override
    @GetMapping("{id}/info")
    public QuizDtoForLocalStorage findByQuizId(@PathVariable Long id){
        return quizService.findByQuizId(id);
    }

    @Override
    @GetMapping("{id}")
    public PastQuizInfoDto findById(@PathVariable Long id) {
        return quizService.getQuizInfo(id);
    }

    @Override
    @GetMapping("all")
    public Page<QuizDto> getAllQuizes(@PageableDefault Pageable pageable) {
        return quizService.getAllQuizes(pageable);
    }

    @Override
    @GetMapping("by-topic/{topic}")
    @PreAuthorize(value = "hasAnyAuthority('ADMIN','OBSERVER')")
    public Page<QuizDto> getQuizesByTopic(@PathVariable TopicEntity topic, @PageableDefault Pageable pageable) {
        return quizService.getQuizesByTopic(topic, pageable);
    }
    @Override
    @DeleteMapping("{id}")
    public void remove(@PathVariable Long id) {
        quizService.remove(id);
    }

    @Override
    @GetMapping("start/{upComingQuizId}")
    public QuestionDto startQuiz(@PathVariable Long upComingQuizId) {

        Long quizId = quizService.generateQuiz(upComingQuizId);
        return quizService.getFirstQuestion(quizId);
    }

    @Override
    @GetMapping("next-question")
    public QuestionDto getQuestion(@RequestParam Long nextQuestionId) {
        return quizService.getNextQuestion(nextQuestionId);
    }

    @Override
    @PostMapping("finish")
    public PastQuizInfoDto finishQuiz(@RequestParam Long quizId) {
        quizService.finishQuiz(quizId);
        return quizService.getQuizInfo(quizId);
    }

    @Override
    @PostMapping("{questionId}/question-answers")
    public void answerToQuestion(@PathVariable Long questionId, @RequestBody List<Long> answeredIds) {
        quizService.answerToQuestion(questionId, answeredIds);
    }

    @Override
    @GetMapping("own")
    public List<QuizDtoShortInfo> getQuizesForAuthenticatedUser() {
        return quizService.getQuizesByUserId(userService.getMe());
    }

    @Override
    @GetMapping("user/{userId}")
    @PreAuthorize(value = "hasAnyAuthority('ADMIN','OBSERVER')")
    public List<QuizDtoShortInfo> getQuizesForUser(@PathVariable Long userId) {
        return quizService.getQuizesByUserId(userId);
    }

    @Override
    @GetMapping("upcoming/own")
    public List<UpcomingQuizDto> getUpcomingQuizForAuthenticatedUser(Pageable pageable) {
        return quizService.getUpcomingQuizes(userService.getMe(), pageable);
    }


    @Override
    @GetMapping("upcoming/user/{userId}")
    @PreAuthorize(value = "hasAnyAuthority('ADMIN,OBSERVER')")
    public List<UpcomingQuizDto> getUpcomingQuizForUser(@PathVariable Long userId, @PageableDefault Pageable pageable) {
        return quizService.getUpcomingQuizes(userId, pageable);
    }

    @Override
    @PostMapping("create-upcoming-quiz")
    public void createUpcomingQuizForUser(@RequestBody UpcomingQuizCreationDto upcomingQuizCreationDto) {
        quizService.createUpcomingQuiz(upcomingQuizCreationDto);
    }
}
