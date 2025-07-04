package com.webIntegrado.mediconnect.repository;

import com.webIntegrado.mediconnect.model.Reclamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReclamoRepository extends JpaRepository<Reclamo, Long> {
    @Query("SELECT r FROM Reclamo r WHERE r.paciente.id_paciente = :id_paciente")
    List<Reclamo> findByPacienteIdPaciente(@Param("id_paciente") Long id_paciente);
}