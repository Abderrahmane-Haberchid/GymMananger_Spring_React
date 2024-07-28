package com.gymbackend.api;

import com.gymbackend.dto.SaleDto;
import com.gymbackend.services.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/sale")
public class SaleController {
    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping("/add/{email}")
    public ResponseEntity<SaleDto> addSale(@PathVariable String email, @RequestBody SaleDto saleDto){
        return ResponseEntity.ok(saleService.addSale(email, saleDto));
    }

    @DeleteMapping("delete/{id}/{userEmail}")
    public ResponseEntity<String> deleteSale(@PathVariable long id, @PathVariable String userEmail){
        if(saleService.deleteSale(id, userEmail))
            return ResponseEntity.ok("Sale deleted");
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
