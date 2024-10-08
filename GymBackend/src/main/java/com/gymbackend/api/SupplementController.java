package com.gymbackend.api;

import com.gymbackend.dto.SupplementsDto;
import com.gymbackend.models.Supplements;
import com.gymbackend.services.SupplementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/supplements")
public class SupplementController {

    private final SupplementService supplementService;

    public SupplementController(SupplementService supplementService) {
        this.supplementService = supplementService;
    }

    @GetMapping("{type}")
    public List<Supplements> afficherParType(@PathVariable String type){
         return supplementService.findByType(type);
    }

    @PostMapping("/add/{email}")
    public ResponseEntity<SupplementsDto> addProduct(@PathVariable String email, @RequestBody SupplementsDto supplementsDto){

        return ResponseEntity.ok(supplementService.addProduct(email, supplementsDto));

    }

    @DeleteMapping("/delete/{id}/{userEmail}")
    public ResponseEntity<String> deleteProduct(@PathVariable long id, @PathVariable String userEmail){
        if(supplementService.deleteProduct(id, userEmail))
            return ResponseEntity.ok("Product deleted");
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
