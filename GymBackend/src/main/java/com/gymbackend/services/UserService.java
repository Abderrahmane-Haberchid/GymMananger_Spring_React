package com.gymbackend.services;

import com.gymbackend.dto.UserDto;

public interface UserService {
    UserDto findUserByEmail(String email);
    boolean deletePaymentById(Long id, String email, Long membreId);
}
