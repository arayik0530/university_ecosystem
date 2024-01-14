package com.polytech.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polytech.quiz.entity.ConfirmationTokenEntity;

import java.util.Optional;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationTokenEntity, String> {
    Optional<ConfirmationTokenEntity> findByText(String text);
}