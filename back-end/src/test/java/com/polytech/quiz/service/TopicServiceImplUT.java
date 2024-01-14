package com.polytech.quiz.service;

import com.polytech.quiz.dto.topic.TopicDto;
import com.polytech.quiz.dto.topic.TopicOnlyTitleDto;
import com.polytech.quiz.entity.TopicEntity;
import com.polytech.quiz.repository.TopicRepository;
import com.polytech.quiz.service.impl.TopicServiceImpl;
import com.polytech.quiz.service.util.exception.TopicAlreadyExistException;
import com.polytech.quiz.service.util.exception.TopicNotFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@RunWith(MockitoJUnitRunner.class)
public class TopicServiceImplUT {
    @Mock
    TopicRepository topicRepositoryMock;

    @InjectMocks
    TopicServiceImpl topicService;

    protected static TopicEntity getTopicEntity() {
        final TopicEntity topicEntity = new TopicEntity();
        topicEntity.setTitle("title");
        topicEntity.setId(1L);
        return topicEntity;
    }


    @Test
    public void test_findById_success() {
        final TopicEntity topicEntity = getTopicEntity();
        when(topicRepositoryMock.findById(1L)).thenReturn(Optional.of(topicEntity));
        final TopicDto topicDto = topicService.findById(1L);
        assertEquals(topicDto.getId(), topicEntity.getId());
    }

    @Test
    public void test_findById_errorCase() {
        when(topicRepositoryMock.findById(-1L)).thenReturn(Optional.empty());
        assertThrows(TopicNotFoundException.class, () -> topicService.findById(-1L));
    }

    @Test
    public void test_findByTitle_success() {
        when(topicRepositoryMock.searchByTitle(any(),any()))
                .thenReturn(new PageImpl<>(Collections.singletonList(getTopicEntity())));
        final Page<TopicDto> topicDtos = topicService.searchByTitle("a", Pageable.unpaged());
        verify(topicRepositoryMock, times(1)).searchByTitle(any(), any());
        assertEquals(topicDtos.getContent().get(0).getTitle(), getTopicEntity().getTitle());
    }

    @Test
    public void test_getAllTopics() {
        when(topicRepositoryMock.findAll(any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.singletonList(getTopicEntity())));
        final Page<TopicDto> topicDtos = topicService.getAllTopics(Pageable.unpaged());

        verify(topicRepositoryMock, times(1)).findAll(any(Pageable.class));
        assertEquals(topicDtos.getContent().get(0).getTitle(), getTopicEntity().getTitle());
    }


    @Test
    public void test_remove_success() {
        final TopicEntity topicEntity = getTopicEntity();
        when(topicRepositoryMock.findById(1L)).thenReturn(Optional.of(topicEntity));
        topicService.remove(1L);
        verify(topicRepositoryMock, times(1)).deleteById(any());
    }

    @Test
    public void test_remove_errorCase() {
        when(topicRepositoryMock.findById(-1L)).thenReturn(Optional.empty());
        assertThrows(TopicNotFoundException.class, () -> topicService.findById(-1L));
        verify(topicRepositoryMock, times(0)).deleteById(any());
    }

    @Test
    public void test_update_success() {
        final TopicEntity topicEntity = getTopicEntity();
        final TopicDto topic = new TopicDto();
        topic.setId(1L);


        when(topicRepositoryMock.findById(1L)).thenReturn(Optional.of(topicEntity));
        topicService.update(topic);
        verify(topicRepositoryMock, times(1)).save(any());
    }

    @Test
    public void test_update_errorCase() {
        when(topicRepositoryMock.findById(-1L)).thenReturn(Optional.empty());
        final TopicDto topic = new TopicDto();
        topic.setId(-1L);
        assertThrows(TopicNotFoundException.class, () -> topicService.update(topic));
        verify(topicRepositoryMock, times(0)).save(any());
    }

    @Test
    public void test_create_success() {
        final TopicOnlyTitleDto topicDto = new TopicOnlyTitleDto();
        topicDto.setTitle("test-title");
        when(topicRepositoryMock.findByTitle(any())).thenReturn(Optional.empty());
        topicService.create(topicDto);

        verify(topicRepositoryMock, times(1)).save(any());
    }

    @Test
    public void test_create_errorCase() {
        final TopicOnlyTitleDto topicDto = new TopicOnlyTitleDto();
        topicDto.setTitle("test-title");
        when(topicRepositoryMock.findByTitle(any())).thenReturn(Optional.of(getTopicEntity()));

        assertThrows(TopicAlreadyExistException.class, () -> topicService.create(topicDto));
    }


}
