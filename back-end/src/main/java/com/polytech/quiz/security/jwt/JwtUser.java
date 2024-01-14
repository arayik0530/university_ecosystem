package com.polytech.quiz.security.jwt;

import com.polytech.quiz.entity.enums.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class JwtUser implements UserDetails {
    private Long id;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;


    public JwtUser(Long id, String email, String password, String... roles) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.setAuthorities(roles);
    }

    public JwtUser(Long id, String email, String password, Set<UserRole> roles) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.setAuthorities(roles);
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    private void setAuthorities(String... roles) {
        Set<GrantedAuthority> roleSet = new HashSet<>();
        for (String role : roles) {
            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(role);
            roleSet.add(simpleGrantedAuthority);
        }
        this.authorities = roleSet;
    }

    private void setAuthorities(Set<UserRole> roles) {
        this.authorities = Stream.of(roles).map(role -> new SimpleGrantedAuthority(role.toString()))
                .collect(Collectors.toSet());
    }


    public Long getId() {
        return id;
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
