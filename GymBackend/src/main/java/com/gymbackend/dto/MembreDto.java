package com.gymbackend.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class MembreDto {

    private Long id;
    private MultipartFile image;
    private String nom;
    private String prenom;
    private String email;
    private int age;
    private int telephone;
    private String adresse;

    private String statut;

    private Date date_inscription;

    private Date date_update;

    private String state;
}
