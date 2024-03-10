//package com.polytech.quiz.service;
//
//import com.polytech.quiz.entity.AnswerEntity;
//import com.polytech.quiz.entity.QuestionEntity;
//
//import java.util.Collections;
//
//import static com.polytech.quiz.service.TopicServiceImplUT.getTopicEntity;
//
//public class QuestionServiceImplUT {
//    protected static QuestionEntity getQuestionEntity() {
//        final QuestionEntity questionEntity = new QuestionEntity();
//        questionEntity.setId(1L);
//        questionEntity.setText("test_text");
//        questionEntity.setIsMultiAnswer(false);
//        questionEntity.setTopic(getTopicEntity());
//
//        final AnswerEntity answerEntity = getAnswerEntity();
//        answerEntity.setQuestion(questionEntity);
//
//        questionEntity.setAnswers(Collections.singletonList(answerEntity));
//        return questionEntity;
//    }
//
//    protected static AnswerEntity getAnswerEntity() {
//        final AnswerEntity answerEntity = new AnswerEntity();
//        answerEntity.setText("test_answer");
//        answerEntity.setIsRight(true);
//        answerEntity.setId(1L);
//        return answerEntity;
//    }
//}
