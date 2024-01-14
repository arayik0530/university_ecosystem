package com.polytech.quiz.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
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

    @Column(name = "count", nullable = false)
    private Long count;

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
