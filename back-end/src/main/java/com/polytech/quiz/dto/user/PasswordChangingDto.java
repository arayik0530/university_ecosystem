package com.polytech.quiz.dto.user;

import lombok.*;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class PasswordChangingDto {
    private String email;
    private String oldPassword;
    private String newPassword;

    @Override
    public String toString() {
        return "PasswordChangingDto{" +
                "email='" + email + '\'' +
                ", oldPassword='" + oldPassword + '\'' +
                ", newPassword='" + newPassword + '\'' +
                '}';
    }
}
