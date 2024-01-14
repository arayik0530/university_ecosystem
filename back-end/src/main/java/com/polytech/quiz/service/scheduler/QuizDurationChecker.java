package com.polytech.quiz.service.scheduler;

import com.polytech.quiz.entity.QuizEntity;
import com.polytech.quiz.repository.QuizRepository;
import com.polytech.quiz.service.QuizService;
import com.polytech.quiz.service.util.exception.QuizNotFoundException;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class QuizDurationChecker {
    private static final int MINUTE = 60 * 1000;

    private final QuizService quizService;
    private final QuizRepository quizRepository;

    private List<QuizEntity> quizList = new CopyOnWriteArrayList<>();

    public QuizDurationChecker( @Lazy QuizService quizService, QuizRepository quizRepository) {

        this.quizService = quizService;
        this.quizRepository = quizRepository;
    }

    public void addQuizToCheckingList(QuizEntity quizEntity) {
        quizList.add(quizEntity);
    }



    public void checkDuration() {
        while (true) {
            try {
                Thread.sleep(MINUTE);
            } catch (InterruptedException e) {

            }
            for (QuizEntity quiz : quizList) {

                LocalDateTime expectedFinishTime = quiz.getStartTime().plusMinutes(quiz.getDuration());

                if (LocalDateTime.now().isAfter(expectedFinishTime)) {
                    Long quizId = quiz.getId();
                    quiz = quizRepository.findById(quizId)
                            .orElseThrow(() -> new QuizNotFoundException(quizId));//refreshing information about finish
                    if (quiz.getIsFinished()) {
                        quizList.remove(quiz);
                    } else {
                        quizService.finishQuiz(quizId);
                        quizList.remove(quiz);
                    }
                }

            }


        }
    }
}

