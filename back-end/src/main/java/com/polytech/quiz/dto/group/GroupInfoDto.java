package com.polytech.quiz.dto.group;

import com.polytech.quiz.entity.GroupEntity;
import com.polytech.quiz.entity.UserEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@RequiredArgsConstructor
@EqualsAndHashCode
public class GroupInfoDto {
    private Long id;

    private String name;

    private List<Long>  userIdList = new ArrayList<>();

    public static GroupInfoDto mapFromEntity(GroupEntity groupEntity) {
        GroupInfoDto groupInfoDto = new GroupInfoDto();
        groupInfoDto.id = groupEntity.getId();
        groupInfoDto.name = groupEntity.getName();

        groupInfoDto.setUserIdList(groupEntity.getUsers().stream().map(UserEntity::getId).collect(Collectors.toList()));

        return groupInfoDto;
    }

    public GroupEntity toEntity() {
        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setId(this.id);
        groupEntity.setName(this.name);
        return groupEntity;
    }
}

