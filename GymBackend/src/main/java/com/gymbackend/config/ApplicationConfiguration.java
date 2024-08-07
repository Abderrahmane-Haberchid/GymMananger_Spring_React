package com.gymbackend.config;

import com.gymbackend.models.Membre;
import com.gymbackend.models.Paiements;
import com.gymbackend.repository.MembreRepository;
import com.gymbackend.repository.UserRepository;
import com.gymbackend.repository.PaimentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.FileSystemResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfiguration {
        private final UserRepository userRepository;
        @Bean
        UserDetailsService userDetailsService() {
            return username -> userRepository.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        }

        @Bean
        BCryptPasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
            return config.getAuthenticationManager();
        }

        @Bean
        AuthenticationProvider authenticationProvider() {
            DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

            authProvider.setUserDetailsService(userDetailsService());
            authProvider.setPasswordEncoder(passwordEncoder());

            return authProvider;
        }
//    @Scheduled(fixedRate = 6000)
//    public void updateMembreStatus(){
//
//        List<Membre> membreList = new ArrayList<>();
//        List<Long> membreIdList = new ArrayList<>();
//
//        List<Paiements> unpaidList = paimentsRepository.findExpiredPayments(new Date());
//
//        if (!unpaidList.isEmpty())
//            unpaidList.forEach(payments ->
//                    membreIdList.addAll(Collections.singleton(payments.getMembre().getId_membre())));
//
//        if (!membreIdList.isEmpty())
//            membreIdList.forEach(
//                    m -> membreList.addAll(membreRepository.findAllById(Collections.singleton(m.longValue()))));
//
//        membreList.forEach(membre -> membre.setStatut("Unpaid"));
//
//        System.out.println(membreList.size());
//        membreRepository.saveAll(membreList);
//    }



}
