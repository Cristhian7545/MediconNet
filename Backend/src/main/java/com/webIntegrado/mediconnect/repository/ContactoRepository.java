package com.webIntegrado.mediconnect.repository;

import com.webIntegrado.mediconnect.model.Contacto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactoRepository extends JpaRepository<Contacto, Long> {
    // Métodos extra opcionales si deseas buscar por paciente, email, etc.
}
