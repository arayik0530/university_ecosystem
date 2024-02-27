package com.polytech.quiz.service;

import com.polytech.quiz.dto.user.PasswordChangingDto;
import com.polytech.quiz.dto.user.UserInfoDto;
import com.polytech.quiz.dto.user.UserRegistrationDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    List<UserInfoDto> findAllUsers();

    UserInfoDto findById(Long id);

    UserInfoDto findByEmail(String email);

    Page<UserInfoDto> searchByName(String name, Pageable pageable);

    Page<UserInfoDto> getAllUsers(Pageable pageable);

    void remove(Long id);

    void update(UserInfoDto user);

    void updatePassword(PasswordChangingDto passwordChangingDto);

    UserInfoDto register(UserRegistrationDto registrationDto);

    Long getMe();

    String generateToken(String email);

    void activateByEmailToken(String token);

    byte[] getOriginalImage(Long userId);

    byte[] getSmallImage(Long userId);

    void saveImage(MultipartFile image,Long userId);

    List<UserInfoDto> getAllLiteUsers();
}
