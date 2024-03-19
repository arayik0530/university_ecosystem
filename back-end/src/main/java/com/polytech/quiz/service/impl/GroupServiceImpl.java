package com.polytech.quiz.service.impl;

import com.polytech.quiz.dto.group.GroupInfoDto;
import com.polytech.quiz.entity.GroupEntity;
import com.polytech.quiz.entity.UserEntity;
import com.polytech.quiz.repository.GroupRepository;
import com.polytech.quiz.service.GroupService;
import com.polytech.quiz.service.util.exception.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
public class GroupServiceImpl implements GroupService {

    @Value("${the.action.can't.be.completed}")
    String notAllowedAction;

    private final GroupRepository groupRepository;

    public GroupServiceImpl(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Override
    public GroupInfoDto findById(Long id) {
        Optional<GroupEntity> byId = groupRepository.findById(id);
        if (byId.isPresent()) {
            return GroupInfoDto.mapFromEntity(byId.get());
        } else {
            throw new GroupNotFoundException(id);
        }
    }

    @Override
    public Page<GroupInfoDto> searchByName(String name, Pageable pageable) {
        Page<GroupEntity> groupEntities = groupRepository.searchByName(name, pageable);
        return groupEntities.map(GroupInfoDto::mapFromEntity);
    }

    @Override
    public Page<GroupInfoDto> getAllGroupsContaining(Pageable pageable, String name, String username) {
        Page<GroupEntity> groupEntities;
        if (StringUtils.isBlank(name) && StringUtils.isBlank(username)) {
            groupEntities = groupRepository.findAll(pageable);
        } else {
            groupEntities = groupRepository.findByNameContaining(name, username, pageable);
        }
        return groupEntities.map(GroupInfoDto::mapFromEntity);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        Optional<GroupEntity> byId = groupRepository.findById(id);
        if (byId.isPresent()) {
            Set<UserEntity> users = byId.get().getUsers();
            if (users.isEmpty()) {
                groupRepository.deleteById(id);
            } else {
                throw new ActionForbiddenException(notAllowedAction
                        .concat("the group is connected with following users: ")
                        .concat(
                                users
                                        .stream()
                                        .map(u -> u.getFirstName().concat(StringUtils.SPACE).concat(u.getLastName()))
                                        .collect(Collectors.joining(", "))
                        ));
            }
        } else {
            throw new GroupNotFoundException(id);
        }
    }

    @Override
    @Transactional
    public void update(GroupInfoDto groupInfoDto) {
        GroupEntity groupEntity = groupRepository.findById(groupInfoDto.getId())
                .orElseThrow(() -> new GroupNotFoundException(groupInfoDto.getId()));

        groupEntity.setName(groupInfoDto.getName());
        groupRepository.save(groupEntity);
    }

    @Override
    @Transactional
    public void create(GroupInfoDto groupInfoDto) {

        GroupEntity group = groupInfoDto.toEntity();

        Optional<GroupEntity> byName = groupRepository.findByName(group.getName());

        if (byName.isPresent()) {
            throw new GroupAlreadyExistException(group.getName());
        }

        groupRepository.save(group);
    }

    @Override
    public List<GroupInfoDto> getAllLiteGroups() {
        return groupRepository.getAllLiteGroups().stream().map(GroupInfoDto::mapFromEntity).collect(Collectors.toList());
    }

}
