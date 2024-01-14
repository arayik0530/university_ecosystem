package com.polytech.quiz.dto.user;

import lombok.Data;

@Data
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
