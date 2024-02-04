package com.polytech.quiz.api.impl;

import com.polytech.quiz.api.QuestionController;
import com.polytech.quiz.dto.question.CreateQuestionDto;
import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/question/")
@CrossOrigin(value = "*")
public class QuestionControllerImpl implements QuestionController {

    private QuestionService questionService;

    public QuestionControllerImpl(QuestionService questionService) {
        this.questionService = questionService;
    }

    @Override
    @GetMapping("{id}")
    public QuestionDto findById(@PathVariable Long id) {
        return questionService.findById(id);
    }

    @Override
    @GetMapping("search")
    public Page<QuestionDto> searchByText(@RequestParam String text, @PageableDefault Pageable pageable) {
        return questionService.searchByText(text, pageable);
    }

    @Override
    @GetMapping("all")
    public Page<QuestionDto> getAllQuestions(@PageableDefault(sort = "id", direction = Sort.Direction.DESC)
                                                           Pageable pageable, String text, Long topicId) {
        return questionService.getAllQuestions(pageable, text, topicId);
    }

    @Override
    @GetMapping("{topic}")
    public Page<QuestionDto> getQuestionsByTopic(@PathVariable TopicEntity topic, @PageableDefault Pageable pageable) {
        return questionService.getQuestionsByTopic(topic, pageable);
    }

    @Override
    @DeleteMapping("{id}")
    @PreAuthorize(value = "hasAuthority('ADMIN')")
    public void remove(@PathVariable Long id) {
        questionService.remove(id);
    }

    @Override
    @PutMapping("update")
    public void update(@RequestBody QuestionDto question) {
        questionService.update(question);
    }

    @Override
    @PostMapping("create")
  //  @PreAuthorize(value = "hasAuthority('ADMIN')")
    public void create(@RequestBody CreateQuestionDto question) {
        questionService.create(question);
    }
}
