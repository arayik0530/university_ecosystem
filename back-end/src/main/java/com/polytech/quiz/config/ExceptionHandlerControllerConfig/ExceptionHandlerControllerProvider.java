package com.polytech.quiz.config.ExceptionHandlerControllerConfig;


import com.polytech.quiz.api.impl.ExceptionHandlerController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ExceptionHandlerControllerProvider {

    @Bean
    public  ExceptionHandlerController provide(){
        return new ExceptionHandlerController();
    }
}
