package com.polytech.quiz.service;

import com.polytech.quiz.dto.user.PasswordChangingDto;
import com.polytech.quiz.dto.user.UserInfoDto;
import com.polytech.quiz.dto.user.UserRegistrationDto;
import com.polytech.quiz.entity.ConfirmationTokenEntity;
import com.polytech.quiz.entity.ImageEntity;
import com.polytech.quiz.entity.SmallImageEntity;
import com.polytech.quiz.entity.UserEntity;
import com.polytech.quiz.entity.enums.UserRole;
import com.polytech.quiz.repository.ConfirmationTokenRepository;
import com.polytech.quiz.repository.ImageRepository;
import com.polytech.quiz.repository.SmallImageRepository;
import com.polytech.quiz.repository.UserRepository;
import com.polytech.quiz.service.impl.UserServiceImpl;
import com.polytech.quiz.service.util.exception.InvalidTokenException;
import com.polytech.quiz.service.util.exception.UserAlreadyExistsException;
import com.polytech.quiz.service.util.exception.UserNotFoundException;
import com.polytech.quiz.service.util.exception.WrongPasswordException;
//import org.junit.Test;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toSet;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplUT {


    @Mock
    UserRepository userRepositoryMock;
    @Mock
    PasswordEncoder passwordEncoderMock;
    @Mock
    ConfirmationTokenRepository tokenRepositoryMock;

    @Mock
    ImageRepository imageRepositoryMock;
    @Mock
    SmallImageRepository smallImageRepositoryMock;

    @Mock
    ImageService imageServiceMock;

    @InjectMocks
    UserServiceImpl userService;

    protected static UserEntity getUserEntity() {
        final UserEntity userEntity = new UserEntity();
        userEntity.setFirstName("f");
        userEntity.setLastName("l");
        userEntity.setId(1L);
        userEntity.setEmail("mail@email.com");
        userEntity.setPassword(new BCryptPasswordEncoder().encode("1234"));
        userEntity.setActive(false);
        userEntity.setPhone("+374(012)345678");

        userEntity.setRoles(
                Stream.of(UserRole.USER,
                        UserRole.ADMIN,
                        UserRole.OBSERVER)
                        .collect((toSet())));

        return userEntity;
    }


    @Test
    public void test_findById_errorCase() {
        when(userRepositoryMock.findById(-1L)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.findById(-1L));
    }

    @Test
    public void test_findById_success() {
        final UserEntity userEntity = new UserEntity();
        userEntity.setId(1L);
        when(userRepositoryMock.findById(1L)).thenReturn(Optional.of(userEntity));
        final UserInfoDto userDto = userService.findById(1L);
        assertEquals(userEntity.getId(), userDto.getId());
    }

    @Test
    public void test_findByEmail_errorCase() {
        when(userRepositoryMock.findByEmail("no-email")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.findByEmail("no-email"));
    }

    @Test
    public void test_findByEmail_success() {
        final UserEntity userEntity = new UserEntity();
        userEntity.setEmail("@email");
        when(userRepositoryMock.findByEmail("@email")).thenReturn(Optional.of(userEntity));
        final UserInfoDto userDto = userService.findByEmail("@email");
        assertEquals(userEntity.getEmail(), userDto.getEmail());
    }

    @Test
    public void test_searchByName_success() {

        final UserEntity userEntity = new UserEntity();
        userEntity.setFirstName("a");
        when(userRepositoryMock.searchByName(any(), any(), any()))
                .thenReturn(new PageImpl<>(Collections.singletonList(userEntity)));


        final Page<UserInfoDto> a = userService.searchByName("a", Pageable.unpaged());
        verify(userRepositoryMock, times(1))
                .searchByName(any(String.class), any(String.class), any(Pageable.class));
        final UserInfoDto userInfoDto = a.getContent().get(0);
        assertEquals(userInfoDto.getFirstName(), userEntity.getFirstName());
    }

    @Test
    public void test_findAllUsers_success() {
        userService.findAllUsers();
        verify(userRepositoryMock, times(1)).findAll();
    }

    @Test
    public void test_removeById_success() {
        when(userRepositoryMock.findById(1L)).thenReturn(Optional.of(new UserEntity()));
        userService.remove(1L);
        verify(userRepositoryMock, atLeastOnce()).deleteById(1L);
    }

    @Test
    public void test_update_success() {
        when(userRepositoryMock.findById(1L)).thenReturn(Optional.of(getUserEntity()));

        final UserInfoDto userInfoDto = UserInfoDto.mapFromEntity(getUserEntity(), false);
        userService.update(userInfoDto);
        verify(userRepositoryMock, atLeastOnce()).save(any());
    }

    @Test
    public void test_changePassword_errorCase() {
        final PasswordChangingDto dto = new PasswordChangingDto();
        final UserEntity userEntity = getUserEntity();
        when(userRepositoryMock.findByEmail(userEntity.getEmail())).thenReturn(Optional.of(userEntity));
        dto.setEmail(userEntity.getEmail());
        dto.setOldPassword("wrong password");
        dto.setNewPassword("2222");
        assertThrows(WrongPasswordException.class, () -> {
            userService.updatePassword(dto);
        });
    }

    @Test
    public void test_changePassword_success() {
        final PasswordChangingDto dto = new PasswordChangingDto();
        final UserEntity userEntity = getUserEntity();
        when(userRepositoryMock.findByEmail(userEntity.getEmail())).thenReturn(Optional.of(userEntity));
        dto.setEmail(userEntity.getEmail());
        dto.setOldPassword("1234");
        dto.setNewPassword("2222");


        when(passwordEncoderMock.matches(matches("1234"), any()))
                .thenReturn(new BCryptPasswordEncoder().matches("1234", userEntity.getPassword()));

        userService.updatePassword(dto);

        verify(passwordEncoderMock, times(1)).matches(any(), any());

        verify(userRepositoryMock, times(1)).save(any(UserEntity.class));
    }

    @Test
    public void test_register_success() {
        when(userRepositoryMock.findByEmail(any())).thenReturn(Optional.empty());
        when(userRepositoryMock.save(any())).thenReturn(getUserEntity());
        final UserEntity userEntity = getUserEntity();
        final UserRegistrationDto registrationDto = new UserRegistrationDto();
        registrationDto.setEmail(userEntity.getEmail());
        registrationDto.setFirstName(userEntity.getFirstName());
        registrationDto.setLastName(userEntity.getLastName());
        registrationDto.setPassword("1234");

        final UserInfoDto register = userService.register(registrationDto);

        assertTrue(register.getRoles().length > 0);//User must have minimum 1 role

        verify(passwordEncoderMock, times(1)).encode(any()); //Password must be encoded
        verify(userRepositoryMock, times(1)).save(any());
    }

    @Test
    public void test_register_errorCase() {
        when(userRepositoryMock.findByEmail(any())).thenReturn(Optional.of(getUserEntity()));
        assertThrows(UserAlreadyExistsException.class, () -> userService.register(new UserRegistrationDto()));
    }

    @Test
    public void test_generateToken_success() {
        when(userRepositoryMock.findByEmail(any())).thenReturn(Optional.of(getUserEntity()));
        when(tokenRepositoryMock.save(any())).thenReturn(new ConfirmationTokenEntity());
        final String generatedToken = userService.generateToken("email@email.com");
        verify(tokenRepositoryMock, times(1)).save(any(ConfirmationTokenEntity.class));
        assertNotNull(generatedToken);
    }

    @Test
    public void test_activateByEmailToken_success() {
        final ConfirmationTokenEntity tokenEntity = new ConfirmationTokenEntity();
        final UserEntity userEntity = getUserEntity();
        tokenEntity.setUser(userEntity);
        when(tokenRepositoryMock.findByText(any())).thenReturn(Optional.of(tokenEntity));
        userService.activateByEmailToken("test");

        assertTrue(userEntity.getActive());
        verify(tokenRepositoryMock, times(1)).delete(any());
        verify(userRepositoryMock, times(1)).save(any());
    }

    @Test
    public void test_activateByEmailToken_throwsException() {
        when(tokenRepositoryMock.findByText(any())).thenReturn(Optional.empty());
        assertThrows(InvalidTokenException.class, () -> userService.activateByEmailToken("test"));
    }

    @Test
    public void test_getOriginalImage_success() {
        final UserEntity userEntity = getUserEntity();
        userEntity.setProfileImage(new ImageEntity());
        when(userRepositoryMock.findById(1L)).thenReturn(Optional.of(userEntity));

        userService.getOriginalImage(1L);
        verify(userRepositoryMock, times(1)).findById(1L);
    }

    @Test
    public void test_getSmallImage_success() {
        final UserEntity userEntity = getUserEntity();
        userEntity.setSmallImage(new SmallImageEntity());
        when(userRepositoryMock.findById(1L)).thenReturn(Optional.of(userEntity));

        userService.getSmallImage(1L);
        verify(userRepositoryMock, times(1)).findById(1L);
    }

    @Test
    public void test_saveImage_success() {
        userService
                .saveImage(new MockMultipartFile("test", "test",
                        "test", "test".getBytes()), 1L);
        verify(imageServiceMock, times(1)).deleteImage(any());
        verify(imageServiceMock, times(1)).saveOriginalImage(any(), any());
        verify(imageServiceMock, times(1)).saveSmallImage(any(), any());
    }

    @Test
    public void test_getAllUsers_success() {
        when(userRepositoryMock.findAll(Pageable.unpaged()))
                .thenReturn(new PageImpl<>(Collections.singletonList(getUserEntity())));

        userService.getAllUsers(Pageable.unpaged());
        verify(userRepositoryMock, times(1)).findAll(Pageable.unpaged());
    }

    @Test
    public void test_findAllUsers_withoutPagination() {
        userService.findAllUsers();
        verify(userRepositoryMock, times(1)).findAll();
    }
}
