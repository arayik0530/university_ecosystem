package com.polytech.quiz.config;


import com.polytech.quiz.entity.UserEntity;
import com.polytech.quiz.entity.enums.UserRole;
import com.polytech.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Optional;
@Component
public class DataLoader implements ApplicationRunner {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public void run(ApplicationArguments args) throws Exception {
        String email = "admin@admin.com";

        Optional<UserEntity> temp = userRepository.findByEmail(email);
        if(!temp.isPresent()) {

            UserEntity admin = new UserEntity();

            admin.setActive(true);
            admin.setEmail(email);
            admin.setFirstName("admin");
            admin.setLastName("admin");
            admin.setPassword(passwordEncoder.encode("QWEqwe111"));
            admin.getRoles().add(UserRole.ADMIN);
//            admin.getRoles().add(UserRole.USER);
            userRepository.save(admin);
        }


    }
}