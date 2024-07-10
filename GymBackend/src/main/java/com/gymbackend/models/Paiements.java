package com.gymbackend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Paiements {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date date_paiement;
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date date_expiration;
    private Double prix;
    private String type_abonnement;
    private String type_paiement;

    @ManyToOne
    @JoinColumn(name = "id_membre")
    @JsonIgnore
    Membre membre;

}
