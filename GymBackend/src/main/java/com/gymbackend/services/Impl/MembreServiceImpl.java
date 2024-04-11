package com.gymbackend.services.Impl;
import com.gymbackend.dto.MembreDto;
import com.gymbackend.dto.PaimentDto;
import com.gymbackend.models.Membre;
import com.gymbackend.models.Paiements;
import com.gymbackend.models.User;
import com.gymbackend.repository.MembreRepository;
import com.gymbackend.repository.UserRepository;
import com.gymbackend.services.MembreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MembreServiceImpl implements MembreService {

    private final MembreRepository membreRepository;

    private final UserRepository userRepository;
    @Override
    public List<Membre> toutAfficher() {
        return membreRepository.findAll();
    }

    @Override
    public boolean addMembre(String email, MembreDto membreDto) {

        User user = userRepository.findByEmail(email).get();

        List<Membre> checkIfExistMembre = user.getMembreSet().stream()
                                            .filter(c -> Objects.equals(c.getEmail(), membreDto.getEmail())).toList();

            var membreToAdd = Membre.builder()
                    .image("")
                    .nom(membreDto.getNom())
                    .prenom(membreDto.getPrenom())
                    .telephone(membreDto.getTelephone())
                    .email(membreDto.getEmail())
                    .adresse(membreDto.getAdresse())
                    .age(membreDto.getAge())
                    .dateInscription(new Date())
                    .dateUpdate(new Date())
                    .state("Actif")
                    .statut("Bundled")
                    .build();
            if (!checkIfExistMembre.isEmpty()) {
                return  false;
            }
            else{
                user.getMembreSet().add(membreToAdd);
                userRepository.save(user);
                return true;
            }
    }

    @Override
    public MembreDto updateMembre(MembreDto membredto, Long id) {

          Membre membre = membreRepository.findById(id).get();
            membre.setNom(membredto.getNom());
            membre.setPrenom(membredto.getPrenom());
            membre.setAge(membredto.getAge());
            membre.setEmail(membredto.getEmail());
            membre.setAdresse(membredto.getAdresse());
            membre.setTelephone(membredto.getTelephone());
            membre.setDateUpdate(new Date());

            membreRepository.save(membre);
            return membredto;

    }

    @Override
    public Optional<List<Membre>> findByName(String name) {
        return membreRepository.findByNom(name);
    }

    @Override
    public Optional<List<Membre>> findByStatut(String statut) {
        return membreRepository.findByStatut(statut);
    }

    @Override
    public Optional<Membre> findByEmail(String email) {
        return membreRepository.findByEmail(email);
    }

    @Override
    public Optional<Membre> findById_membre(Long id) {

        return membreRepository.findById(id);
    }

    @Override
    public PaimentDto addPayment(PaimentDto paimentDto, Long id, String userEmail) {

        Date date = null;
        Membre membre = membreRepository.findById(id).get();
        User user = userRepository.findByEmail(userEmail).get();

        int monthsToAdd = 0;
        String paymentType = paimentDto.getType_paiement();

        if (paymentType.equals("Mensuel")) {
            monthsToAdd = 1;
        }
        if (paymentType.equals("Par 3mois")) {
            monthsToAdd = 3;
        }
        if (paymentType.equals("Par 6mois")) {
            monthsToAdd = 6;
        }
        if (paymentType.equals("Annuel")) {
            monthsToAdd = 12;
        }

        if (paimentDto.isDontkeepExpDate()){
            Calendar c= Calendar.getInstance();
            c.add(Calendar.MONTH, monthsToAdd);
             date = c.getTime();
        }
        if (!paimentDto.isDontkeepExpDate()){
            Calendar c= Calendar.getInstance();
            List<Paiements> pt = membre.getPaiementsSet().stream().toList();
            Date dt = pt.get(pt.size()-1).getDate_expiration();
            c.setTime(dt);
            c.add(Calendar.MONTH, monthsToAdd);
            date = c.getTime();
        }


        var paiement = Paiements.builder()
                .date_paiement(new Date())
                .type_paiement(paimentDto.getType_paiement())
                .date_expiration(date)
                .prix(paimentDto.getPrix())
                .type_abonnement(paimentDto.getType_abonnement())
                .membre(membre)
                .build();

        membre.setDateUpdate(new Date());
        membre.setStatut("Paid");
        membre.getPaiementsSet().add(paiement);
        membreRepository.save(membre);

        user.getPaiementsSet().add(paiement);
        userRepository.save(user);

        return paimentDto;
    }

}
