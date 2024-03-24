package com.polytech.quiz.repository;

import com.polytech.quiz.dto.quiz.QuizDtoShortInfo;
import com.polytech.quiz.dto.quiz.QuizReportCriteria;
import com.polytech.quiz.entity.QuizEntity;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<QuizEntity, Long>, QuizRepositoryCustom {

    Page<QuizEntity> findAllByTopic(TopicEntity topic, Pageable pageable);

    List<QuizEntity> findAllByUser(UserEntity user);
}
