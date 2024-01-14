package com.polytech.quiz.repository;

import com.polytech.quiz.entity.QuestionEntity;
import com.polytech.quiz.entity.TopicEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {

    @Query(value = "from QuestionEntity as question where lower(question.text) like lower(concat(?1,'%'))")
    Page<QuestionEntity> searchByText(String text, Pageable pageable);

    @Query(value = "from QuestionEntity as question where lower(question.text) = lower( ?1 )")
    QuestionEntity searchByTextExact(String text);

    Page<QuestionEntity> findAllByTopic(TopicEntity topic, Pageable pageable);

    @Query(value = "SELECT  * from questions where topic_id=:topicId " +
            "group by id order by random () limit :questionLimit", nativeQuery = true)
    List<QuestionEntity> generateQuestion(@Param("topicId") Long topicId, @Param("questionLimit") Long questionLimit);
}
