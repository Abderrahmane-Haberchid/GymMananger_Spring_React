package com.gymbackend.api;

import com.gymbackend.config.AuthentificationService;
import com.gymbackend.dao.request.SigninRequest;
import com.gymbackend.dao.request.SignupRequest;
import com.gymbackend.dao.request.ValidateEmailRequest;
import com.gymbackend.dao.response.JwtAuthenticationResponse;
import com.gymbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthControler {

    private final AuthentificationService authentificationService;
    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody SigninRequest request){
        return ResponseEntity.ok(authentificationService.signin(request));
    }
    @PostMapping("/register")
    public ResponseEntity<JwtAuthenticationResponse> register(@RequestBody SignupRequest request){
        return ResponseEntity.ok(authentificationService.signup(request));
    }

    @PostMapping("/validateEmail")
    public ResponseEntity<String> valideEmail(@RequestBody ValidateEmailRequest request){

        System.out.println(request.getEmail() + "================================================================================");

        if(userService.checkEmail(request.getEmail()))
            return ResponseEntity.ok("mail sent");
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
