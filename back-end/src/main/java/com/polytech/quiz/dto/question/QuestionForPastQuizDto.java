package com.polytech.quiz.dto.question;

import com.polytech.quiz.dto.answer.AnswerForPastQuizDto;
import com.polytech.quiz.entity.QuestionEntity;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;
@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class QuestionForPastQuizDto
{
    private Long id;

    private Long topicId;

    private String text;

    private Boolean isMultiAnswer;

    private List<AnswerForPastQuizDto> answers;

    public QuestionEntity toEntity() {
        QuestionEntity question = new QuestionEntity();
        question.setText(this.text);

        return question;
    }

    public static QuestionForPastQuizDto mapFromEntity(QuestionEntity question) {

        QuestionForPastQuizDto questionForPastQuizDto = new QuestionForPastQuizDto();

        questionForPastQuizDto.setId(question.getId());
        questionForPastQuizDto.setText(question.getText());
        questionForPastQuizDto.setTopicId(question.getTopic().getId());
        questionForPastQuizDto.setAnswers(question.getAnswers().stream()
                .map(AnswerForPastQuizDto::mapFromEntity).collect(Collectors.toList()));

        questionForPastQuizDto.setIsMultiAnswer(question.getIsMultiAnswer());
        return questionForPastQuizDto;
    }

}
