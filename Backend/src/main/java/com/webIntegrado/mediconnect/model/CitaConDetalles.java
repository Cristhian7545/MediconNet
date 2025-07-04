package com.webIntegrado.mediconnect.model;

public class CitaConDetalles {

    private Cita cita;
    private Paciente paciente;
    private Medico medico;

    public CitaConDetalles(Cita cita, Paciente paciente, Medico medico) {
        this.cita = cita;
        this.paciente = paciente;
        this.medico = medico;
    }

    public Cita getCita() {
        return cita;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Medico getMedico() {
        return medico;
    }
}