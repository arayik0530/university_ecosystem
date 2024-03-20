package com.polytech.quiz.service.impl;

import com.polytech.quiz.dto.user.PasswordChangingDto;
import com.polytech.quiz.dto.user.UserInfoDto;
import com.polytech.quiz.dto.user.UserRegistrationDto;
import com.polytech.quiz.entity.ConfirmationTokenEntity;
import com.polytech.quiz.entity.UserEntity;
import com.polytech.quiz.entity.enums.UserRole;
import com.polytech.quiz.repository.ConfirmationTokenRepository;
import com.polytech.quiz.repository.ImageRepository;
import com.polytech.quiz.repository.SmallImageRepository;
import com.polytech.quiz.repository.UserRepository;
import com.polytech.quiz.security.jwt.JwtUser;
import com.polytech.quiz.service.ImageService;
import com.polytech.quiz.service.UserService;
import com.polytech.quiz.service.util.exception.InvalidTokenException;
import com.polytech.quiz.service.util.exception.UserAlreadyExistsException;
import com.polytech.quiz.service.util.exception.UserNotFoundException;
import com.polytech.quiz.service.util.exception.WrongPasswordException;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private ConfirmationTokenRepository tokenRepository;
    private ImageRepository imageRepository;
    private SmallImageRepository smallImageRepository;
    private ImageService imageService;


    @Override
    public List<UserInfoDto> findAllUsers() {
        List<UserEntity> list = userRepository.findAll();
        return
                list
                        .stream()
                        .map(UserInfoDto::mapFromEntity)
                        .collect(Collectors.toList());
    }

    @Override
    public UserInfoDto findById(Long id) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return UserInfoDto.mapFromEntity(userEntity);
    }

    @Override
    public UserInfoDto findByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
        return UserInfoDto.mapFromEntity(userEntity);
    }

    @Override
    public Page<UserInfoDto> searchByName(String name, Pageable pageable) {
        String[] names = name.split(" ");
        Page<UserEntity> users;
        if (names.length >= 2) {
            users = userRepository.searchByName(names[0], names[1], pageable);

        } else {
            users = userRepository.searchByName(name, name, pageable);
        }
        return users.map(UserInfoDto::mapFromEntity);
    }

    @Override
    public Page<UserInfoDto> getAllUsers(Pageable pageable) {

        Page<UserEntity> users = userRepository.findAll(pageable);

        return users.map(UserInfoDto::mapFromEntity);
    }

    @Override
    @Transactional
    public void remove(Long id) {

        userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(UserInfoDto user) {
        UserEntity userEntity = userRepository.findById(user.getId())
                .orElseThrow(() -> new UserNotFoundException(user.getId()));
        user.toEntity(userEntity);
        if(StringUtils.isNoneBlank(user.getPassword())){
            userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userRepository.save(userEntity);

    }

    @Override
    @Transactional
    public void updatePassword(PasswordChangingDto passwordChangingDto) {

        UserEntity userEntity = userRepository.findByEmail(passwordChangingDto.getEmail())
                .orElseThrow(() -> new UserNotFoundException(passwordChangingDto.getEmail()));
        if (passwordEncoder.matches(passwordChangingDto.getOldPassword(),userEntity.getPassword())) {
            userEntity.setPassword(passwordEncoder.encode(passwordChangingDto.getNewPassword()));
            userRepository.save(userEntity);
        } else {
            throw new WrongPasswordException();
        }
    }

    @Override
    @Transactional
    public UserInfoDto register(UserRegistrationDto registrationDto) {
        Optional<UserEntity> byEmail = userRepository.findByEmail(registrationDto.getEmail());
        if (byEmail.isPresent()) {
            throw new UserAlreadyExistsException(registrationDto.getEmail());
        }

        UserEntity userEntity = registrationDto.toEntity();

        userEntity.getRoles().add(UserRole.USER);

        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));

        UserEntity savedEntity = userRepository.save(userEntity);

        return UserInfoDto.mapFromEntity(savedEntity);
    }

    @Override
    public Long getMe() {
        JwtUser user = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getId();
    }

    @Override
    @Transactional
    public String generateToken(String email) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));

        ConfirmationTokenEntity confirmationToken = new ConfirmationTokenEntity();
        confirmationToken.setUser(userEntity);
        ConfirmationTokenEntity saved = tokenRepository.save(confirmationToken);
        return saved.getText();
    }

    @Override
    @Transactional
    public void activateByEmailToken(String tokenText) {
        ConfirmationTokenEntity token = tokenRepository.findByText(tokenText).orElseThrow(InvalidTokenException::new);
        token.getUser().setActive(true);
        userRepository.save(token.getUser());
        tokenRepository.delete(token);
    }

    @Override
    public byte[] getOriginalImage(Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        if (userEntity.getProfileImage() != null) {
            return userEntity.getProfileImage().getPicture();
        }
        return imageService.getStandardImage();
    }

    @Override
    public byte[] getSmallImage(Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        if (userEntity.getSmallImage() != null) {
            return userEntity.getSmallImage().getPicture();
        }
        return null;
    }

    @Override
    @Transactional
    public void saveImage(MultipartFile image, Long userId) {
        try {
            imageService.deleteImage(userId);
            if(image != null) {
                imageService.saveOriginalImage(image.getBytes(), userId);
                imageService.saveSmallImage(image.getBytes(), userId);
            }
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public List<UserInfoDto> getAllLiteUsers() {
        List<UserEntity> users = userRepository.findAllLiteByRole(UserRole.USER);
        return users.stream().map(UserInfoDto::mapFromEntityLight).collect(Collectors.toList());
    }

    @Override
    public boolean existsEmail(String email, Long userId) {
        Optional<UserEntity> byEmail = userRepository.findByEmail(email);
        if(byEmail.isPresent()){
            UserEntity userEntity = byEmail.get();
            if(!userEntity.getId().equals(userId)){
                return true;
            }
            return false;
        }
        return false;
    }


}
