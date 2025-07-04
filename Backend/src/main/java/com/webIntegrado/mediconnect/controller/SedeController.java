package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.Sede;
import com.webIntegrado.mediconnect.repository.SedeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sedes")
public class SedeController {

    @Autowired
    private SedeRepository sedeRepository;

    // Obtener todas las sedes
    @GetMapping
    public List<Sede> obtenerSedes() {
        return sedeRepository.findAll();
    }

    // Obtener sede por ID
    @GetMapping("/{id}")
    public ResponseEntity<Sede> obtenerSedePorId(@PathVariable Long id) {
        Optional<Sede> sede = sedeRepository.findById(id);
        return sede.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva sede (opcional)
    @PostMapping
    public Sede crearSede(@RequestBody Sede sede) {
        return sedeRepository.save(sede);
    }

    // Eliminar sede por ID (opcional)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSede(@PathVariable Long id) {
        if (sedeRepository.existsById(id)) {
            sedeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
