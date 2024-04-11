package com.gymbackend.services.Impl;

import com.gymbackend.dto.SaleDto;
import com.gymbackend.models.Sale;
import com.gymbackend.models.User;
import com.gymbackend.repository.SaleRepository;
import com.gymbackend.repository.UserRepository;
import com.gymbackend.services.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {

    private  final UserRepository userRepository;
    private final SaleRepository saleRepository;


    @Override
    public SaleDto addSale(String email, SaleDto saleDto) {
        User user = userRepository.findByEmail(email).get();

        var sale = Sale.builder()
                .nom(saleDto.getNom())
                .type(saleDto.getType())
                .marque(saleDto.getMarque())
                .quantity(saleDto.getQuantity())
                .dateVente(new Date())
                .prixVente(saleDto.getPrixVente())
                .build();

        user.getSaleSet().add(sale);
        userRepository.save(user);
        return saleDto;
    }
}
