package com.polytech.quiz.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
@Entity
public class UpcomingQuizEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @EqualsAndHashCode.Exclude
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    @EqualsAndHashCode.Exclude
    private TopicEntity topic;

    @Column(name = "expected_duration")
    private Integer durationInMinutes;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "count", nullable = true)
    private Long count;

    @Column(name = "random_questions")
    private Boolean randomQuestions;

    @OneToMany(fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<QuestionEntity> questions = new ArrayList<>();

    @Override
    public String toString() {
        return "UpcomingQuizEntity{" +
                "id=" + id +
                ", user=" + user.getEmail() +
                ", topic=" + topic.getTitle() +
                ", durationInMinutes=" + durationInMinutes +
                ", deadline=" + deadline +
                '}';
    }
}
