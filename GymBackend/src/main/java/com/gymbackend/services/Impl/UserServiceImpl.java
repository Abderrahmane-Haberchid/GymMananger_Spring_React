package com.gymbackend.services.Impl;

import com.gymbackend.dto.UserDto;
import com.gymbackend.models.Membre;
import com.gymbackend.models.Paiements;
import com.gymbackend.models.User;
import com.gymbackend.repository.MembreRepository;
import com.gymbackend.repository.UserRepository;
import com.gymbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final MembreRepository membreRepository;
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

    @Override
    public boolean deletePaymentById(Long id, String email, Long membreId) {
        User user = userRepository.findByEmail(email).get();
      //  Membre membre = membreRepository.findById(membreId).get();
       // System.out.println("========================"+membre.getNom());
     //   System.out.println("======================== AVANT"+membre.getPaiementsSet().size());
        Set<Paiements> paiements = user.getPaiementsSet().stream().filter(
                p -> p.getId().equals(id)).collect(Collectors.toSet());

        user.getPaiementsSet().removeAll(paiements);
       // membre.getPaiementsSet().removeAll(paiements);
      //  System.out.println("======================== APRES"+membre.getPaiementsSet().size());
        userRepository.save(user);
       // membreRepository.save(membre);
        return true;
    }
}
