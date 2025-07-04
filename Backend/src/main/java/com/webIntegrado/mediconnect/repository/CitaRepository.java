package com.webIntegrado.mediconnect.repository;

import com.webIntegrado.mediconnect.model.Cita;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface CitaRepository extends JpaRepository<Cita, Long> {
    boolean existsByMedicoIdAndFechaHora(Long medicoId, LocalDateTime fechaHora);
    List<Cita> findByMedicoIdAndFechaHoraBetween(Long medicoId, LocalDateTime desde, LocalDateTime hasta);
    List<Cita> findByPacienteId(Long id_paciente);
    List<Cita> findByMedicoId(Long medicoId);


}
