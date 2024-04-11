package com.gymbackend.services;

import com.gymbackend.dto.PaimentDto;
import com.gymbackend.models.Paiements;

import java.util.List;
import java.util.Optional;

public interface PaimentService {
    Optional<Paiements> findById(Long id);
    Optional<List<Paiements>> findAll();
    PaimentDto deletePayments(Long id);
}
