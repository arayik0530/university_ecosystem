package com.polytech.quiz.repository;

import com.polytech.quiz.entity.UserEntity;
import com.polytech.quiz.entity.enums.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query(value = "from UserEntity as user where user.firstName like ?1% and user.lastName like ?2% " +
            "OR user.firstName like ?2% and user.lastName like ?2% " +
            "OR user.firstName like ?1% or user.firstName like ?2% " +
            "OR user.lastName like ?1% or user.lastName like ?2%")
    Page<UserEntity> searchByName(String firstName, String lastName, Pageable pageable);

    Optional<UserEntity> findByEmailIgnoreCase(String email);

    @Query("FROM UserEntity u WHERE :role MEMBER OF u.roles")
    List<UserEntity> findAllLiteByRole(@Param("role") UserRole role);

    @Query("SELECT DISTINCT u FROM UserEntity u JOIN u.userGroups g WHERE :role MEMBER OF u.roles AND g.id = :groupId")
    List<UserEntity> findAllLiteByRoleAndGroup(@Param("role") UserRole role, @Param("groupId") Long groupId);


    @Query(value = "from UserEntity as user where user.id IN :idList")
    List<UserEntity> findAllByIdList(@Param("idList") List<Long> idList);
}

