package com.gymbackend.services.Impl;

import com.gymbackend.dto.UserDto;
import com.gymbackend.repository.UserRepository;
import com.gymbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    public UserDto findUserByEmail(String email){
        var user = userRepository.findByEmail(email).get();

        return UserDto.builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .created_at(user.getCreated_at())
                .authorities(user.getRole())
                .membreSet(user.getMembreSet())
                .suppSet(user.getSuppSet())
                .paiementsSet(user.getPaiementsSet())
                .saleSet(user.getSaleSet())
                .build();
    }
}
