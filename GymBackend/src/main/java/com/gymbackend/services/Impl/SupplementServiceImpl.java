package com.gymbackend.services.Impl;

import com.gymbackend.dto.SupplementsDto;
import com.gymbackend.models.Supplements;
import com.gymbackend.models.User;
import com.gymbackend.repository.SupplementsRepository;
import com.gymbackend.repository.UserRepository;
import com.gymbackend.services.SupplementService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SupplementServiceImpl implements SupplementService {
    private final SupplementsRepository supplementsRepository;
    private final UserRepository userRepository;

    public SupplementServiceImpl(SupplementsRepository supplementsRepository, UserRepository userRepository) {
        this.supplementsRepository = supplementsRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Supplements> findByType(String type) {
        return supplementsRepository.findByType(type);
    }

    @Override
    public SupplementsDto addProduct(String email, SupplementsDto supplementsDto) {

        User user = userRepository.findByEmail(email).get();

        var supp = Supplements.builder()
                .nom(supplementsDto.getNom())
                .marque(supplementsDto.getMarque())
                .type(supplementsDto.getType())
                .dateAjout(new Date())
                .quantity(supplementsDto.getQuantity())
                .prixVente(supplementsDto.getPrixVente())
                .prixAchat(supplementsDto.getPrixAchat())
                .build();

        user.getSuppSet().add(supp);

        userRepository.save(user);

        return supplementsDto;
    }

    @Override
    public boolean deleteProduct(long id, String userEmail) {
        var user = userRepository.findByEmail(userEmail).get();
        Supplements supplements = supplementsRepository.findById(id).get();
        user.getSuppSet().remove(supplements);
        userRepository.save(user);

        return !user.getSuppSet().contains(supplements);
    }

}
