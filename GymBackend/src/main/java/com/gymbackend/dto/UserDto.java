package com.gymbackend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gymbackend.models.*;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String username;
    private String email;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private Date created_at;
    @Enumerated(EnumType.STRING)
    private Role authorities;

    private Set<Membre> membreSet = new HashSet<>();

    private Set<Supplements> suppSet = new HashSet<>();

    private Set<Sale> saleSet = new HashSet<>();

    private Set<Paiements> paiementsSet = new HashSet<>();
}
