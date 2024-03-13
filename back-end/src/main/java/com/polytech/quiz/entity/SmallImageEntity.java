package com.polytech.quiz.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
@Table(name = "small_images")
public class SmallImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @Column(name = "picture")
    @Lob
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private byte[] picture;

}
