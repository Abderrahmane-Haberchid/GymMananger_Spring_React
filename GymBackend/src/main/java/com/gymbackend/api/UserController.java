package com.gymbackend.api;

import com.gymbackend.dto.UserDto;
import com.gymbackend.services.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
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

    @DeleteMapping("delete/{membreEmail}")
    public ResponseEntity<String> deleteMembre(@PathVariable String membreEmail){
        if(userService.deleteMembre(membreEmail))
            return ResponseEntity.ok("Membre Deleted");
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("activate/{membreEmail}")
    public ResponseEntity<String> activateMembre(@PathVariable String membreEmail){
        if(userService.activateMembre(membreEmail))
            return ResponseEntity.ok("Membre Activated");
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
