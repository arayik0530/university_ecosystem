package com.polytech.quiz.api.impl;

import com.polytech.quiz.api.UserController;
import com.polytech.quiz.dto.user.PasswordChangingDto;
import com.polytech.quiz.dto.user.UserInfoDto;
import com.polytech.quiz.service.UserService;
import com.polytech.quiz.service.util.exception.ActionForbiddenException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/user/")
@CrossOrigin(origins = "*")
public class UserControllerImpl implements UserController {
    private UserService userService;

    public UserControllerImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    @GetMapping("{id}")
    @PreAuthorize(value = "isAuthenticated()")
    public UserInfoDto getById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @Override
    @GetMapping("all")
    @PreAuthorize(value = "hasAuthority('ADMIN')")
    public Page<UserInfoDto> getAllUsers(@PageableDefault Pageable pageable) {
        return userService.getAllUsers(pageable);
    }

    @Override
    @GetMapping("all/lite")
    @PreAuthorize(value = "hasAuthority('ADMIN')")
    public List<UserInfoDto> getAllLiteUsers() {
        return userService.getAllLiteUsers();
    }

    @Override
    @GetMapping("search")
    public Page<UserInfoDto> search(@RequestParam String text, @PageableDefault Pageable pageable) {
        return userService.searchByName(text, pageable);
    }

    @Override
    @DeleteMapping("{id}/delete")
    @PreAuthorize(value = "hasAuthority('ADMIN')")
    public void remove(@PathVariable Long id) {
        userService.remove(id);
    }

    @Override
    @PutMapping("update")
    public void update(@RequestBody UserInfoDto userInfoDto) {
        if (userInfoDto.getId().equals(userService.getMe())) {
            userService.update(userInfoDto);
        }else {
            throw new ActionForbiddenException("Invalid request");
        }
    }

    @Override
    @PutMapping("change-password")
    public void changePassword(@RequestBody PasswordChangingDto passwordChangingDto) {
        userService.updatePassword(passwordChangingDto);
    }

    @Override
    @PreAuthorize(value = "isAuthenticated()")
    @GetMapping(value = "getMe")
    public UserInfoDto getMe() {
        return userService.findById(userService.getMe());
    }

    @Override
    @GetMapping(value = "image/{userId}")
    public byte[] getOriginalImage(@PathVariable Long userId) {

        return userService.getOriginalImage(userId);
    }

    @Override
    @GetMapping(value = "small-image/{userId}")
    public byte[] getSmallImage(@PathVariable Long userId) {
        return userService.getSmallImage(userId);
    }

    @Override
    @PostMapping("upload-image")
    public void uploadImage(@RequestBody MultipartFile image) {
        userService.saveImage(image, userService.getMe());
    }

    @Override
    @GetMapping(value = "all-users")
    @PreAuthorize(value = "hasAuthority('ADMIN')")
    public List<UserInfoDto> findAllUsers() {
        return userService.findAllUsers();
    }

    @Override
    @GetMapping(value = "exists-email")
    public boolean existsEmail(@RequestParam String email, @RequestParam Long userId) {

        return userService.existsEmail(email, userId);
    }
}
