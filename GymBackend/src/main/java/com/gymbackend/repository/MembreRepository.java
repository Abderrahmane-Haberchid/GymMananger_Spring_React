package com.gymbackend.repository;

import com.gymbackend.models.Membre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface MembreRepository extends JpaRepository<Membre, Long> {

    Optional<List<Membre>> findByNom(String name);

    Optional<List<Membre>> findByStatut(String statut);
    Optional<Membre> findByEmail(String email);
    List<Membre> findAll();
    boolean existsByEmail(String email);


}
