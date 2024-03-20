package com.polytech.quiz.entity;

import com.polytech.quiz.entity.enums.UserRole;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
 @Setter
// @RequiredArgsConstructor
 @EqualsAndHashCode
@Table(name = "users", indexes = {
        @Index(name = "users_first_name_IDX", columnList = "first_name"),
        @Index(name = "users_last_name_IDX", columnList = "last_name"),
        @Index(name = "users_email_IDX", columnList = "e_mail", unique = true)
})
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "e_mail", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", unique = true, length = 15)
    private String phone;

    @Column(name = "password", nullable = false)
    private String password;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "group_users",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "group_id")})
    private Set<GroupEntity> userGroups;

    @OneToOne(fetch = FetchType.LAZY)
    private ImageEntity profileImage;

    @OneToOne(fetch = FetchType.LAZY)
    private SmallImageEntity smallImage;

    @Column(name = "active", nullable = false)
    private Boolean active = Boolean.FALSE;

    @ElementCollection(targetClass = UserRole.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id",
            foreignKey = @ForeignKey(name = "user_id_FK",
                    foreignKeyDefinition = " foreign key" +
                            " (user_id) references users " +
                            "on delete cascade"
            )))
    @Enumerated(EnumType.STRING)
    private Set<UserRole> roles = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<UpcomingQuizEntity> upcomingQuizes;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<QuizEntity> quizes;

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", active=" + active +
                ", roles=" + roles +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserEntity)) return false;
        UserEntity that = (UserEntity) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getFirstName(), that.getFirstName()) &&
                Objects.equals(getLastName(), that.getLastName()) &&
                Objects.equals(getEmail(), that.getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getFirstName(), getLastName(), getEmail());
    }
}
