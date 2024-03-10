package com.polytech.quiz.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "questions", indexes = {
        @Index(name = "questions_text_IDX", columnList = "text")
})
@Data
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @EqualsAndHashCode.Exclude
    private TopicEntity topic;


    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @EqualsAndHashCode.Exclude
    private Set<AnswerEntity> answers;

    private Boolean isMultiAnswer;

    @OneToMany(mappedBy = "question")
    private List<QuizQuestionEntity> quizQuestions;

    @Override
    public String toString() {
        return "QuestionEntity{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", topic=" + topic.getId() +
                ", answers=" + answers +
                '}';
    }
}
