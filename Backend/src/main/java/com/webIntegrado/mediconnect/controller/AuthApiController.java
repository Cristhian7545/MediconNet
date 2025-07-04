package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.RegistroForm;
import com.webIntegrado.mediconnect.model.Usuario;
import com.webIntegrado.mediconnect.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthApiController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistroForm registroForm) {
        usuarioService.register(registroForm);
        return ResponseEntity.ok("Usuario registrado correctamente");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RegistroForm loginRequest) {
        String token = usuarioService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

        Usuario usuario = usuarioService.findByUsernameOrEmail(loginRequest.getUsername(), loginRequest.getUsername());
        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", usuario.getUsername());
        response.put("rol", usuario.getRolId());  // <-- ESTA LÍNEA AGREGA EL ROL AL JSON

        return ResponseEntity.ok(response);
    }


}
