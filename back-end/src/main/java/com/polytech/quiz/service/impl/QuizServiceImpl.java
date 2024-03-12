package com.polytech.quiz.service.impl;

import com.polytech.quiz.dto.answer.AnswerDto;
import com.polytech.quiz.dto.question.QuestionDto;
import com.polytech.quiz.dto.quiz.*;
import com.polytech.quiz.entity.*;
import com.polytech.quiz.repository.*;
import com.polytech.quiz.service.QuestionService;
import com.polytech.quiz.service.QuizService;
import com.polytech.quiz.service.UserService;
import com.polytech.quiz.service.scheduler.QuizDurationChecker;
import com.polytech.quiz.service.util.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class QuizServiceImpl implements QuizService {

    @Autowired
    public QuizServiceImpl(UserService userService, QuizRepository quizRepository,
                           QuestionService questionService, TopicRepository topicRepository,
                           UpComingQuizRepository upComingQuizRepository, UserRepository userRepository,
                           QuizQuestionRepository quizQuestionRepository, QuizDurationChecker quizDurationChecker,
                           AnswerRepository answerRepository, JavaMailSender javaMailSender,
                           @Value("${client.base.url}") String clientBaseUrl,
                           @Value("${spring.mail.username}") String mailSendFrom,
                           @Value("${mail.sender}") String mailSender) {
        this.userService = userService;
        this.quizRepository = quizRepository;
        this.questionService = questionService;
        this.topicRepository = topicRepository;
        this.upComingQuizRepository = upComingQuizRepository;
        this.userRepository = userRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.quizDurationChecker = quizDurationChecker;
        this.answerRepository = answerRepository;
        this.javaMailSender = javaMailSender;
        this.clientBaseUrl = clientBaseUrl;
        this.mailSender = mailSender;
        this.mailSendFrom = mailSendFrom;
    }


    private String clientBaseUrl;

    private final String mailSender;

    private final String mailSendFrom;

    private UserService userService;

    private QuizRepository quizRepository;

    private QuestionService questionService;
    private TopicRepository topicRepository;

    private UpComingQuizRepository upComingQuizRepository;
    private UserRepository userRepository;
    private QuizQuestionRepository quizQuestionRepository;
    private QuizDurationChecker quizDurationChecker;
    private AnswerRepository answerRepository;
    private JavaMailSender javaMailSender;


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
    public List<QuizDtoShortInfo> getQuizesByUserId(Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        List<QuizEntity> allByUser = quizRepository.findAllByUser(userEntity);
        return allByUser.stream().map(QuizDtoShortInfo::mapFromEntity).collect(Collectors.toList());
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

        for (int x = 0; x < quizQuestionEntities.size(); x++) {

            QuizQuestionEntity currentQuizQuestionEntity = quizQuestionEntities.get(x);
            if(x > 0) {
                QuizQuestionEntity previousQuizQuestionEntity = quizQuestionEntities.get(x - 1);
                currentQuizQuestionEntity.setPreviousQuestionId(previousQuizQuestionEntity.getId());
            }
            if(x < quizQuestionEntities.size() - 1) {
                QuizQuestionEntity nextQuizQuestionEntity = quizQuestionEntities.get(x + 1);
                currentQuizQuestionEntity.setNextQuestionId(nextQuizQuestionEntity.getId());
            }
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
                .mapFromEntityLight(quizQuestionEntity.getQuestion());
        questionDto.setQuizQuestionId(quizQuestionEntity.getId());

        questionDto.setQuizId(quizEntity.getId());
        questionDto.setNextQuizQuestionId(quizQuestionEntity.getNextQuestionId());
        questionDto.setPreviousQuizQuestionId(quizQuestionEntity.getPreviousQuestionId());

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
    public List<UpcomingQuizDto> getUpcomingQuizes(Long userId, Pageable pageable) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        List<UpcomingQuizEntity> allByUser = upComingQuizRepository.findAllByUser(userEntity);
        return allByUser.stream().map(UpcomingQuizDto::mapFromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void createUpcomingQuiz(UpcomingQuizCreationDto quizCreationDto) {

        List<UserEntity> userEntityList = userRepository.findAllByIdList(quizCreationDto.getUserIdList());

        TopicEntity topicEntity = topicRepository.findById(quizCreationDto.getTopicId())
                .orElseThrow(() -> new TopicNotFoundException(quizCreationDto.getTopicId()));

        for (UserEntity userEntity : userEntityList) {
            UpcomingQuizEntity upcomingQuizEntity = new UpcomingQuizEntity();
            upcomingQuizEntity.setUser(userEntity);
            upcomingQuizEntity.setTopic(topicEntity);

            upcomingQuizEntity.setDeadline(quizCreationDto.getDeadline().atStartOfDay());
            upcomingQuizEntity.setCount(quizCreationDto.getQuestionCount());
            upcomingQuizEntity.setDurationInMinutes(quizCreationDto.getDurationInMinutes());
            upComingQuizRepository.save(upcomingQuizEntity);

            userEntity.getUpcomingQuizes().add(upcomingQuizEntity);
            userRepository.save(userEntity);
        }

        ExecutorService executor = Executors.newSingleThreadExecutor();
        Runnable sendEmailTask = () -> {
            try {
                sendEmails(userEntityList, topicEntity, quizCreationDto.getDeadline());
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            }
        };
        executor.submit(sendEmailTask);
        executor.shutdown();
    }

    private void sendEmails(List<UserEntity> userEntityList, TopicEntity topicEntity, LocalDate deadline)
            throws MessagingException, UnsupportedEncodingException {
        for (UserEntity user : userEntityList) {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(user.getEmail());
            helper.setSubject("New Quiz Assignment");
            helper.setFrom(new InternetAddress(mailSendFrom, mailSender));

            StringBuilder messageBodyBuilder = new StringBuilder();
            messageBodyBuilder.append("<p>Dear <strong>%s %s</strong>.</p>");
            messageBodyBuilder.append("<p>A new quiz of topic  <strong>%s</strong> has been assigned to you.</p>");
            messageBodyBuilder.append("<p> Please visit this website in order to pass it.</p>");
            messageBodyBuilder.append("<p>The deadline is %s</p>");
            messageBodyBuilder.append("<p><a href='%s'>Visit Website</a></p>");

            String messageBody = String.format(messageBodyBuilder.toString(),
                    user.getFirstName(), user.getLastName(),
                    topicEntity.getTitle(),
                    deadline,
                    clientBaseUrl);

            helper.setText(messageBody, true);
            javaMailSender.send(message);
        }
    }

    @Override
    public QuestionDto getNextQuestion(Long nextQuizQuestionId) {

        QuizQuestionEntity quizQuestionEntity = quizQuestionRepository.findById(nextQuizQuestionId)
                .orElseThrow(() -> new QuizQuestionNotFoundException(nextQuizQuestionId));

        QuestionDto questionDto = QuestionDto.mapFromEntityLight(quizQuestionEntity.getQuestion());
        questionDto.setQuizQuestionId(quizQuestionEntity.getId());
        questionDto.setNextQuizQuestionId(quizQuestionEntity.getNextQuestionId());
        questionDto.setPreviousQuizQuestionId(quizQuestionEntity.getPreviousQuestionId());
        questionDto.setQuizId(quizQuestionEntity.getQuiz().getId());
        for (AnswerDto answer : questionDto.getAnswers()) {
            answer.setSelected(quizQuestionEntity.getGivenAnswers().stream()
                    .map(AnswerEntity::getId)
                    .collect(Collectors.toList()).contains(answer.getId()));
        }
        return questionDto;
    }

    @Override
    public QuestionDto getPreviousQuestion(Long previousQuizQuestionId) {
        if(previousQuizQuestionId != null) {
            QuizQuestionEntity quizQuestionEntity = quizQuestionRepository.findById(previousQuizQuestionId)
                    .orElseThrow(() -> new QuizQuestionNotFoundException(previousQuizQuestionId));

            QuestionDto questionDto = QuestionDto.mapFromEntityLight(quizQuestionEntity.getQuestion());
            questionDto.setQuizQuestionId(quizQuestionEntity.getId());
            questionDto.setNextQuizQuestionId(quizQuestionEntity.getNextQuestionId());
            questionDto.setPreviousQuizQuestionId(quizQuestionEntity.getPreviousQuestionId());
            questionDto.setQuizId(quizQuestionEntity.getQuiz().getId());
            for (AnswerDto answer : questionDto.getAnswers()) {
                answer.setSelected(quizQuestionEntity.getGivenAnswers().stream()
                        .map(AnswerEntity::getId)
                        .collect(Collectors.toList()).contains(answer.getId()));
            }
            return questionDto;
        }
        return null;
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

    private int getTrueAnswersCount(Set<AnswerEntity> answers) {
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
//            if (!quizQuestion.getGivenAnswers().isEmpty()) {//TODO
//                throw new QuestionIsAlreadyAnsweredException();
//            }
            quizQuestion.getGivenAnswers().clear(); // allowing to re answer
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