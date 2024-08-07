package com.gymbackend.services;

import com.gymbackend.dto.UserDto;
import com.gymbackend.models.Membre;

public interface UserService {
     boolean checkEmail(String email);

    UserDto findUserByEmail(String email);
    boolean deletePaymentFromUserAndMembre(Long id, String email, Long membreId);
    void checkMembreStatus(Membre membre);

    boolean deleteMembre(String membreEmail);

    boolean activateMembre(String membreEmail);
}
