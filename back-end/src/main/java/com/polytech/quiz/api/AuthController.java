package com.polytech.quiz.api;

import com.polytech.quiz.dto.user.LoginRequestDto;
import com.polytech.quiz.dto.user.UserRegistrationDto;

public interface AuthController {
    void register(UserRegistrationDto registrationDto);

    String login(LoginRequestDto loginRequestDto);
}
