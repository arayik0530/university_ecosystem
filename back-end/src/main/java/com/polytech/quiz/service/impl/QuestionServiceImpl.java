package com.polytech.quiz.service.impl;

import com.polytech.quiz.dto.answer.AnswerDto;
import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.entity.AnswerEntity;
import com.polytech.quiz.entity.QuestionEntity;
import com.polytech.quiz.entity.QuizQuestionEntity;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.repository.AnswerRepository;
import com.polytech.quiz.repository.QuestionRepository;
import com.polytech.quiz.repository.TopicRepository;
import com.polytech.quiz.service.QuestionService;
import com.polytech.quiz.service.util.exception.ActionForbiddenException;
import com.polytech.quiz.service.util.exception.QuestionNotFoundException;
import com.polytech.quiz.service.util.exception.TopicNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class QuestionServiceImpl implements QuestionService {

    @Value("${the.action.can't.be.completed}")
    String notAllowedAction;

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
    public Page<QuestionDto> getAllQuestions(Pageable pageable, String text, Long topicId) {
        Page<QuestionEntity> questions;
        if (StringUtils.isBlank(text) && topicId == null) {
            questions = questionRepository.findAll(pageable);
        } else {
            questions = questionRepository.findAllByTextAndTopic(pageable, text, topicId);
        }
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
            List<QuizQuestionEntity> quizQuestions = byId.get().getQuizQuestions();
            if (quizQuestions.isEmpty()) {
                questionRepository.deleteById(id);
            } else {
                throw new ActionForbiddenException(notAllowedAction
                        .concat("the question is used in following quizzes: ")
                        .concat(
                                quizQuestions
                                        .stream()
                                        .map(qQ -> qQ.getQuiz().getTopic().getTitle()
//                                                .concat(": ")TODO
//                                                .concat(qQ.getQuiz().get)
                                        )
                                        .distinct()
                                        .collect(Collectors.joining(", "))
                        ));
            }
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
            questionEntity.setText(question.getText());
            List<Long> answerIdsToRemove = new ArrayList<>();
            List<AnswerEntity> addedAnswerEntityList = new ArrayList<>();

            for (AnswerDto answer : question.getAnswers()) {
                Long answerId = answer.getId();
                if (answerId != null) {
                    boolean isDeleted = true;
                    for (AnswerEntity answerEntity : questionEntity.getAnswers()) {
                        if (answerId.equals(answerEntity.getId())) {
                            isDeleted = false;
                            answerEntity.setIsRight(answer.isRightAnswer());
                            answerEntity.setText(answer.getText());
                            break;
                        }
                    }
                    if (isDeleted) {
                        answerIdsToRemove.add(answer.getId());
                    }
                } else {
                    AnswerEntity answerEntity = new AnswerEntity();
                    answerEntity.setText(answer.getText());
                    answerEntity.setIsRight(answer.isRightAnswer());
                    answerEntity.setQuestion(questionEntity);
                }
            }
            questionEntity.getAnswers().removeIf(a -> answerIdsToRemove.contains(a.getId()));
            questionEntity.getAnswers().addAll(addedAnswerEntityList);
            questionEntity.setTopic(topicRepository.getById(question.getTopicId()));
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
    public void create(QuestionDto question) {
        QuestionEntity questionEntity = question.toEntity();
        Optional<TopicEntity> byId = topicRepository.findById(question.getTopicId());
        if (byId.isPresent()) {
            questionEntity.setTopic(byId.get());
        } else {
            throw new TopicNotFoundException(question.getTopicId());
        }

        for (AnswerDto answer : question.getAnswers()) {
            AnswerEntity answerEntity = new AnswerEntity();
            answerEntity.setIsRight(answer.isRightAnswer());
            answerEntity.setText(answer.getText());
            answerEntity.setQuestion(questionEntity);
            questionEntity.getAnswers().add(answerEntity);
        }

        questionRepository.save(questionEntity);
    }
}
