package com.polytech.quiz.service.impl;

import com.polytech.quiz.dto.question.CreateQuestionDto;
import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.entity.QuestionEntity;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.repository.AnswerRepository;
import com.polytech.quiz.repository.QuestionRepository;
import com.polytech.quiz.repository.TopicRepository;
import com.polytech.quiz.service.QuestionService;
import com.polytech.quiz.service.util.exception.QuestionNotFoundException;
import com.polytech.quiz.service.util.exception.TopicNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class QuestionServiceImpl implements QuestionService {

    private QuestionRepository questionRepository;

    private AnswerRepository answerRepository;

    private TopicRepository topicRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository, AnswerRepository answerRepository, TopicRepository topicRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public QuestionDto findById(Long id) {
        Optional<QuestionEntity> byId = questionRepository.findById(id);
        if (byId.isPresent()) {
            return QuestionDto.mapFromEntity(byId.get());
        } else {
            throw new QuestionNotFoundException(id);
        }
    }

    @Override
    public Page<QuestionDto> searchByText(String text, Pageable pageable) {
        Page<QuestionEntity> questions = questionRepository.searchByText(text, pageable);
        return questions.map(QuestionDto::mapFromEntity);
    }

    @Override
    public Page<QuestionDto> getAllQuestions(Pageable pageable) {
        Page<QuestionEntity> questions = questionRepository.findAll(pageable);
        return questions.map(QuestionDto::mapFromEntity);
    }

    @Override
    public Page<QuestionDto> getQuestionsByTopic(TopicEntity topic, Pageable pageable) {
        Page<QuestionEntity> questions = questionRepository.findAllByTopic(topic, pageable);
        return questions.map(QuestionDto::mapFromEntity);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        Optional<QuestionEntity> byId = questionRepository.findById(id);
        if (byId.isPresent()) {
            questionRepository.deleteById(id);
        } else {
            throw new QuestionNotFoundException(id);
        }
    }

    @Override
    @Transactional
    public void update(QuestionDto question) {
        Optional<QuestionEntity> byId = questionRepository.findById(question.getId());
        if (byId.isPresent()) {
            QuestionEntity questionEntity = byId.get();
            questionEntity = question.toEntity();
            questionRepository.save(questionEntity);
        } else {
            throw new QuestionNotFoundException(question.getId());
        }
    }

    @Override
    public List<QuestionEntity> generateQuestions(Long topicId, Long count) {
        return questionRepository.generateQuestion(topicId, count);
    }

    @Override
    @Transactional
    public void create(CreateQuestionDto question) {
        QuestionEntity questionEntity = question.toEntity();
        Optional<TopicEntity> byId = topicRepository.findById(question.getTopicId());
        if(byId.isPresent()){
            questionEntity.setTopic(byId.get());
        }
        else {
            throw new TopicNotFoundException(question.getTopicId());
        }

        questionEntity
                .getAnswers()
                .forEach(answer -> answer.setQuestion(questionEntity));

        questionRepository.save(questionEntity);
    }
}
