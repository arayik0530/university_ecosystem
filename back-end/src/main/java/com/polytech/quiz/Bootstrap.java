package com.polytech.quiz;

import com.polytech.quiz.service.ImageService;
import com.polytech.quiz.service.scheduler.QuizDurationChecker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@SpringBootApplication
@EnableScheduling
public class Bootstrap implements CommandLineRunner {
    private QuizDurationChecker quizDurationChecker;
    private ImageService imageService;

    public Bootstrap(QuizDurationChecker quizDurationChecker, ImageService imageService) {
        this.quizDurationChecker = quizDurationChecker;
        this.imageService = imageService;
    }


    public static void main(String[] args) {
        SpringApplication.run(Bootstrap.class, args);
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        new Thread(() -> quizDurationChecker.checkDuration()).start();
        checkStandardImage();
//        new Thread(() -> {
//            SpringApplication.run(SmtpServerApplication.class, args);
//        }).start();
    }

    public void checkStandardImage() throws IOException {

        InputStream resourceAsStream = Bootstrap.class.getClassLoader().getResourceAsStream("no_image.png");

        byte[] imgBytes = toByteArray(resourceAsStream);
        imageService.setStandardImage(imgBytes);

    }
    public  byte[] toByteArray(InputStream in) throws IOException {

        ByteArrayOutputStream os = new ByteArrayOutputStream();

        byte[] buffer = new byte[1024];
        int len;

        // read bytes from the input stream and store them in buffer
        while ((len = in.read(buffer)) != -1) {
            // write bytes from the buffer into output stream
            os.write(buffer, 0, len);
        }

        return os.toByteArray();
    }
}

