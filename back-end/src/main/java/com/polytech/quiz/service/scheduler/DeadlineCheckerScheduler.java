package com.polytech.quiz.service.scheduler;

import com.polytech.quiz.entity.UpcomingQuizEntity;
import com.polytech.quiz.repository.QuizRepository;
import com.polytech.quiz.repository.UpComingQuizRepository;
import com.polytech.quiz.service.QuizService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Transactional(readOnly = true)
public class DeadlineCheckerScheduler {
    private final UpComingQuizRepository upComingQuizRepository;
    private final QuizRepository quizRepository;
    private final QuizService quizService;

    public DeadlineCheckerScheduler(UpComingQuizRepository upComingQuizRepository, QuizRepository quizRepository,
                                    QuizService quizService) {
        this.upComingQuizRepository = upComingQuizRepository;
        this.quizRepository = quizRepository;
        this.quizService = quizService;
    }

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void checkDeadlines() {
        List<UpcomingQuizEntity> allByDeadline = upComingQuizRepository.findAllByDeadline(LocalDateTime.now());
        allByDeadline.forEach(upcomingQuizEntity -> quizService.failQuiz(upcomingQuizEntity.getId()));

    }
}
