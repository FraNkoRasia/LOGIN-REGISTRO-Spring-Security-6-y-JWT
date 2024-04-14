package com.spring.App.controller;

import com.spring.App.dto.AuthenticationRequest;
import com.spring.App.dto.AuthenticationResponse;

import com.spring.App.service.AuthenticationService;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 *
 * @author FraNko
 */
@RestController
@RequestMapping("/auth")
public class AuthenticationController implements WebMvcConfigurer {

    @Autowired
    private AuthenticationService authenticationService;

    //HABILITO EL CORS PARA INGRESAR AL BACKEND DESDE EL FRONTEND
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Permitir solicitudes desde el origen http://localhost:5173
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Permitir los métodos GET, POST, PUT y DELETE
                .allowedHeaders("*"); // Permitir todas las cabeceras en la solicitud
    }
    //////////////////////////////////////////////////////////////

    @PreAuthorize("permitAll")
    @GetMapping("/authenticate")
    public ResponseEntity<Map<String, String>> getLoginForm() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Formulario de login disponible");
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("permitAll")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(//AuthenticationResponse se crea en el paquete DTO (DATA TRANSFER Objects ), adentro va a estar un JWT (JSON WEB TOKEN)
            @RequestBody @Valid AuthenticationRequest authRequest) {//AuthenticationRequest creado en el DTO
        AuthenticationResponse jwtDto = authenticationService.login(authRequest);
        return ResponseEntity.ok(jwtDto);

    }

}
