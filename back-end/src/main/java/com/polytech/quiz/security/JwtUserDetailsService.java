package com.polytech.quiz.security;

import com.polytech.quiz.entity.UserEntity;
import com.polytech.quiz.repository.UserRepository;
import com.polytech.quiz.security.jwt.JwtUser;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Primary
public class JwtUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public JwtUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        Optional<UserEntity> optionalUserEntity = userRepository.findByEmailIgnoreCase(email);

        if (optionalUserEntity.isPresent()) {
            UserEntity userEntity = optionalUserEntity.get();
            return new JwtUser(userEntity.getId(), userEntity.getEmail(), userEntity.getPassword(), userEntity.getRoles());
        }
        throw new UsernameNotFoundException(email);
    }

}
