package com.polytech.quiz.repository;

import com.polytech.quiz.dto.quiz.QuizDtoShortInfo;
import com.polytech.quiz.dto.quiz.QuizReportCriteria;
import com.polytech.quiz.entity.QuizEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

@Service
public class QuizRepositoryCustomImpl implements QuizRepositoryCustom{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<QuizDtoShortInfo> findAllByCriteria(QuizReportCriteria reportCriteria) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<QuizDtoShortInfo> query = criteriaBuilder.createQuery(QuizDtoShortInfo.class);
        Root<QuizEntity> root = query.from(QuizEntity.class);
        query.select(criteriaBuilder.construct(
                QuizDtoShortInfo.class,
                root.get("id"),
                root.get("topic").get("title"),
                root.get("startTime"),
                root.get("endTime"),
                root.get("successPercent"),
                criteriaBuilder.concat(root.get("user").get("firstName"), " "), root.get("user").get("lastName")
        ));

        Predicate predicate = getPredicate(criteriaBuilder, root, reportCriteria);
        if (predicate != null) {
            query.where(predicate);
        }

        TypedQuery<QuizDtoShortInfo> typedQuery = entityManager.createQuery(query);
        return typedQuery.getResultList();
    }

    private Predicate getPredicate(CriteriaBuilder criteriaBuilder, Root<QuizEntity> root, QuizReportCriteria reportCriteria) {
        Predicate predicate = criteriaBuilder.conjunction();
        if (reportCriteria.getUserIdList() != null && !reportCriteria.getUserIdList().isEmpty()) {
            predicate = criteriaBuilder.and(predicate, root.get("user").get("id").in(reportCriteria.getUserIdList()));
        }
        if (reportCriteria.getGroupId() != null) {
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.isMember(reportCriteria.getGroupId(), root.get("user").get("userGroups").get("id")));
        }
        if (reportCriteria.getTopicId() != null) {
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("topic").get("id"), reportCriteria.getTopicId()));
        }
        if (reportCriteria.getStartRange() != null) {
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.greaterThanOrEqualTo(root.get("endTime"), reportCriteria.getStartRange()));
        }
        if (reportCriteria.getEndRange() != null) {
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.lessThanOrEqualTo(root.get("endTime"), reportCriteria.getEndRange()));
        }
        return predicate;
    }
}
