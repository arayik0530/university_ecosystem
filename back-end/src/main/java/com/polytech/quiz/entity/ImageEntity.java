package com.polytech.quiz.entity;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@Table(name = "images")
public class ImageEntity {

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
