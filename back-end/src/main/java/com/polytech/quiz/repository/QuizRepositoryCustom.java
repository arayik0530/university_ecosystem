package com.polytech.quiz.repository;

import com.polytech.quiz.dto.quiz.QuizDtoShortInfo;
import com.polytech.quiz.dto.quiz.QuizReportCriteria;

import java.util.List;

public interface QuizRepositoryCustom {
    List<QuizDtoShortInfo> findAllByCriteria(QuizReportCriteria reportCriteria);
}
