package com.polytech.quiz.dto.topic;

import com.polytech.quiz.entity.TopicEntity;
import lombok.*;

@Getter
 @Setter
 @RequiredArgsConstructor
 @EqualsAndHashCode
public class TopicOnlyTitleDto {

    private String title;

    public TopicEntity toEntity(){
        TopicEntity topic = new TopicEntity();

        topic.setTitle(this.title);

        return topic;
    }
}
