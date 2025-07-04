package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.*;
import com.webIntegrado.mediconnect.repository.CitaRepository;
import com.webIntegrado.mediconnect.repository.MedicoRepository;
import com.webIntegrado.mediconnect.repository.PacienteRepository;
import com.webIntegrado.mediconnect.repository.UsuarioRepository;
import com.webIntegrado.mediconnect.service.CitaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/citas")
public class CitaController {

    @Autowired
    private CitaService citaService;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private PacienteRepository pacienteRepo;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private CitaRepository citaRepository;


    @PostMapping("/reservar")
    public ResponseEntity<String> reservarCita(@RequestBody CitaRequest request, Authentication auth) {
        String email = auth.getName();
        Usuario usuario = usuarioRepo.findByEmailOrUsername(email, email).orElseThrow();

        Long pacienteId = pacienteRepo.findByUsuarioId(usuario.getId_usuario())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado")).getId_paciente();

        String mensaje = citaService.reservarCita(
                pacienteId,
                request.getMedicoId(),
                request.getSedeId(),       // <-- agregado aquí
                request.getFechaHora(),
                request.getMotivo()
        );

        return ResponseEntity.ok(mensaje);
    }
    @GetMapping("/mis-citas")
    public ResponseEntity<List<CitaConDetalles>> obtenerMisCitas() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        // Buscar usuario autenticado por username o email
        Optional<Usuario> usuarioOpt = usuarioRepo.findByEmailOrUsername(username, username);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }
        Usuario usuario = usuarioOpt.get();

        // Ahora usa el método de tu CitaService
        List<CitaConDetalles> citas = citaService.obtenerCitasPorUsuarioId(usuario.getId_usuario());
        return ResponseEntity.ok(citas);
    }

    @DeleteMapping("/cancelar/{id}")
    public ResponseEntity<String> cancelarCita(@PathVariable Long id, Authentication auth) {
        String email = auth.getName();
        Usuario usuario = usuarioRepo.findByEmailOrUsername(email, email).orElseThrow();
        boolean exito = citaService.cancelarCita(id, usuario.getId_usuario());

        if (exito) {
            return ResponseEntity.ok("Cita cancelada correctamente");
        } else {
            return ResponseEntity.status(403).body("No autorizado para cancelar esta cita");
        }
    }

    @GetMapping("/medico-citas")
    public ResponseEntity<List<CitaConDetalles>> obtenerCitasParaMedico(Authentication auth) {
        String email = auth.getName();
        Usuario usuario = usuarioRepo.findByEmailOrUsername(email, email).orElseThrow();

        // Buscar al médico asociado a este usuario
        Optional<Medico> medicoOpt = medicoRepository.findByUsuarioId(usuario.getId_usuario());
        if (medicoOpt.isEmpty()) {
            return ResponseEntity.status(403).build();
        }
        Medico medico = medicoOpt.get();

        List<CitaConDetalles> citas = citaService.obtenerCitasPorMedicoId(medico.getId());
        return ResponseEntity.ok(citas);
    }
    @PutMapping("/confirmar/{id}")
    public ResponseEntity<String> confirmarCita(@PathVariable Long id, Authentication auth) {
        String email = auth.getName();
        Usuario usuario = usuarioRepo.findByEmailOrUsername(email, email).orElseThrow();

        boolean exito = citaService.confirmarCita(id, usuario.getId_usuario());
        if (exito) {
            return ResponseEntity.ok("Cita confirmada correctamente");
        } else {
            return ResponseEntity.status(403).body("No autorizado para confirmar esta cita");
        }
    }
    // HISTORIAL DE CITAS ADMIN
    @GetMapping("/historial")
    public ResponseEntity<?> historialCitas() {
        var citas = citaRepository.findAll();
        var result = citas.stream().map(c -> {
            // Detalles de paciente
            Paciente paciente = pacienteRepo.findById(c.getPacienteId()).orElse(null);
            // Detalles de médico
            Medico medico = medicoRepository.findById(c.getMedicoId()).orElse(null);
            // Formatea sede
            String sede = (medico != null && medico.getSede() != null) ? medico.getSede().getNombre() : "";

            return Map.of(
                    "id", c.getId(),
                    "fechaHora", c.getFechaHora() != null ? c.getFechaHora().toString() : "",
                    "motivo", c.getMotivo(),
                    "estado", c.getEstado(),
                    // Paciente info
                    "paciente", Map.of(
                            "nombres", paciente != null ? paciente.getNombres() : "",
                            "apellidos", paciente != null ? paciente.getApellidos() : ""
                    ),
                    // Médico info
                    "medico", Map.of(
                            "nombres", medico != null ? medico.getNombres() : "",
                            "apellidos", medico != null ? medico.getApellidos() : "",
                            "especialidad", medico != null ? medico.getEspecialidad() : "",
                            "sede", sede
                    )
            );
        }).toList();

        return ResponseEntity.ok(result);
    }

}