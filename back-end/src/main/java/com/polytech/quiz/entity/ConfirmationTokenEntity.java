package com.polytech.quiz.entity;

import java.util.UUID;
import javax.persistence.*;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
@Table(name = "confirmation_token")
public class ConfirmationTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;

    @Column(name="text")
    private String text = UUID.randomUUID().toString();


    @OneToOne(targetEntity = UserEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

}