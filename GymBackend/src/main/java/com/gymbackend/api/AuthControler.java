package com.gymbackend.api;

import com.gymbackend.config.AuthentificationService;
import com.gymbackend.dao.request.SigninRequest;
import com.gymbackend.dao.request.SignupRequest;
import com.gymbackend.dao.response.JwtAuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthControler {
    private final AuthentificationService authentificationService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody SigninRequest request){
        return ResponseEntity.ok(authentificationService.signin(request));
    }
    @PostMapping("/register")
    public ResponseEntity<JwtAuthenticationResponse> register(@RequestBody SignupRequest request){
        return ResponseEntity.ok(authentificationService.signup(request));
    }

}
