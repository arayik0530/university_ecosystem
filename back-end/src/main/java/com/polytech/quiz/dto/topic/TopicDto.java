package com.polytech.quiz.dto.topic;

import com.polytech.quiz.entity.TopicEntity;
import lombok.Data;

@Data
public class TopicDto {

    private String title;

    private Long id;


    public TopicEntity toEntity(){
        TopicEntity topic = new TopicEntity();

        topic.setTitle(this.title);

        return topic;
    }

    public static TopicDto mapFromEntity(TopicEntity topic){
        TopicDto topicDto = new TopicDto();

        topicDto.id = topic.getId();
        topicDto.title = topic.getTitle();

        return topicDto;
    }
}
