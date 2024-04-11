package com.gymbackend.api;


import com.gymbackend.dto.PaimentDto;
import com.gymbackend.models.Paiements;
import com.gymbackend.services.PaimentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/payments")
@RequiredArgsConstructor
public class PaimentController {

    private final PaimentService paimentService;


    @GetMapping("all/{id}")
    public ResponseEntity<Optional<Paiements>> findById(@PathVariable Long id) {

        return ResponseEntity.ok(paimentService.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<Optional<List<Paiements>>> afficherTout() {
        return ResponseEntity.ok(paimentService.findAll());
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<PaimentDto> deletePayment(@PathVariable Long id){

            return ResponseEntity.ok(paimentService.deletePayments(id));
    }
}

