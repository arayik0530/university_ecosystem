package com.polytech.quiz.service.impl;

import com.polytech.quiz.dto.topic.TopicDto;
import com.polytech.quiz.dto.topic.TopicOnlyTitleDto;
import com.polytech.quiz.entity.QuestionEntity;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.repository.TopicRepository;
import com.polytech.quiz.service.QuestionService;
import com.polytech.quiz.service.TopicService;
import com.polytech.quiz.service.util.exception.ActionForbiddenException;
import com.polytech.quiz.service.util.exception.TopicAlreadyExistException;
import com.polytech.quiz.service.util.exception.TopicNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
public class TopicServiceImpl implements TopicService {

    @Value("${the.action.can't.be.completed}")
    String notAllowedAction;

    private final TopicRepository topicRepository;

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
    public Page<TopicDto> getAllTopicsContaining(Pageable pageable, String title) {
        Page<TopicEntity> topics;
        if(StringUtils.isBlank(title)) {
            topics = topicRepository.findAll(pageable);
        } else{
            topics = topicRepository.findByTitleContaining(title, pageable);
        }
        return topics.map(TopicDto::mapFromEntity);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        Optional<TopicEntity> byId = topicRepository.findById(id);
        if (byId.isPresent()) {
            List<QuestionEntity> questions = byId.get().getQuestions();
            if(questions.isEmpty()) {
                topicRepository.deleteById(id);
            } else {
                throw  new ActionForbiddenException(notAllowedAction
                        .concat("the topic is used in following questions: ")
                        .concat(
                        questions
                                .stream()
                                .map(QuestionEntity::getText)
                                .collect(Collectors.joining(", "))
                ));
            }
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
