package com.polytech.quiz.dto.user;

import com.polytech.quiz.entity.UserEntity;
import lombok.*;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class LoginRequestDto {
    private String email;

    private String password;
    @Override
    public String toString() {
        return "LoginRequestDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }


    public UserEntity toEntity() {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(this.email);
        userEntity.setPassword(this.password);
        return userEntity;
    }
}
