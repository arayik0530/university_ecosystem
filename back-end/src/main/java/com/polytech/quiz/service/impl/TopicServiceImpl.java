package com.polytech.quiz.service.impl;

import com.polytech.quiz.dto.topic.TopicDto;
import com.polytech.quiz.dto.topic.TopicOnlyTitleDto;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.repository.TopicRepository;
import com.polytech.quiz.service.TopicService;
import com.polytech.quiz.service.util.exception.TopicAlreadyExistException;
import com.polytech.quiz.service.util.exception.TopicNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional(readOnly = true)
public class TopicServiceImpl implements TopicService {

    private TopicRepository topicRepository;

    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    public TopicDto findById(Long id) {
        Optional<TopicEntity> byId = topicRepository.findById(id);
        if (byId.isPresent()) {
            return TopicDto.mapFromEntity(byId.get());
        } else {
            throw new TopicNotFoundException(id);
        }
    }

    @Override
    public Page<TopicDto> searchByTitle(String title, Pageable pageable) {
        Page<TopicEntity> topics = topicRepository.searchByTitle(title, pageable);
        return topics.map(TopicDto::mapFromEntity);
    }

    @Override
    public Page<TopicDto> getAllTopics(Pageable pageable) {

        Page<TopicEntity> topics = topicRepository.findAll(pageable);
        return topics.map(TopicDto::mapFromEntity);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        Optional<TopicEntity> byId = topicRepository.findById(id);
        if (byId.isPresent()) {
            topicRepository.deleteById(id);
        } else {
            throw new TopicNotFoundException(id);
        }
    }

    @Override
    @Transactional
    public void update(TopicDto topic) {
        TopicEntity topicEntity = topicRepository.findById(topic.getId())
                .orElseThrow(() -> new TopicNotFoundException(topic.getId()));

        topicEntity.setTitle(topic.getTitle());
            topicRepository.save(topicEntity);
    }

    @Override
    @Transactional
    public void create(TopicOnlyTitleDto topicDto) {

        TopicEntity topic = topicDto.toEntity();

        Optional<TopicEntity> byTitle = topicRepository.findByTitle(topic.getTitle());

        if (byTitle.isPresent()){
            throw new TopicAlreadyExistException(topic.getTitle());
        }

        topicRepository.save(topic);
    }
}
