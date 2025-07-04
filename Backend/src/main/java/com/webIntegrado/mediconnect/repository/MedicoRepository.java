package com.webIntegrado.mediconnect.repository;

import com.webIntegrado.mediconnect.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

    List<Medico> findByEspecialidad(String especialidad);

    @Query("SELECT DISTINCT m.especialidad FROM Medico m")
    List<String> findDistinctEspecialidades();

    @Query("SELECT m FROM Medico m WHERE m.sede.id_sede = :sedeId AND m.especialidad = :especialidad")
    List<Medico> findMedicosBySedeIdYEspecialidad(@Param("sedeId") Long sedeId, @Param("especialidad") String especialidad);

    @Query("SELECT DISTINCT m.especialidad FROM Medico m WHERE m.sede.id_sede = :sedeId")
    List<String> findEspecialidadesBySedeId(@Param("sedeId") Long sedeId);

    Optional<Medico> findByUsuarioId(Long idUsuario);
}
