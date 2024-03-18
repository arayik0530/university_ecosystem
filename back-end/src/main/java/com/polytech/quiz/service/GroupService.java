package com.polytech.quiz.service;

import com.polytech.quiz.dto.group.GroupInfoDto;
import com.polytech.quiz.dto.topic.TopicDto;
import com.polytech.quiz.dto.topic.TopicOnlyTitleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GroupService {
    GroupInfoDto findById(Long id);

    Page<GroupInfoDto> searchByName(String name, Pageable pageable);

    Page<GroupInfoDto> getAllGroupsContaining(Pageable pageable, String name);

    void remove(Long id);

    void update(GroupInfoDto group);

    void create(GroupInfoDto groupInfoDto);

    List<GroupInfoDto> getAllLiteGroups();
}
