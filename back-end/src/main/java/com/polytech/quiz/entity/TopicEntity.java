package com.polytech.quiz.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "topics")
@Getter
 @Setter
// @RequiredArgsConstructor
 @EqualsAndHashCode
public class TopicEntity {

    public TopicEntity() {
    }

    public TopicEntity(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "topic", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<QuestionEntity> questions;

}
