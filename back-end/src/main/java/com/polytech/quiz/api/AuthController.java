package com.polytech.quiz.api;

import com.polytech.quiz.dto.user.LoginRequestDto;
import com.polytech.quiz.dto.user.UserRegistrationDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthController {
    void register(UserRegistrationDto registrationDto);

    String login(LoginRequestDto loginRequestDto, HttpServletRequest servletRequest, HttpServletResponse servletResponse);
}
