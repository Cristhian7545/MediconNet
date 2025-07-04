package com.webIntegrado.mediconnect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cita")
    private Long id;
    private Long pacienteId;
    private Long medicoId;
    private LocalDateTime fechaHora;
    private String motivo;
    private String estado = "Pendiente";
    private LocalDateTime fechaSolicitud = LocalDateTime.now();
    @ManyToOne
    @JoinColumn(name = "sede_id")
    private Sede sede;

    // Getters y setters

    public Long getId() { return id;}
    public void setId(Long id) {this.id = id;}

    public Long getPacienteId() {return pacienteId;}
    public void setPacienteId(Long pacienteId) {this.pacienteId = pacienteId;}

    public Long getMedicoId() {return medicoId;}
    public void setMedicoId(Long medicoId) {this.medicoId = medicoId;}

    public LocalDateTime getFechaHora() {return fechaHora;}
    public void setFechaHora(LocalDateTime fechaHora) {this.fechaHora = fechaHora;}

    public String getMotivo() {return motivo;}
    public void setMotivo(String motivo) {this.motivo = motivo;}

    public String getEstado() {return estado;}
    public void setEstado(String estado) {this.estado = estado;}

    public LocalDateTime getFechaSolicitud() {return fechaSolicitud;}
    public void setFechaSolicitud(LocalDateTime fechaSolicitud) {this.fechaSolicitud = fechaSolicitud;}

    public Sede getSede() { return sede; }
    public void setSede(Sede sede) { this.sede = sede; }
}