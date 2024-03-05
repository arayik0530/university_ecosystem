package com.polytech.quiz.api.impl;

import com.polytech.quiz.api.AuthController;
import com.polytech.quiz.dto.user.LoginRequestDto;
import com.polytech.quiz.dto.user.UserInfoDto;
import com.polytech.quiz.dto.user.UserRegistrationDto;
import com.polytech.quiz.entity.UserEntity;
import com.polytech.quiz.repository.ConfirmationTokenRepository;
import com.polytech.quiz.repository.UserRepository;
import com.polytech.quiz.security.jwt.JwtTokenProvider;
import com.polytech.quiz.security.jwt.JwtUser;
import com.polytech.quiz.service.UserService;
import com.polytech.quiz.service.util.exception.InactiveUserException;
import com.polytech.quiz.service.util.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.List;

@RestController
@RequestMapping("/api/auth/")
@CrossOrigin(value="*")
public class AuthControllerImpl implements AuthController {

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    public AuthControllerImpl(UserService userService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Override
    @PostMapping("register")
    public void register(@RequestBody UserRegistrationDto registrationDto) {

        UserInfoDto user= userService.register(registrationDto);

//        SimpleMailMessage msg = new SimpleMailMessage();
//        msg.setTo(user.getEmail());
//        String messageBody = "To confirm your account, please click here : "
//                + "<a>http://localhost:8090/api/auth/confirm-account?token="
//                + userService.generateToken(user.getEmail()) + "</a>";
//        msg.setText(messageBody);
//        msg.setSubject("Email Confirmation");
//        msg.setFrom("donotreply.polytech@yandex.ru");
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(user.getEmail());
            helper.setSubject("Email Confirmation");
            helper.setFrom(new InternetAddress("donotreply.polytech@yandex.ru", "Polytech"));

            String messageBody = "<p>To confirm your account, please </p>" +
                    "<p><a href='http://localhost:8090/api/auth/confirm-account?token=" +
                    userService.generateToken(user.getEmail()) + "'>Click Here</a></p>";

            helper.setText(messageBody, true);

            javaMailSender.send(message);

//            javaMailSender.send(msg);
        } catch (Exception e){
//            System.out.println(e.getMessage());
//            System.out.println(e.getStackTrace());
//            throw e;
        }
    }

    @GetMapping(value="/confirm-account")
    public ResponseEntity<Void> confirmUserAccount(@RequestParam("token") String confirmationToken)
    {
            userService.activateByEmailToken(confirmationToken);

        // Redirect to a different site
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "http://localhost:3000/login");

        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @Override
    @PostMapping("login")
    public String login(@RequestBody LoginRequestDto loginRequestDto) {
        String email = loginRequestDto.getEmail();
        UserInfoDto userInfoDto = userService.findByEmail(email);
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
        if (!userEntity.getActive()) {
            throw new InactiveUserException(email);
        }
        JwtUser jwtUser = (JwtUser) authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email, loginRequestDto.getPassword()))
                .getPrincipal();

        return jwtTokenProvider.createToken(jwtUser.getId(), jwtUser.getUsername(), userInfoDto.getRoles());

    }

    @GetMapping(value="/test")
    public String test()    {
        return "{test}";
    }
}