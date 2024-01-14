package com.polytech.quiz.api;

import com.polytech.quiz.dto.topic.TopicDto;
import com.polytech.quiz.dto.topic.TopicOnlyTitleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TopicController {


    void create(TopicOnlyTitleDto topicDto);

    TopicDto findById(Long id);

    Page<TopicDto> searchByTitle(String title, Pageable pageable);

    Page<TopicDto> getAllTopics(Pageable pageable);

    void remove(Long id);

    void update(TopicDto topic);
}
