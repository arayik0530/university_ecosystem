package com.polytech.quiz.dto.group;

import com.polytech.quiz.entity.GroupEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@EqualsAndHashCode
public class GroupInfoDto {
    private Long id;

    private String name;

    public static GroupInfoDto mapFromEntity(GroupEntity groupEntity) {
        GroupInfoDto groupInfoDto = new GroupInfoDto();
        groupInfoDto.id = groupEntity.getId();
        groupInfoDto.name = groupEntity.getName();

        return groupInfoDto;
    }

    public GroupEntity toEntity() {
        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setId(this.id);
        groupEntity.setName(this.name);
        return groupEntity;
    }
}

