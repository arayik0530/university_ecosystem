package com.polytech.quiz.service;

import com.polytech.quiz.dto.group.GroupInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GroupService {
    GroupInfoDto findById(Long id);

    Page<GroupInfoDto> searchByName(String name, Pageable pageable);

    Page<GroupInfoDto> getAllGroupsContaining(Pageable pageable, String name, String username);

    void remove(Long id);

    void update(GroupInfoDto group);

    void create(GroupInfoDto groupInfoDto);

    List<GroupInfoDto> getAllLiteGroups();
}
