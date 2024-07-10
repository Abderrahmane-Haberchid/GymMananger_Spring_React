package com.gymbackend.api;

import com.gymbackend.dto.UserDto;
import com.gymbackend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<UserDto> findById(@PathVariable String email){
            return ResponseEntity.ok(userService.findUserByEmail(email));
    }

    @DeleteMapping("/deletePayment/id/{id}/email/{email}/membreId/{membreId}")
    public  ResponseEntity<Boolean> deletePayment(
            @PathVariable("id") Long id,
            @PathVariable("email") String email,
            @PathVariable("membreId") Long membreId){

        return ResponseEntity.ok(userService.deletePaymentFromUserAndMembre(id, email, membreId));
    }
}
