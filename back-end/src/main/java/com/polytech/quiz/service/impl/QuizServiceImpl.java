package com.polytech.quiz.service.impl;

import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.dto.quiz.*;
import com.polytech.quiz.entity.*;
import com.polytech.quiz.repository.*;
import com.polytech.quiz.service.QuestionService;
import com.polytech.quiz.service.QuizService;
import com.polytech.quiz.service.UserService;
import com.polytech.quiz.service.scheduler.QuizDurationChecker;
import com.polytech.quiz.service.util.exception.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class QuizServiceImpl implements QuizService {
    private UserService userService;

    private QuizRepository quizRepository;

    private QuestionService questionService;
    private TopicRepository topicRepository;

    private UpComingQuizRepository upComingQuizRepository;
    private UserRepository userRepository;
    private QuizQuestionRepository quizQuestionRepository;
    private QuizDurationChecker quizDurationChecker;
    private AnswerRepository answerRepository;


    @Override
    public QuizDto findById(Long id) {
        QuizEntity quizEntity = quizRepository.findById(id).orElseThrow(() -> new QuizNotFoundException(id));
        return QuizDto.mapFromEntity(quizEntity);

    }

    @Override
    public Page<QuizDto> getAllQuizes(Pageable pageable) {
        Page<QuizEntity> quizes = quizRepository.findAll(pageable);
        return quizes.map(QuizDto::mapFromEntity);
    }

    @Override
    public Page<QuizDto> getQuizesByTopic(TopicEntity topic, Pageable pageable) {
        Page<QuizEntity> quizes = quizRepository.findAllByTopic(topic, pageable);
        return quizes.map(QuizDto::mapFromEntity);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        quizRepository.findById(id).orElseThrow(() -> new QuizNotFoundException(id));
        quizRepository.deleteById(id);
    }

    @Override
    public Page<QuizDtoShortInfo> getQuizesByUserId(Long userId, Pageable pageable) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        Page<QuizEntity> allByUser = quizRepository.findAllByUser(userEntity, pageable);
        return allByUser.map(QuizDtoShortInfo::mapFromEntity);
    }


    @Override
    @Transactional
    public Long generateQuiz(Long upComingQuizId) {
        UpcomingQuizEntity upcomingQuizEntity = upComingQuizRepository.findById(upComingQuizId)
                .orElseThrow(() -> new UpcomingQuizNotFoundException(upComingQuizId));


        Long userId = userService.getMe();
        if (!upcomingQuizEntity.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException();
        }
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException(userId));

        QuizEntity quizEntity = new QuizEntity();
        quizEntity.setUser(userEntity);
        quizEntity.setDuration(upcomingQuizEntity.getDurationInMinutes());
        quizEntity.setTopic(upcomingQuizEntity.getTopic());

        quizRepository.save(quizEntity);
        quizDurationChecker.addQuizToCheckingList(quizEntity);

        attachQuestions(upcomingQuizEntity, quizEntity);
        QuizEntity savedQuizEntity = quizRepository.save(quizEntity);
        upComingQuizRepository.delete(upcomingQuizEntity);
        return savedQuizEntity.getId();
    }

    @Transactional
    public void attachQuestions(UpcomingQuizEntity upcomingQuizEntity, QuizEntity quizEntity) {
        List<QuestionEntity> questionEntities = questionService
                .generateQuestions(upcomingQuizEntity.getTopic().getId(), upcomingQuizEntity.getCount());

        List<QuizQuestionEntity> quizQuestionEntities = quizEntity.getQuizQuestions();
        for (QuestionEntity questionEntity : questionEntities) {
            QuizQuestionEntity quizQuestionEntity = new QuizQuestionEntity();
            quizQuestionEntity.setQuiz(quizEntity);
            quizQuestionEntity.setQuestion(questionEntity);
            quizQuestionRepository.save(quizQuestionEntity);
            quizQuestionEntities.add(quizQuestionEntity);
            quizQuestionRepository.save(quizQuestionEntity);
        }

        for (int x = 0; x < quizQuestionEntities.size()-1; x++) {

            QuizQuestionEntity currentQuizQuestionEntity = quizQuestionEntities.get(x);
            QuizQuestionEntity nextQuizQuestionEntity = quizQuestionEntities.get(x + 1);
            currentQuizQuestionEntity.setNextQuestionId(nextQuizQuestionEntity.getId());
            quizQuestionRepository.save(currentQuizQuestionEntity);
        }

    }


    @Override
    @Transactional
    public QuestionDto getFirstQuestion(Long quizId) {
        QuizEntity quizEntity = quizRepository
                .findById(quizId).orElseThrow(() -> new QuizNotFoundException(quizId));
    QuizQuestionEntity quizQuestionEntity = quizQuestionRepository.findFirstByQuizOrderById(quizEntity);
        QuestionDto questionDto = QuestionDto
                .mapFromEntity(quizQuestionEntity.getQuestion());
        questionDto.setQuizQuestionId(quizQuestionEntity.getId());

        questionDto.setQuizId(quizEntity.getId());
        questionDto.setNextQuizQuestionId(quizQuestionEntity.getNextQuestionId());

        return questionDto;
    }

    @Override
    public PastQuizInfoDto getQuizInfo(Long quizId) {
        PastQuizInfoDto pastQuizInfoDto = new PastQuizInfoDto();
        QuizEntity quizEntity = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException(quizId));

        pastQuizInfoDto.setId(quizEntity.getId());
        pastQuizInfoDto.setTopic(quizEntity.getTopic().getTitle());
        pastQuizInfoDto.setStartTime(quizEntity.getStartTime());
        pastQuizInfoDto.setEndTime(quizEntity.getEndTime());
        pastQuizInfoDto.setSuccessPercent(quizEntity.getSuccessPercent());

        for (QuizQuestionEntity quizQuestionEntity : quizEntity.getQuizQuestions()) {
            pastQuizInfoDto.getQuizQuestions()
                    .add(QuizQuestionDto.mapFromEntity(quizQuestionEntity));
        }
        return pastQuizInfoDto;
    }

    @Override
    public Page<UpcomingQuizDto> getUpcomingQuizes(Long userId, Pageable pageable) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Page<UpcomingQuizEntity> allByUser = upComingQuizRepository.findAllByUser(userEntity, pageable);
        return allByUser.map(UpcomingQuizDto::mapFromEntity);
    }

    @Override
    @Transactional
    public void createUpcomingQuiz(UpcomingQuizCreationDto quizCreationDto) {
        UpcomingQuizEntity upcomingQuizEntity = new UpcomingQuizEntity();

        UserEntity userEntity = userRepository.findById(quizCreationDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException(quizCreationDto.getUserId()));

        TopicEntity topicEntity = topicRepository.findById(quizCreationDto.getTopicId())
                .orElseThrow(() -> new TopicNotFoundException(quizCreationDto.getTopicId()));

        upcomingQuizEntity.setUser(userEntity);
        upcomingQuizEntity.setTopic(topicEntity);

        upcomingQuizEntity.setDeadline(quizCreationDto.getDeadline().atStartOfDay());
        upcomingQuizEntity.setCount(quizCreationDto.getQuestionCount());
        upcomingQuizEntity.setDurationInMinutes(quizCreationDto.getDurationInMinutes());
        upComingQuizRepository.save(upcomingQuizEntity);
        userEntity.getUpcomingQuizes().add(upcomingQuizEntity);
        userRepository.save(userEntity);
    }

    @Override
    public QuestionDto getNextQuestion(Long nextQuizQuestionId) {

        QuizQuestionEntity quizQuestionEntity = quizQuestionRepository.findById(nextQuizQuestionId)
                .orElseThrow(() -> new QuizQuestionNotFoundException(nextQuizQuestionId));

        QuestionDto questionDto = QuestionDto.mapFromEntity(quizQuestionEntity.getQuestion());
        questionDto.setQuizQuestionId(quizQuestionEntity.getId());
        questionDto.setNextQuizQuestionId(quizQuestionEntity.getNextQuestionId());
        return questionDto;
    }

    @Override
    @Transactional
    public void computePercentage(Long quizId) {
        QuizEntity quizEntity = quizRepository.findById(quizId).orElseThrow(() -> new QuizNotFoundException(quizId));

        List<QuizQuestionEntity> quizQuestions = quizEntity.getQuizQuestions();
        double userScoreCount = 0;
        for (QuizQuestionEntity quizQuestion : quizQuestions) {
            QuestionEntity question = quizQuestion.getQuestion();

            int trueAnswersCount = getTrueAnswersCount(question.getAnswers());
            int usersTrueAnswers = getTrueAnswersCount(quizQuestion.getGivenAnswers());
            double answerScore = (double) usersTrueAnswers / trueAnswersCount;
            userScoreCount += answerScore;
        }
        Double percent = (userScoreCount / quizQuestions.size()) * 100;
        quizEntity.setSuccessPercent(percent);
        quizRepository.save(quizEntity);
    }

    private int getTrueAnswersCount(List<AnswerEntity> answers) {
        int count = 0;
        for (AnswerEntity answerEntity : answers) {
            if (answerEntity.getIsRight()) {
                count++;
            }
        }
        return count;
    }


    @Override
    @Transactional
    public void finishQuiz(Long quizId) {
        QuizEntity quizEntity = quizRepository.findById(quizId).orElseThrow(() -> new QuizNotFoundException(quizId));
        quizEntity.setEndTime(LocalDateTime.now());
        quizEntity.setIsFinished(true);
        quizRepository.save(quizEntity);
        computePercentage(quizId);
    }

    @Override
    public void failQuiz(Long upcomingQuizId) {
        UpcomingQuizEntity upcomingQuizEntity = upComingQuizRepository.findById(upcomingQuizId)
                .orElseThrow(() -> new UpcomingQuizNotFoundException(upcomingQuizId));


        UserEntity userEntity = userRepository.findById(upcomingQuizEntity.getUser().getId()).orElseThrow(
                () -> new UserNotFoundException(userService.getMe()));

        QuizEntity quizEntity = new QuizEntity();
        quizEntity.setUser(userEntity);
        quizEntity.setDuration(upcomingQuizEntity.getDurationInMinutes());
        quizEntity.setTopic(upcomingQuizEntity.getTopic());

        QuizEntity savedQuiz = quizRepository.save(quizEntity);
        finishQuiz(savedQuiz.getId());
        upComingQuizRepository.deleteById(upcomingQuizId);
    }

    @Override
    @Transactional
    public void answerToQuestion(Long quizQuestionId, List<Long> answeredIds) {

        QuizQuestionEntity quizQuestion;
        Optional<QuizQuestionEntity> byId = quizQuestionRepository.findById(quizQuestionId);
        if (byId.isPresent()) {
            quizQuestion = byId.get();
            QuizEntity quiz = quizQuestion.getQuiz();
            if (Boolean.TRUE.equals(quiz.getIsFinished())) {
                throw new QuizFinishedException();
            }
            if (!quizQuestion.getGivenAnswers().isEmpty()) {
                throw new QuestionIsAlreadyAnsweredException();
            }
            for (Long id : answeredIds) {
                Optional<AnswerEntity> answerEntity = answerRepository.findById(id);
                if (answerEntity.isPresent()) {
                    quizQuestion.getGivenAnswers().add(answerEntity.get());
                } else {
                    throw new AnswerNotFoundException(id);
                }
            }

        } else {
            throw new QuizQuestionNotFoundException(quizQuestionId);
        }

        quizQuestionRepository.save(quizQuestion);
    }

    @Override
    public QuizDtoForLocalStorage findByQuizId(Long id) {
        Optional<QuizEntity> quizEntity = quizRepository.findById(id);
        if (quizEntity.isPresent()) {
            return QuizDtoForLocalStorage.mapFromEntity(quizEntity.get());
        } else {
            throw new QuizNotFoundException(id);
        }
    }
}