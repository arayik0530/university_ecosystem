package com.polytech.quiz.repository;

import com.polytech.quiz.entity.TopicEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TopicRepository extends JpaRepository<TopicEntity, Long> {

    @Query(value = "from TopicEntity as topic where topic.title like %?1%")
    Page<TopicEntity> searchByTitle(String title, Pageable pageable);

    Page<TopicEntity> findByTitleContaining(String title, Pageable pageable);

    Optional<TopicEntity> findByTitle(String title);
}
