package com.gymbackend.services.Impl;

import com.gymbackend.dto.UserDto;
import com.gymbackend.models.Membre;
import com.gymbackend.models.Paiements;
import com.gymbackend.models.User;
import com.gymbackend.repository.MembreRepository;
import com.gymbackend.repository.PaimentsRepository;
import com.gymbackend.repository.UserRepository;
import com.gymbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final MembreRepository membreRepository;
    private final PaimentsRepository paimentsRepository;
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
    public boolean deletePaymentFromUserAndMembre(Long paymentId, String email, Long membreId) {

        var user = userRepository.findByEmail(email).get();
        var membre = membreRepository.findById(membreId).get();

        Paiements paiements = paimentsRepository.findById(paymentId).get();


        user.getPaiementsSet().remove(paiements);
        membre.getPaiementsSet().remove(paiements);

        userRepository.save(user);
        membreRepository.save(membre);

        // Giving a status to membre after deleting his payments then checking his situation
        checkMembreStatus(membre);

        return true;
    }

    @Override
    public void checkMembreStatus(Membre membre) {

        List<Paiements> paiementsList = membre.getPaiementsSet().
                stream().sorted(Comparator.comparing(Paiements::getId).reversed()).toList();

        if (!membre.getPaiementsSet().isEmpty()){
            if(paiementsList.getFirst().getDate_expiration().before(new Date()))
                membre.setStatut("Unpaid");
            else
                membre.setStatut("Paid");
        }
        else
            membre.setStatut("Bundled");

        membreRepository.save(membre);

    }


}
