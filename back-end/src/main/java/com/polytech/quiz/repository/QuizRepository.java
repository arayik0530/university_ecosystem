package com.polytech.quiz.repository;

import com.polytech.quiz.entity.QuizEntity;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<QuizEntity, Long> {

    Page<QuizEntity> findAllByTopic(TopicEntity topic, Pageable pageable);

    List<QuizEntity> findAllByUser(UserEntity user);

}
