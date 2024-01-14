package com.polytech.quiz.security.jwt;


import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.stream.Stream;

@Component
public class JwtTokenProvider {
    private static final String USER_ID = "id";
    private static final String USER_EMAIL = "email";
    private static final String USER_ROLES = "roles";

    private final UserDetailsService userDetailsService;
    @Value("${jwt.token.secret}")
    private String secret;
    @Value("${jwt.token.expired}")
    private long validityInMilliseconds;

    public JwtTokenProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @PostConstruct
    protected void init() {
//        secret = Base64.getEncoder().encodeToString(secret.getBytes());
        MessageDigest sha256 = null;
        try {
            sha256 = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        byte[] hash = sha256.digest(secret.getBytes(StandardCharsets.UTF_8));
        byte[] keyBytes = Base64.getEncoder().encode(hash);
//        secret = String.valueOf(new SecretKeySpec(keyBytes, "HmacSHA256"));
        secret = new String((keyBytes));
    }

    public String createToken(Long userId, String email, String... roles) {


        Map<String, Object> claimsMap = new HashMap<>();
        claimsMap.put(USER_ID, userId);
        claimsMap.put(USER_EMAIL, email);
        claimsMap.put(USER_ROLES, roles);
        Claims claims = Jwts.claims(claimsMap);
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }


    public Authentication getAuthentication(String token) {
        boolean validateToken = validateToken(token);
        if (validateToken) {


            Long userId = getUserId(token);
            String email = getUsername(token);
            String[] userRoles = getUserRoles(token);
            userRoles = splitRoles(userRoles);
            JwtUser userDetails = new JwtUser(userId, email, "", userRoles);
            return new PreAuthenticatedAuthenticationToken(userDetails, "", userDetails.getAuthorities());
        } else throw new JwtAuthenticationException();
    }

    private String[] splitRoles(String[] userRoles) {
        List<String> newRoles = new ArrayList<>();
        for (String role : userRoles) {
             role = role.replace("[", "");
             role = role.replace("]", "");
            String[] split = role.split(",");
            for (int x = 0; x < split.length; x++) {
                split[x] = split[x].trim();
            }
            newRoles.addAll(Arrays.asList(split));
        }
        String[] roles = new String[newRoles.size()];
        for (int x = 0; x < newRoles.size(); x++) {
            roles[x] = newRoles.get(x);
        }
        return roles;
    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().get(USER_EMAIL,String.class);
    }

    public String[] getUserRoles(String token) {
        List<String> roles= Jwts.parser().setSigningKey(secret)
                .parseClaimsJws(token).getBody().get(USER_ROLES, ArrayList.class);
        return Stream.of(roles).map(Object::toString).toArray(String[]::new);
    }

    public Long getUserId(String token) {
      return (long) Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().get(USER_ID,Integer.class);

    }

    public Optional<String> resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer_")) {
            return Optional.of(bearerToken.substring(7, bearerToken.length()));
        }
        return Optional.empty();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(new Date())) {
                return false;
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException();
        }
    }

}
