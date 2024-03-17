package com.polytech.quiz.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "answers")
@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class AnswerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "is_right")
    private Boolean isRight = Boolean.FALSE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private QuestionEntity question;

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof AnswerEntity)) return false;
//        AnswerEntity that = (AnswerEntity) o;
//        return Objects.equals(getId(), that.getId());
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(getId());
//    }
}
