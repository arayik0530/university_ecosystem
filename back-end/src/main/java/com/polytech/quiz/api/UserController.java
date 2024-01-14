package com.polytech.quiz.api;

import com.polytech.quiz.dto.user.PasswordChangingDto;
import com.polytech.quiz.dto.user.UserInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserController {
    List<UserInfoDto> findAllUsers();
    UserInfoDto getById(Long id);

    Page<UserInfoDto> search(String text, Pageable pageable);

    Page<UserInfoDto> getAllUsers(Pageable pageable);

    void remove(Long id);

    void update(UserInfoDto user);

    void changePassword(PasswordChangingDto passwordChangingDto);

    UserInfoDto getMe();

    byte[] getOriginalImage(Long userId);

    byte[] getSmallImage(Long userId);

    void uploadImage(MultipartFile image);

}
