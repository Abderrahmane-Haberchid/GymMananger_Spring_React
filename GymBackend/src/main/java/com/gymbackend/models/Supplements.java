package com.gymbackend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Supplements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String marque;
    private String type;
    private int quantity;
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date dateAjout;
    private Double prixAchat;
    private Double prixVente;

}
