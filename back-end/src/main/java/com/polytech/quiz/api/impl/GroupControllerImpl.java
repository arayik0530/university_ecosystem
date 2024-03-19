package com.polytech.quiz.api.impl;

import com.polytech.quiz.api.GroupController;
import com.polytech.quiz.dto.group.GroupInfoDto;
import com.polytech.quiz.dto.topic.TopicDto;
import com.polytech.quiz.dto.topic.TopicOnlyTitleDto;
import com.polytech.quiz.service.GroupService;
import com.polytech.quiz.service.TopicService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/group/")
@CrossOrigin(value = "*")
public class GroupControllerImpl implements GroupController {

    private GroupService groupService;

    public GroupControllerImpl(GroupService groupService) {
        this.groupService = groupService;
    }

    @Override
    @PostMapping("create")
    @PreAuthorize(value = "hasAuthority('ADMIN')")
    public void create(@RequestBody GroupInfoDto groupInfoDtoicDto) {
        groupService.create(groupInfoDtoicDto);
    }

    @Override
    @GetMapping("{id}")
    public GroupInfoDto findById(@PathVariable Long id) {
        return groupService.findById(id);
    }

    @Override
    @GetMapping("search")
    public Page<GroupInfoDto> searchByName(String name, @PageableDefault Pageable pageable) {
        return groupService.searchByName(name, pageable);
    }

    @Override
    @GetMapping("all")
    public Page<GroupInfoDto> getAllGroupsContaining(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable, String name, String username) {
        return groupService.getAllGroupsContaining(pageable, name, username);
    }

    @Override
    @DeleteMapping("{id}")
    @PreAuthorize(value = "hasAuthority('ADMIN')")
    public void remove(@PathVariable Long id) {
        groupService.remove(id);
    }

    @Override
    @PutMapping("update")
    public void update(@RequestBody GroupInfoDto groupInfoDto) {
        groupService.update(groupInfoDto);
    }

    @Override
    @GetMapping("all/lite")
    public List<GroupInfoDto> getAllLiteGroups() {
        return groupService.getAllLiteGroups();
    }
}
