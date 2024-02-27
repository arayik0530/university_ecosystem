package com.polytech.quiz.service;

import com.polytech.quiz.dto.topic.TopicDto;
import com.polytech.quiz.dto.topic.TopicOnlyTitleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TopicService {

    TopicDto findById(Long id);

    Page<TopicDto> searchByTitle(String title, Pageable pageable);

    Page<TopicDto> getAllTopicsContaining(Pageable pageable, String title);

    void remove(Long id);

    void update(TopicDto topic);

    void create(TopicOnlyTitleDto topicDto);

    List<TopicDto> getAllLiteTopics();
}
