package com.gymbackend.api;

import com.gymbackend.dto.MembreDto;
import com.gymbackend.dto.PaimentDto;
import com.gymbackend.models.Membre;
import com.gymbackend.services.MembreService;
import com.gymbackend.services.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/membres")
@RequiredArgsConstructor
public class MembreController {

    private final MembreService membreService;
    private final S3Service s3Service;

    @GetMapping("id/{id}")
    public Optional<Membre> findById(@PathVariable Long id){

        return membreService.findById_membre(id);
    }

    @GetMapping("all")
    private ResponseEntity<List<Membre>> afficher(){

        return ResponseEntity.ok(membreService.toutAfficher());
    }



    @PostMapping("upload/{id}")
    private ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable Long id) throws IOException {

           s3Service.uploadtos3(file, id);
            return new ResponseEntity("Image uploaded", HttpStatus.OK);
    }

    @PostMapping("save/{email}")
    private ResponseEntity<String> ajouter(@PathVariable String email, @RequestBody MembreDto membredto){

        if(membreService.addMembre(email, membredto))
            return new ResponseEntity("Membre created", HttpStatus.OK);

        else return new ResponseEntity("Membre already exist", HttpStatus.BAD_GATEWAY);
    }
     @PutMapping("edit/{id}")
     private ResponseEntity<MembreDto> editer(@RequestBody MembreDto membreDto, @PathVariable Long id){
         return ResponseEntity.ok(membreService.updateMembre(membreDto, id));
        }

    @GetMapping("statut/{statut}")
    private Optional<List<Membre>> getByStatut(@PathVariable("statut") String statut){
        return membreService.findByStatut(statut);
    }
    @GetMapping("nom/{nom}")
    private Optional<List<Membre>> getByName(@PathVariable String nom){
        return  membreService.findByName(nom);
    }

    @GetMapping("email/{email}")
    private Optional<Membre> getByEmail(@PathVariable String email){
        return membreService.findByEmail(email);
    }

    @PostMapping("/add_payment/{id}/{email}")
    private ResponseEntity<PaimentDto> ajouter_payment(@RequestBody PaimentDto paimentDto, @PathVariable Long id, @PathVariable String email){

            return ResponseEntity.ok(membreService.addPayment(paimentDto, id, email));
        }
}
