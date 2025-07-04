package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.Paciente;
import com.webIntegrado.mediconnect.model.Reclamo;
import com.webIntegrado.mediconnect.model.Sede;
import com.webIntegrado.mediconnect.model.Usuario;
import com.webIntegrado.mediconnect.repository.PacienteRepository;
import com.webIntegrado.mediconnect.repository.ReclamoRepository;
import com.webIntegrado.mediconnect.repository.SedeRepository;
import com.webIntegrado.mediconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reclamos")
public class ReclamoController {

    @Autowired
    private ReclamoRepository reclamoRepo;
    @Autowired
    private PacienteRepository pacienteRepo;
    @Autowired
    private SedeRepository sedeRepo;
    @Autowired
    private UsuarioRepository usuarioRepo;

    // Crear reclamo (el paciente debe estar autenticado)
    @PostMapping
    public ResponseEntity<?> registrarReclamo(@RequestBody Reclamo reclamo, Authentication authentication) {
        // 1. Obtener el usuario autenticado
        String username = authentication.getName();
        Usuario usuario = usuarioRepo.findByEmailOrUsername(username, username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Obtener el paciente usando usuarioId
        Paciente paciente = pacienteRepo.findByUsuarioId(usuario.getId_usuario())
                .orElse(null);
        if (paciente == null) {
            return ResponseEntity.status(401).body("No se pudo obtener el paciente autenticado");
        }

        // 3. Vincular paciente y sede al reclamo
        reclamo.setPaciente(paciente);

        Sede sede = sedeRepo.findById(reclamo.getSede().getId_sede()).orElse(null);
        if (sede == null) {
            return ResponseEntity.badRequest().body("Sede no válida");
        }
        reclamo.setSede(sede);

        reclamoRepo.save(reclamo);
        return ResponseEntity.ok(reclamo);
    }

    // Obtener todos los reclamos del paciente autenticado
    @GetMapping("/mios")
    public List<Reclamo> misReclamos(Authentication authentication) {
        String username = authentication.getName();
        Usuario usuario = usuarioRepo.findByEmailOrUsername(username, username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Paciente paciente = pacienteRepo.findByUsuarioId(usuario.getId_usuario())
                .orElse(null);
        if (paciente == null) return List.of();
        return reclamoRepo.findByPacienteIdPaciente(paciente.getId_paciente());
    }

    @GetMapping
    public ResponseEntity<?> listarTodosLosReclamos() {
        // Trae todos los reclamos con info del paciente y sede
        var reclamos = reclamoRepo.findAll();
        var result = reclamos.stream().map(r -> {
            return Map.of(
                    "id_reclamo", r.getId_reclamo(),
                    "sede", r.getSede().getNombre(),
                    "id_paciente", r.getPaciente().getId_paciente(),
                    "nombres_paciente", r.getPaciente().getNombres(),
                    "apellidos_paciente", r.getPaciente().getApellidos(),
                    "dni", r.getDni(),
                    "tipoReclamo", r.getTipoReclamo(),
                    "clasificacion", r.getClasificacion(),
                    "detalle", r.getDetalle(),
                    "fechaReclamo", r.getFechaReclamo() != null ? r.getFechaReclamo().toString() : ""
            );
        }).toList();
        return ResponseEntity.ok(result);
    }
}
