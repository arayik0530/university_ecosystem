package com.polytech.quiz.api;

import com.polytech.quiz.dto.question.CreateQuestionDto;
import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.entity.TopicEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface
QuestionController {

    QuestionDto findById(Long id);

    Page<QuestionDto> searchByText(String text, Pageable pageable);

    Page<QuestionDto> getAllQuestions(Pageable pageable, String title, Long topicId);

    Page<QuestionDto> getQuestionsByTopic(TopicEntity topic, Pageable pageable);

    void remove(Long id);

    void update(QuestionDto question);

    void create(CreateQuestionDto question);
}
