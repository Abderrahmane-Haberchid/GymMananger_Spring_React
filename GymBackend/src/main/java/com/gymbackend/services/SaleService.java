package com.gymbackend.services;

import com.gymbackend.dto.SaleDto;

public interface SaleService {
    SaleDto addSale(String email, SaleDto saleDto);
}
