package com.polytech.quiz.dto.user;

import com.polytech.quiz.entity.GroupEntity;
import com.polytech.quiz.entity.UserEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class UserInfoDto {
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String[] roles;

    private Long imageId;

    private String password;

    private List<Long> groupIdLIst = new ArrayList<>();


    public static UserInfoDto mapFromEntity(UserEntity userEntity) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.id = userEntity.getId();
        userInfoDto.email = userEntity.getEmail();
        userInfoDto.lastName = userEntity.getLastName();
        userInfoDto.firstName = userEntity.getFirstName();
        userInfoDto.phone = userEntity.getPhone();

        userInfoDto.roles = Stream.of(userEntity.getRoles())
                .map(Object::toString).toArray(String[]::new);

        userInfoDto.imageId = (userEntity.getProfileImage()!= null) ? userEntity.getProfileImage().getId() : null;
        return userInfoDto;
    }

    public static UserInfoDto mapFromEntityLight(UserEntity userEntity) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.id = userEntity.getId();
        userInfoDto.lastName = userEntity.getLastName();
        userInfoDto.firstName = userEntity.getFirstName();

        userInfoDto.setGroupIdLIst(userEntity.getUserGroups().stream().map(GroupEntity::getId).collect(Collectors.toList()));
        return userInfoDto;
    }

    @Override
    public String toString() {
        return "UserInfoDto{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", roles='" + roles + '\'' +
                ", imageId=" + imageId +
                '}';
    }


    public UserEntity toEntity(UserEntity userEntity) {
        userEntity.setEmail(this.email);
        userEntity.setFirstName(this.firstName);
        userEntity.setLastName(this.lastName);
        userEntity.setPhone(this.phone);
        return userEntity;
    }
}
