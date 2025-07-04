package com.webIntegrado.mediconnect.service;

import com.webIntegrado.mediconnect.model.Cita;
import com.webIntegrado.mediconnect.model.CitaConDetalles;
import com.webIntegrado.mediconnect.model.Medico;
import com.webIntegrado.mediconnect.model.Paciente;
import com.webIntegrado.mediconnect.model.Sede;
import com.webIntegrado.mediconnect.repository.CitaRepository;
import com.webIntegrado.mediconnect.repository.MedicoRepository;
import com.webIntegrado.mediconnect.repository.PacienteRepository;
import com.webIntegrado.mediconnect.repository.SedeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private SedeRepository sedeRepository;

    public String reservarCita(Long pacienteId, Long medicoId, Long sedeId, LocalDateTime fechaHora, String motivo) {
        if (citaRepository.existsByMedicoIdAndFechaHora(medicoId, fechaHora)) {
            return "Horario no disponible";
        }

        Optional<Sede> sedeOpt = sedeRepository.findById(sedeId);
        if (sedeOpt.isEmpty()) {
            return "Sede no encontrada";
        }

        Cita cita = new Cita();
        cita.setPacienteId(pacienteId);
        cita.setMedicoId(medicoId);
        cita.setSede(sedeOpt.get());  // Asignar entidad Sede
        cita.setFechaHora(fechaHora);
        cita.setMotivo(motivo);

        citaRepository.save(cita);

        return "Cita registrada con éxito";
    }

    public List<Cita> obtenerTodasLasCitas() {
        return citaRepository.findAll();
    }

    public List<CitaConDetalles> obtenerCitasConDetalles() {
        List<Cita> citas = citaRepository.findAll();
        List<CitaConDetalles> citasConDetalles = new ArrayList<>();

        for (Cita cita : citas) {
            Optional<Paciente> paciente = pacienteRepository.findById(cita.getPacienteId());
            Optional<Medico> medico = medicoRepository.findById(cita.getMedicoId());

            if (paciente.isPresent() && medico.isPresent()) {
                citasConDetalles.add(new CitaConDetalles(cita, paciente.get(), medico.get()));
            }
        }

        return citasConDetalles;
    }

    public List<CitaConDetalles> obtenerCitasPorUsuarioId(Long usuarioId) {
        Optional<Paciente> pacienteOpt = pacienteRepository.findByUsuarioId(usuarioId);
        if (pacienteOpt.isEmpty()) {
            return new ArrayList<>();
        }

        Long pacienteId = pacienteOpt.get().getId_paciente();
        List<Cita> citas = citaRepository.findByPacienteId(pacienteId);

        List<CitaConDetalles> citasConDetalles = new ArrayList<>();
        for (Cita cita : citas) {
            Optional<Medico> medico = medicoRepository.findById(cita.getMedicoId());

            if (medico.isPresent()) {
                citasConDetalles.add(new CitaConDetalles(cita, pacienteOpt.get(), medico.get()));
            }
        }

        return citasConDetalles;
    }
    public boolean cancelarCita(Long citaId, Long usuarioId) {
        // 1. Obtener el paciente vinculado al usuario autenticado
        Optional<Paciente> pacienteOpt = pacienteRepository.findByUsuarioId(usuarioId);
        if (pacienteOpt.isEmpty()) return false;
        Long pacienteId = pacienteOpt.get().getId_paciente();

        // 2. Buscar la cita
        Optional<Cita> citaOpt = citaRepository.findById(citaId);
        if (citaOpt.isEmpty()) return false;
        Cita cita = citaOpt.get();

        // 3. Verificar que la cita le pertenece al paciente autenticado
        if (!cita.getPacienteId().equals(pacienteId)) return false;

        // 4. Eliminar la cita
        citaRepository.deleteById(citaId);
        return true;
    }

    public boolean confirmarCita(Long citaId, Long usuarioIdMedico) {
        Optional<Cita> citaOpt = citaRepository.findById(citaId);
        if (citaOpt.isPresent()) {
            Cita cita = citaOpt.get();
            // Verifica si el usuario autenticado es el médico de la cita
            Optional<Medico> medicoOpt = medicoRepository.findById(cita.getMedicoId());
            if (medicoOpt.isPresent() && medicoOpt.get().getUsuarioId().equals(usuarioIdMedico)) {
                cita.setEstado("Confirmada");
                citaRepository.save(cita);
                return true;
            }
        }
        return false;
    }

    public List<CitaConDetalles> obtenerCitasPorMedicoId(Long medicoId) {
        List<Cita> citas = citaRepository.findByMedicoId(medicoId);

        List<CitaConDetalles> citasConDetalles = new ArrayList<>();
        for (Cita cita : citas) {
            Optional<Paciente> paciente = pacienteRepository.findById(cita.getPacienteId());
            Optional<Medico> medico = medicoRepository.findById(medicoId);

            if (paciente.isPresent() && medico.isPresent()) {
                citasConDetalles.add(new CitaConDetalles(cita, paciente.get(), medico.get()));
            }
        }
        return citasConDetalles;
    }
}
