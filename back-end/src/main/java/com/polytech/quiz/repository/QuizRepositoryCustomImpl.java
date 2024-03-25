package com.polytech.quiz.repository;

import com.polytech.quiz.dto.quiz.QuizDtoShortInfo;
import com.polytech.quiz.dto.quiz.QuizReportCriteria;
import com.polytech.quiz.entity.GroupEntity;
import com.polytech.quiz.entity.QuizEntity;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.entity.UserEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
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
        List<Predicate> predicates = new ArrayList<>();
        if (reportCriteria.getUserIdList() != null && !reportCriteria.getUserIdList().isEmpty()) {
            Join<QuizEntity, UserEntity> quizEntityUserEntityJoin = root.join("user", JoinType.LEFT);
            predicates.add(quizEntityUserEntityJoin.get("id").in(reportCriteria.getUserIdList()));
        }
        if (reportCriteria.getGroupId() != null) {
            Join<QuizEntity, UserEntity> quizEntityUserEntityJoin = root.join("user", JoinType.LEFT);
            Join<UserEntity, GroupEntity> userEntityGroupEntityJoin = quizEntityUserEntityJoin.join("userGroups", JoinType.LEFT);
            predicates.add(criteriaBuilder.equal(userEntityGroupEntityJoin.get("id"), reportCriteria.getGroupId()));
        }
        if (reportCriteria.getTopicId() != null) {
            Join<QuizEntity, TopicEntity> quizEntityTopicEntityJoin = root.join("topic", JoinType.LEFT);
            predicates.add(criteriaBuilder.equal(quizEntityTopicEntityJoin.get("id"), reportCriteria.getTopicId()));
        }
        if (reportCriteria.getStartRange() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("endTime"), reportCriteria.getStartRange()));
        }
        if (reportCriteria.getEndRange() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("endTime"), reportCriteria.getEndRange()));
        }
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
