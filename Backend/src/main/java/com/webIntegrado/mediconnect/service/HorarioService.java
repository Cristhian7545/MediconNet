package com.webIntegrado.mediconnect.service;

import com.webIntegrado.mediconnect.model.Cita;
import com.webIntegrado.mediconnect.model.HorarioMedico;
import com.webIntegrado.mediconnect.repository.CitaRepository;
import com.webIntegrado.mediconnect.repository.HorarioMedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class HorarioService {

    @Autowired
    private HorarioMedicoRepository horarioRepo;

    @Autowired
    private CitaRepository citaRepo;

    public List<LocalTime> obtenerHorariosDisponibles(Long medicoId, String dia, String turno, LocalDate fecha) {
        System.out.println("→ buscando horarios para médico " + medicoId + " - " + dia + " - " + turno + " - " + fecha);

        HorarioMedico horario = horarioRepo.findByMedicoIdAndDiaSemana(medicoId, dia).stream()
                .filter(h -> h.getTurno().equalsIgnoreCase(turno))
                .findFirst()
                .orElse(null);

        if (horario == null) {
            System.out.println("⚠️ No se encontró horario");
            return new ArrayList<>();
        }

        List<LocalTime> intervalos = generarIntervalos(horario.getHoraInicio(), horario.getHoraFin(), 30);

        LocalDateTime desde = LocalDateTime.of(fecha, horario.getHoraInicio());
        LocalDateTime hasta = LocalDateTime.of(fecha, horario.getHoraFin());

        List<Cita> ocupadas = citaRepo.findByMedicoIdAndFechaHoraBetween(medicoId, desde, hasta);

        List<LocalTime> disponibles = new ArrayList<>(intervalos);
        for (Cita cita : ocupadas) {
            disponibles.removeIf(hora -> hora.equals(cita.getFechaHora().toLocalTime()));
        }

        return disponibles;
    }

    private List<LocalTime> generarIntervalos(LocalTime inicio, LocalTime fin, int minutos) {
        List<LocalTime> bloques = new ArrayList<>();
        LocalTime actual = inicio;
        while (!actual.isAfter(fin.minusMinutes(minutos))) {
            bloques.add(actual);
            actual = actual.plusMinutes(minutos);
        }
        return bloques;
    }
}
