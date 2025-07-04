package com.webIntegrado.mediconnect.repository;

import com.webIntegrado.mediconnect.model.HorarioMedico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HorarioMedicoRepository extends JpaRepository<HorarioMedico, Long> {

    // Horarios por médico y día
    List<HorarioMedico> findByMedicoIdAndDiaSemana(Long medicoId, String diaSemana);

    // Turnos disponibles para un médico en un día
    List<HorarioMedico> findByMedicoId(Long medicoId);
    void deleteByMedicoId(Long medicoId);


    boolean existsByMedicoIdAndDiaSemanaAndTurno(Long medicoId, String diaSemana, String turno);
}

