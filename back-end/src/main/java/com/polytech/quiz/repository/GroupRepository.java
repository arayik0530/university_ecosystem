package com.polytech.quiz.repository;

import com.polytech.quiz.entity.GroupEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<GroupEntity, Long> {
    @Query(value = "from GroupEntity as groupEntity where groupEntity.name like %?1%")
    Page<GroupEntity> searchByName(String name, Pageable pageable);

    @Query("SELECT g FROM GroupEntity g JOIN g.users u " +
                  "WHERE LOWER(g.name) LIKE LOWER(CONCAT('%', ?1, '%')) " +
                  "AND (LOWER(u.firstName) LIKE LOWER(CONCAT('%', ?2, '%')) " +
                  "OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', ?2, '%')))")
    Page<GroupEntity> findByNameContaining(String name, String username, Pageable pageable);

    Optional<GroupEntity> findByName(String name);

    @Query("SELECT new GroupEntity (g.id, g.name) FROM GroupEntity g")
    List<GroupEntity> getAllLiteGroups();
}

