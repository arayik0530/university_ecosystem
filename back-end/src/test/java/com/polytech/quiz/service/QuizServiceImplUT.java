package com.polytech.quiz.service;

import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.dto.quiz.*;
import com.polytech.quiz.entity.*;
import com.polytech.quiz.repository.*;
import com.polytech.quiz.service.impl.QuizServiceImpl;
import com.polytech.quiz.service.scheduler.QuizDurationChecker;
import com.polytech.quiz.service.util.exception.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

import static com.polytech.quiz.service.QuestionServiceImplUT.getAnswerEntity;
import static com.polytech.quiz.service.QuestionServiceImplUT.getQuestionEntity;
import static com.polytech.quiz.service.TopicServiceImplUT.getTopicEntity;
import static com.polytech.quiz.service.UserServiceImplUT.getUserEntity;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;


@RunWith(MockitoJUnitRunner.class)
public class QuizServiceImplUT {

    @Mock
    private UserService userServiceMock;

    @Mock
    private QuizRepository quizRepositoryMock;

    @Mock
    private QuestionService questionServiceMock;

    @Mock
    private TopicRepository topicRepositoryMock;

    @Mock
    private UpComingQuizRepository upComingQuizRepositoryMock;

    @Mock
    private UserRepository userRepositoryMock;

    @Mock
    private QuizQuestionRepository quizQuestionRepositoryMock;

    @Mock
    private QuizDurationChecker quizDurationCheckerMock;

    @Mock
    private AnswerRepository answerRepositoryMock;

    @Mock
    private QuizServiceImpl quizServiceMock;

    @InjectMocks
    private QuizServiceImpl quizService;

    protected static QuizEntity getQuizEntity() {
        final QuizEntity quizEntity = new QuizEntity();
        quizEntity.setId(1L);
        quizEntity.setUser(getUserEntity());
        quizEntity.setTopic(getTopicEntity());
        quizEntity.setStartTime(LocalDateTime.now());
        quizEntity.setDuration(150);
        return quizEntity;
    }

    protected static UpcomingQuizEntity getUpcomingQuizEntity() {
        final UpcomingQuizEntity upcomingQuizEntity = new UpcomingQuizEntity();
        upcomingQuizEntity.setId(1L);
        upcomingQuizEntity.setUser(getUserEntity());
        upcomingQuizEntity.setTopic(getTopicEntity());
        upcomingQuizEntity.setCount(10L);
        upcomingQuizEntity.setDurationInMinutes(100);
        upcomingQuizEntity.setDeadline(LocalDateTime.now().plusMinutes(100));
        return upcomingQuizEntity;
    }

    @Test
    public void test_findById_success() {
        when(quizRepositoryMock.findById(1L)).thenReturn(Optional.of(getQuizEntity()));
        quizService.findById(1L);
        verify(quizRepositoryMock, times(1)).findById(any());
    }

    @Test
    public void test_findById_errorCase() {
        when(quizRepositoryMock.findById(-1L)).thenReturn(Optional.empty());
        assertThrows(QuizNotFoundException.class, () -> quizService.findById(-1L));
    }

    @Test
    public void test_getAllQuizes_success() {
        when(quizRepositoryMock.findAll(any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.singletonList(getQuizEntity())));

        final Page<QuizDto> allQuizes = quizService.getAllQuizes(Pageable.unpaged());


        verify(quizRepositoryMock, times(1)).findAll(any(Pageable.class));
        assertEquals(getQuizEntity().getId(), allQuizes.getContent().get(0).getId());
    }


    @Test
    public void test_getQuizesByTopic_success() {
        when(quizRepositoryMock.findAllByTopic(any(), any()))
                .thenReturn(new PageImpl<>(Collections.singletonList(getQuizEntity())));
        final Page<QuizDto> allQuizes = quizService.getQuizesByTopic(getQuizEntity().getTopic(), Pageable.unpaged());

        verify(quizRepositoryMock, times(1)).findAllByTopic(any(), any());
        assertEquals(allQuizes.getContent().get(0).getId(), getQuizEntity().getId());

    }

    @Test
    public void test_remove_success() {
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.of(getQuizEntity()));
        quizService.remove(1L);
        verify(quizRepositoryMock, times(1)).deleteById(1L);
    }

    @Test
    public void test_remove_errorCase() {
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.empty());
        assertThrows(QuizNotFoundException.class, () -> quizService.remove(1L));
    }

    @Test
    public void test_getQuizesByUserId_success() {
        when(userRepositoryMock.findById(any())).thenReturn(Optional.of(getUserEntity()));
        when(quizRepositoryMock.findAllByUser(any(), any()))
                .thenReturn(new PageImpl<>(Collections.singletonList(getQuizEntity())));

        final Page<QuizDtoShortInfo> allQuizes = quizService.getQuizesByUserId(1L, Pageable.unpaged());
        verify(userRepositoryMock, times(1)).findById(1L);
        verify(quizRepositoryMock, times(1)).findAllByUser(any(), any());
        assertEquals(allQuizes.getContent().get(0).getId(), getQuizEntity().getId());
    }

    @Test
    public void test_getQuizesByUserId_fail() {
        when(userRepositoryMock.findById(any())).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class,
                () -> quizService.getQuizesByUserId(1L, Pageable.unpaged()));

    }



    @Test
    public void test_generateQuiz_fail_NoUpcomingQuiz() {
        when(upComingQuizRepositoryMock.findById(any())).thenReturn(Optional.empty());
        assertThrows(UpcomingQuizNotFoundException.class, () ->
                quizService.generateQuiz(1L));
    }



    @Test
    public void test_attachQuestions() {

        final QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setText("test");
        questionEntity.setId(1L);
        when(questionServiceMock.generateQuestions(any(), any()))
                .thenReturn(Collections.singletonList(questionEntity));

        quizService.attachQuestions(getUpcomingQuizEntity(), getQuizEntity());

        verify(questionServiceMock, times(1))
                .generateQuestions(any(), any());

        verify(quizQuestionRepositoryMock, atLeastOnce())
                .save(any(QuizQuestionEntity.class));

    }

    @Test
    public void test_getFirstQuestion_success() {
        final QuizQuestionEntity quizQuestionEntity = new QuizQuestionEntity();
        quizQuestionEntity.setQuestion(getQuestionEntity());
        quizQuestionEntity.setId(1L);
        when(quizRepositoryMock.findById(any()))
                .thenReturn(Optional.of(getQuizEntity()));

        when(quizQuestionRepositoryMock.findFirstByQuizOrderById(any()))
                .thenReturn(quizQuestionEntity);

        final QuestionDto firstQuestion = quizService.getFirstQuestion(1L);
        verify(quizRepositoryMock, times(1)).findById(any());
        verify(quizQuestionRepositoryMock, times(1)).findFirstByQuizOrderById(any());
        assertEquals(firstQuestion.getQuizQuestionId(), quizQuestionEntity.getId());
    }

    @Test
    public void test_getFirstQuestion_fail_NoQuiz() {
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.empty());

        assertThrows(QuizNotFoundException.class,
                () -> quizService.getFirstQuestion(1L));
        verify(quizQuestionRepositoryMock, times(0))
                .findFirstByQuizOrderById(any());
    }

    @Test
    public void test_getQuizInfo_success() {
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.of(getQuizEntity()));
        final PastQuizInfoDto quizInfo = quizService.getQuizInfo(1L);

        verify(quizRepositoryMock, times(1)).findById(any());
        assertEquals(quizInfo.getId(), getQuizEntity().getId());
    }

    @Test
    public void test_getQuizInfo_fail() {
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.empty());
        assertThrows(QuizNotFoundException.class, () -> quizService.getQuizInfo(1L));
    }

    @Test
    public void test_getUpcomingQuizes_success() {
        when(userRepositoryMock.findById(any())).thenReturn(Optional.of(getUserEntity()));
        when(upComingQuizRepositoryMock.findAllByUser(any(), any())).thenReturn(
                new PageImpl<>(Collections.singletonList(getUpcomingQuizEntity()))
        );
        final Page<UpcomingQuizDto> upcomingQuizes = quizService.getUpcomingQuizes(1L, Pageable.unpaged());

        verify(userRepositoryMock, times(1)).findById(any());

        verify(upComingQuizRepositoryMock, times(1))
                .findAllByUser(any(), any());

        assertEquals(upcomingQuizes.getContent().get(0).getId(),
                getUpcomingQuizEntity().getId());
    }

    @Test
    public void test_getUpcomingQuizes_fail() {
        when(userRepositoryMock.findById(any())).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class,
                () -> quizService.getUpcomingQuizes(1L, Pageable.unpaged()));

        verify(upComingQuizRepositoryMock, times(0)).findAllByUser(any(), any());
    }

    @Test
    public void test_createUpcomingQuiz_success() {
        final UserEntity userEntity = getUserEntity();
        userEntity.setUpcomingQuizes(new ArrayList<>()); //TODO need set this expression in entity class
        when(userRepositoryMock.findById(any())).thenReturn(Optional.of(userEntity));
        when(topicRepositoryMock.findById(any())).thenReturn(Optional.of(getTopicEntity()));

        final UpcomingQuizCreationDto quizCreationDto = new UpcomingQuizCreationDto();
        quizCreationDto.setDeadline(LocalDate.now().plusDays(1));
        quizCreationDto.setDurationInMinutes(120);
        quizCreationDto.setQuestionCount(2L);
        quizCreationDto.setTopicId(1L);
        quizCreationDto.setUserId(1L);

        quizService.createUpcomingQuiz(quizCreationDto);

        verify(upComingQuizRepositoryMock, times(1)).save(any());
        verify(userRepositoryMock, times(1)).save(any());
    }

    @Test
    public void test_createUpcomingQuiz_fail() {
        when(userRepositoryMock.findById(any())).thenReturn(Optional.empty());
        final UpcomingQuizCreationDto quizCreationDto = new UpcomingQuizCreationDto();
        quizCreationDto.setUserId(1L);

        assertThrows(UserNotFoundException.class, () -> quizService.createUpcomingQuiz(quizCreationDto));
        verify(upComingQuizRepositoryMock, times(0)).save(any());
        verify(userRepositoryMock, times(0)).save(any());
    }

    @Test
    public void test_getNextQuestion_success() {
        final QuizQuestionEntity quizQuestionEntity = new QuizQuestionEntity();
        quizQuestionEntity.setQuestion(getQuestionEntity());
        quizQuestionEntity.setId(1L);
        when(quizQuestionRepositoryMock.findById(any())).thenReturn(Optional.of(quizQuestionEntity));
        final QuestionDto nextQuestion = quizService.getNextQuestion(1L);
        verify(quizQuestionRepositoryMock, times(1)).findById(any());
        assertEquals(nextQuestion.getQuizQuestionId(), quizQuestionEntity.getId());
    }

    @Test
    public void test_computePercentage_success() {
        final QuizEntity quizEntity = getQuizEntity();
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.of(quizEntity));

        quizService.computePercentage(1L);
        verify(quizRepositoryMock, times(1)).save(any());
    }

    @Test
    public void test_finishQuiz_success() {
        final QuizEntity quizEntity = getQuizEntity();
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.of(quizEntity));
        quizService.finishQuiz(1L);
        assertTrue(quizEntity.getIsFinished());
        verify(quizRepositoryMock, times(2)).save(any());
    }

    @Test
    public void test_failQuiz() {
        when(quizRepositoryMock.save(any())).thenReturn(getQuizEntity());
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.of(getQuizEntity()));

        when(upComingQuizRepositoryMock.findById(any())).thenReturn(Optional.of(getUpcomingQuizEntity()));
        when(userRepositoryMock.findById(any())).thenReturn(Optional.of(getUserEntity()));

        quizService.failQuiz(1L);
        verify(upComingQuizRepositoryMock, times(1)).deleteById(any());

    }

    @Test
    public void test_answerToQuestion_fail_quizFinished() {
        final QuizQuestionEntity quizQuestionEntity = new QuizQuestionEntity();
        quizQuestionEntity.setQuiz(getQuizEntity());
        quizQuestionEntity.getQuiz().setIsFinished(true);
        final QuestionEntity questionEntity = getQuestionEntity();
        quizQuestionEntity.setQuestion(questionEntity);

        when(quizQuestionRepositoryMock.findById(any())).thenReturn(Optional.of(quizQuestionEntity));

        assertThrows(QuizFinishedException.class, () -> quizService.answerToQuestion(1L,
                Collections.singletonList(1L)));

    }

    @Test
    public void test_answerToQuestion_fail_AlreadyAnswered() {
        final QuizQuestionEntity quizQuestionEntity = new QuizQuestionEntity();
        quizQuestionEntity.setQuiz(getQuizEntity());
        final QuestionEntity questionEntity = getQuestionEntity();
        quizQuestionEntity.setQuestion(questionEntity);
        quizQuestionEntity.getGivenAnswers().add(questionEntity.getAnswers().get(0));

        when(quizQuestionRepositoryMock.findById(any())).thenReturn(Optional.of(quizQuestionEntity));
        when(answerRepositoryMock.findById(any())).thenReturn(Optional.of(getAnswerEntity()));
        assertThrows(QuestionIsAlreadyAnsweredException.class, () -> quizService.answerToQuestion(1L,
                Collections.singletonList(1L)));


    }

    @Test
    public void test_answerToQuestion_success() {
        final QuizQuestionEntity quizQuestionEntity = new QuizQuestionEntity();
        quizQuestionEntity.setQuiz(getQuizEntity());
        final QuestionEntity questionEntity = getQuestionEntity();
        quizQuestionEntity.setQuestion(questionEntity);
        when(answerRepositoryMock.findById(any())).thenReturn(Optional.of(getAnswerEntity()));

        when(quizQuestionRepositoryMock.findById(any())).thenReturn(Optional.of(quizQuestionEntity));
        quizService.answerToQuestion(1L, Collections.singletonList(1L));

        verify(quizQuestionRepositoryMock, times(1)).findById(any());
        verify(answerRepositoryMock, atLeastOnce()).findById(any());
        verify(quizQuestionRepositoryMock, times(1)).save(any());
    }

    @Test
    public void test_answerToQuestion_fail_NoQuizQuestion() {
        when(quizQuestionRepositoryMock.findById(any())).thenReturn(Optional.empty());

        assertThrows(QuizQuestionNotFoundException.class, () -> quizService.answerToQuestion(1L, Collections.singletonList(1L)));
    }

    @Test
    public void test_findByQuizId_success() {
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.of(getQuizEntity()));
        final QuizDtoForLocalStorage byQuizId = quizService.findByQuizId(1L);
        assertEquals(byQuizId.getId(), getQuizEntity().getId());
    }

    @Test
    public void test_findByQuizId_errorCase() {
        when(quizRepositoryMock.findById(any())).thenReturn(Optional.empty());
        assertThrows(QuizNotFoundException.class, () -> quizService.findByQuizId(1L));
    }

}
