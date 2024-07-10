package com.gymbackend.services.Impl;

import com.gymbackend.dto.UserDto;
import com.gymbackend.models.User;
import com.gymbackend.repository.MembreRepository;
import com.gymbackend.repository.PaimentsRepository;
import com.gymbackend.repository.UserRepository;
import com.gymbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RequiredArgsConstructor
class UserServiceImplTest {


    private final UserService userService;

    @MockBean
    private final UserRepository userRepository;
    @MockBean
    private final MembreRepository membreRepository;
    @MockBean
    private final PaimentsRepository paimentsRepository;


//    @Test
//    void findUserByEmailTest() {
//        String email = "abdo@gmail.com";
//        var user = User.builder().email(email)
//                .username(email)
//                .build();
//        var userDto = UserDto.builder().email(user.getEmail())
//                .username(user.getEmail())
//                .build();
//
//        when(userRepository.findByEmail(email)).thenReturn(Optional.of((user)));
//        UserDto newUser = userService.findUserByEmail(email);
//        assertNotNull(newUser);
//    }


}