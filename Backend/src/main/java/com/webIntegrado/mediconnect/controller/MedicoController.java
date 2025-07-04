package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.Medico;
import com.webIntegrado.mediconnect.model.Sede;
import com.webIntegrado.mediconnect.model.Usuario;
import com.webIntegrado.mediconnect.repository.MedicoRepository;
import com.webIntegrado.mediconnect.repository.SedeRepository;
import com.webIntegrado.mediconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medicos")
// permite peticiones desde cualquier origen (útil para el frontend)
public class MedicoController {

    @Autowired
    private MedicoRepository medicoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private SedeRepository sedeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Obtener especialidades (opcional filtro por sede)
    @GetMapping("/especialidades")
    public List<String> obtenerEspecialidades(@RequestParam(required = false) Long sedeId) {
        if (sedeId == null) {
            return medicoRepository.findDistinctEspecialidades();
        } else {
            return medicoRepository.findEspecialidadesBySedeId(sedeId);
        }
    }

    // Obtener médicos por especialidad (sin sede)
    @GetMapping("/por-especialidad")
    public List<Medico> obtenerMedicosPorEspecialidad(@RequestParam String especialidad) {
        return medicoRepository.findByEspecialidad(especialidad);
    }

    // Obtener médicos por sede y especialidad
    @GetMapping("/por-sede-y-especialidad")
    public List<Medico> obtenerMedicosPorSedeYEspecialidad(@RequestParam Long sedeId, @RequestParam String especialidad) {
        return medicoRepository.findMedicosBySedeIdYEspecialidad(sedeId, especialidad);
    }

    // Obtener todos los médicos (opcional)
    @GetMapping
    public List<Medico> obtenerTodos() {
        return medicoRepository.findAll();
    }

    @GetMapping("/admin-list")
    public ResponseEntity<?> listarMedicos() {
        var medicos = medicoRepository.findAll();
        var result = medicos.stream().map(m -> Map.of(
                "id", m.getId(),
                "nombres", m.getNombres(),
                "apellidos", m.getApellidos(),
                "telefono", m.getTelefono(),
                "consultorio", m.getConsultorio(),
                "especialidad", m.getEspecialidad(),
                "sede", m.getSede() != null ? m.getSede().getNombre() : "",
                "foto", m.getFoto() != null ? m.getFoto() : ""
        )).toList();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/admin-nuevo")
    public ResponseEntity<?> registrarMedico(@RequestBody Map<String, Object> data) {
        // 1. Parsear datos
        String nombres = (String) data.get("nombres");
        String apellidos = (String) data.get("apellidos");
        String telefono = (String) data.get("telefono");
        String consultorio = (String) data.get("consultorio");
        String especialidad = (String) data.get("especialidad");
        String foto = (String) data.get("foto");
        Long sedeId = Long.valueOf(data.get("sedeId").toString());

        // 2. Generar username y correo
        String[] partsNombres = nombres.split(" ");
        String[] partsApellidos = apellidos.split(" ");
        String primerNombre = partsNombres[0].toLowerCase();
        String primerApellido = partsApellidos[0].toLowerCase();
        String username = primerNombre + "." + primerApellido;
        String email = username + "@mediconect.com";

        // 3. Generar contraseña: 3 letras nombre + 3 letras apellido + 2 últimos dígitos teléfono
        String pass =
                primerNombre.substring(0, Math.min(3, primerNombre.length())) +
                        primerApellido.substring(0, Math.min(3, primerApellido.length())) +
                        (telefono.length() >= 2 ? telefono.substring(telefono.length() - 2) : "00");

        // 4. Crear usuario
        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setEmail(email);
        usuario.setRolId(2); // Médico
        usuario.setActivo(true);
        usuario.setPasswordHash(passwordEncoder.encode(pass));
        usuario = usuarioRepository.save(usuario);

        // 5. Obtener la sede
        Sede sede = sedeRepository.findById(sedeId).orElse(null);

        // 6. Crear médico
        Medico medico = new Medico();
        medico.setUsuarioId(usuario.getId_usuario());
        medico.setNombres(nombres);
        medico.setApellidos(apellidos);
        medico.setTelefono(telefono);
        medico.setConsultorio(consultorio);
        medico.setEspecialidad(especialidad);
        medico.setFoto(foto);
        medico.setSede(sede);
        medicoRepository.save(medico);

        return ResponseEntity.ok(Map.of(
                "usuario", username,
                "email", email,
                "password", pass
        ));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarMedico(@PathVariable Long id) {
        // 1. Buscar el médico
        Medico medico = medicoRepository.findById(id).orElse(null);
        if (medico == null) return ResponseEntity.notFound().build();

        Long usuarioId = medico.getUsuarioId();

        // 1.1 Eliminar el médico (primero)
        medicoRepository.deleteById(id);

        // 1.2 Eliminar el usuario (después, ya no hay referencia)
        if (usuarioId != null) {
            usuarioRepository.deleteById(usuarioId);
        }

        return ResponseEntity.ok("Médico y usuario eliminados");
    }




}
