package com.gymbackend.services;
import com.gymbackend.dto.MembreDto;
import com.gymbackend.dto.PaimentDto;
import com.gymbackend.models.Membre;

import java.util.List;
import java.util.Optional;

public interface MembreService {
     List<Membre> toutAfficher();
    boolean addMembre(String email, MembreDto membredto);
    MembreDto updateMembre(MembreDto membredto, Long id);
    Optional<List<Membre>> findByName(String name);
    Optional<List<Membre>> findByStatut(String statut);
     Optional<Membre> findByEmail(String email);
     Optional<Membre> findById_membre(Long id);

     PaimentDto addPayment(PaimentDto paimentDto, Long id, String userEmail);

}
