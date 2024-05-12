package com.gymbackend.services.Impl;

import com.gymbackend.dto.PaimentDto;
import com.gymbackend.models.Paiements;
import com.gymbackend.repository.PaimentsRepository;
import com.gymbackend.services.PaimentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PaimentServiceImpl implements PaimentService {

    private final PaimentsRepository paimentsRepository;


    @Override
    public Optional<Paiements> findById(Long id) {
        return paimentsRepository.findById(id);
    }

    @Override
    public Optional<List<Paiements>> findAll() {
        return Optional.of(paimentsRepository.findAll());
    }

    @Override
    public boolean deletePayments(Long id) {
        paimentsRepository.deleteById(id);
        Paiements paiements = paimentsRepository.findById(id).get();
        if (paiements == null)
            return true;
        else
            return false;
    }


}
