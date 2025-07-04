package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.Paciente;
import com.webIntegrado.mediconnect.model.Usuario;
import com.webIntegrado.mediconnect.repository.PacienteRepository;
import com.webIntegrado.mediconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public ResponseEntity<?> listarTodosLosPacientes() {
        // Trae todos los pacientes y asocia datos de usuario
        var pacientes = pacienteRepository.findAll();
        var result = pacientes.stream().map(p -> {
            Usuario u = usuarioRepository.findById(p.getUsuarioId()).orElse(null);
            return Map.of(
                    "id_paciente", p.getId_paciente() != null ? p.getId_paciente() : "",
                    "nombres", p.getNombres() != null ? p.getNombres() : "",
                    "apellidos", p.getApellidos() != null ? p.getApellidos() : "",
                    "username", u != null && u.getUsername() != null ? u.getUsername() : "",
                    "email", u != null && u.getEmail() != null ? u.getEmail() : "",
                    "telefono", p.getTelefono() != null ? p.getTelefono() : "",
                    "direccion", p.getDireccion() != null ? p.getDireccion() : "",
                    "fechaNacimiento", p.getFechaNacimiento() != null ? p.getFechaNacimiento() : ""
            );
        }).toList();
        return ResponseEntity.ok(result);
    }
}