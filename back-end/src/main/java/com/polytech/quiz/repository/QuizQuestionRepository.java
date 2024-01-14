package com.polytech.quiz.repository;

import com.polytech.quiz.entity.QuizEntity;
import com.polytech.quiz.entity.QuizQuestionEntity;
import org.springframework.data.repository.CrudRepository;

public interface QuizQuestionRepository extends CrudRepository<QuizQuestionEntity, Long> {
    QuizQuestionEntity findFirstByQuizOrderById(QuizEntity quizEntity);
}
