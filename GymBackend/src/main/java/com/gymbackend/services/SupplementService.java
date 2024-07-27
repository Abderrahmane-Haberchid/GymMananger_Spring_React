package com.gymbackend.services;

import com.gymbackend.dto.SupplementsDto;
import com.gymbackend.models.Supplements;

import java.util.List;

public interface SupplementService {
     List<Supplements> findByType(String type);

     SupplementsDto addProduct(String email, SupplementsDto supplementsDto);

    boolean deleteProduct(long id, String userEmail);
}
