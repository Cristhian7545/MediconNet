package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.HorarioMedico;
import com.webIntegrado.mediconnect.model.Medico;
import com.webIntegrado.mediconnect.repository.HorarioMedicoRepository;
import com.webIntegrado.mediconnect.repository.MedicoRepository;
import com.webIntegrado.mediconnect.service.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/horarios")
public class HorarioMedicoController {

    @Autowired

    private HorarioMedicoRepository horarioRepo;
    @Autowired
    private HorarioService horarioService;

    @Autowired
    private MedicoRepository medicoRepo;

    // Obtener todos los días disponibles para un médico (sin duplicados)
    @GetMapping("/dias")
    public List<String> getDiasDisponibles(@RequestParam Long medicoId) {
        return horarioRepo.findByMedicoId(medicoId)
                .stream()
                .map(HorarioMedico::getDiaSemana)
                .distinct()
                .toList();
    }

    // Obtener los turnos disponibles en un día específico para un médico
    @GetMapping("/turnos")
    public List<String> getTurnosPorDia(@RequestParam Long medicoId, @RequestParam String dia) {
        return horarioRepo.findByMedicoIdAndDiaSemana(medicoId, dia)
                .stream()
                .map(HorarioMedico::getTurno)
                .distinct()
                .toList();
    }

    // Obtener el rango de hora de un turno específico
    @GetMapping("/rango")
    public HorarioMedico getRangoHorario(
            @RequestParam Long medicoId,
            @RequestParam String dia,
            @RequestParam String turno
    ) {
        return horarioRepo.findByMedicoIdAndDiaSemana(medicoId, dia).stream()
                .filter(h -> h.getTurno().equalsIgnoreCase(turno))
                .findFirst()
                .orElse(null);
    }

    @GetMapping("/disponibles")
    public List<LocalTime> obtenerHorariosDisponibles(
            @RequestParam Long medicoId,
            @RequestParam String dia,
            @RequestParam String turno,
            @RequestParam String fecha
    ) {
        return horarioService.obtenerHorariosDisponibles(
                medicoId, dia, turno, LocalDate.parse(fecha)
        );
    }

    // Agrega esto en HorarioMedicoController
    @GetMapping
    public List<HorarioMedico> getAllHorarios() {
        return horarioRepo.findAll();
    }

    @PostMapping("/configurar/{medicoId}")
    public String configurarHorarios(@PathVariable Long medicoId, @RequestBody List<HorarioMedico> nuevosHorarios) {
        // 1. Eliminar los horarios existentes del médico
        horarioRepo.deleteByMedicoId(medicoId);

        // 2. Agregar los nuevos horarios
        for (HorarioMedico horario : nuevosHorarios) {
            horario.setMedicoId(medicoId);  // Asignar el médico al horario
            horarioRepo.save(horario); // Guardar cada horario
        }

        return "Horarios configurados correctamente";
    }



    @GetMapping("/doctor-view")
    public List<Map<String, Object>> getVistaSemanalDoctores() {
        // 1. Todos los médicos
        List<Medico> medicos = medicoRepo.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Medico m : medicos) {
            // 2. Todos los horarios de este médico
            List<HorarioMedico> horarios = horarioRepo.findByMedicoId(m.getId());

            // 3. Mapear a {Lunes: [mañana, tarde], ...}
            Map<String, List<String>> horariosSemana = new LinkedHashMap<>();
            for (HorarioMedico h : horarios) {
                horariosSemana.computeIfAbsent(h.getDiaSemana(), k -> new ArrayList<>())
                        .add(h.getTurno());
            }

            // 4. Agregar objeto resultante
            Map<String, Object> obj = new LinkedHashMap<>();
            obj.put("id", m.getId());
            obj.put("nombre", (m.getNombres() != null ? m.getNombres() : "") + " " + (m.getApellidos() != null ? m.getApellidos() : ""));
            obj.put("especialidad", m.getEspecialidad() != null ? m.getEspecialidad() : "");
            obj.put("sede", (m.getSede() != null && m.getSede().getNombre() != null) ? m.getSede().getNombre() : "");
            obj.put("horario", horariosSemana);

            result.add(obj);
        }

        return result;
    }

    // Endpoint para obtener todos los horarios de un médico por su id
    @GetMapping("/horarios/{medicoId}")
    public List<HorarioMedico> getHorariosPorMedico(@PathVariable Long medicoId) {
        // Devolver todos los horarios de un médico específico
        return horarioRepo.findByMedicoId(medicoId);
    }

}


