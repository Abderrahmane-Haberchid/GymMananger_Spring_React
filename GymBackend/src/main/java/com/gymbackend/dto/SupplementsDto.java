package com.gymbackend.dto;

import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class SupplementsDto {
    private String nom;
    private String marque;
    private String type;
    private int quantity;
    private Date dateAjout;
    private Double prixAchat;
    private Double prixVente;
}
