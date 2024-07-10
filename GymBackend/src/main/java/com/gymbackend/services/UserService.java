package com.gymbackend.services;

import com.gymbackend.dto.UserDto;
import com.gymbackend.models.Membre;

public interface UserService {
    UserDto findUserByEmail(String email);
    boolean deletePaymentFromUserAndMembre(Long id, String email, Long membreId);
    void checkMembreStatus(Membre membre);
}
