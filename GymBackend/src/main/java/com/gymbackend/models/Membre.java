package com.gymbackend.models;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Membre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_membre;
    private String image;
    private String nom;
    private String prenom;
    private String email;
    private int age;
    private int telephone;
    private String adresse;
    private String statut;
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date dateInscription;
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date dateUpdate;
    private String state;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    Set<Paiements> paiementsSet;


}
