package com.polytech.quiz.repository;

import com.polytech.quiz.entity.UpcomingQuizEntity;
import com.polytech.quiz.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface UpComingQuizRepository extends JpaRepository<UpcomingQuizEntity, Long> {

    List<UpcomingQuizEntity> findAllByUser(UserEntity userEntity);

    @Query(value = "from UpcomingQuizEntity where deadline< :now")
    List<UpcomingQuizEntity> findAllByDeadline(@Param("now") LocalDateTime localDateTime);

}
