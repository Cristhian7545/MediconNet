package com.webIntegrado.mediconnect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reclamo")
public class Reclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_reclamo;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "sede_id", nullable = false)
    private Sede sede;

    @Column(nullable = false, length = 15)
    private String dni;

    @Column(name = "tipo_reclamo", nullable = false, length = 30)
    private String tipoReclamo;

    @Column(nullable = false, length = 50)
    private String clasificacion;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String detalle;

    @Column(name = "fecha_reclamo")
    private LocalDateTime fechaReclamo = LocalDateTime.now();

    // Getters y setters

    public Long getId_reclamo() { return id_reclamo; }
    public void setId_reclamo(Long id) { this.id_reclamo = id; }

    public Paciente getPaciente() { return paciente; }
    public void setPaciente(Paciente paciente) { this.paciente = paciente; }

    public Sede getSede() { return sede; }
    public void setSede(Sede sede) { this.sede = sede; }

    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }

    public String getTipoReclamo() { return tipoReclamo; }
    public void setTipoReclamo(String tipoReclamo) { this.tipoReclamo = tipoReclamo; }

    public String getClasificacion() { return clasificacion; }
    public void setClasificacion(String clasificacion) { this.clasificacion = clasificacion; }

    public String getDetalle() { return detalle; }
    public void setDetalle(String detalle) { this.detalle = detalle; }

    public LocalDateTime getFechaReclamo() { return fechaReclamo; }
    public void setFechaReclamo(LocalDateTime fechaReclamo) { this.fechaReclamo = fechaReclamo; }
}
