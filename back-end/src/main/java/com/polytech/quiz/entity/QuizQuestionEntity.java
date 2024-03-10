package com.polytech.quiz.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
@Table(name = "quiz_questions")
public class QuizQuestionEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private QuizEntity quiz;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private QuestionEntity question;

    @Column(name = "next_question_id")
    private Long nextQuestionId;

    @Column(name = "previous_question_id")
    private Long previousQuestionId;

    @ManyToMany
    @JoinTable(name = "quiz_questions_answers",
            joinColumns = {@JoinColumn(name = "quiz_question_id")},
            inverseJoinColumns = {@JoinColumn(name = "answer_id")})
    private Set<AnswerEntity> givenAnswers = new HashSet<>();

    @Override
    public String toString() {
        return "QuizQuestionEntity{" +
                "id=" + id +
                ", quiz=" + quiz.getId() +
                ", question=" + question.getId() +
                ", givenAnswers=" + givenAnswers +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof QuizQuestionEntity)) return false;
        QuizQuestionEntity that = (QuizQuestionEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }


}
