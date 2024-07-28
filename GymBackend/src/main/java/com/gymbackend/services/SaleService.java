package com.gymbackend.services;

import com.gymbackend.dto.SaleDto;

public interface SaleService {
    SaleDto addSale(String email, SaleDto saleDto);

    boolean deleteSale(long id, String userEmail);
}
