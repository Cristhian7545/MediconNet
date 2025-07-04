package com.webIntegrado.mediconnect.model;

import java.time.LocalDateTime;

public class CitaRequest {
    private Long pacienteId;
    private Long medicoId;
    private Long sedeId;
    private LocalDateTime fechaHora;
    private String motivo;


// getter y setter


    public Long getPacienteId() {return pacienteId;}
    public void setPacienteId(Long pacienteId) {this.pacienteId = pacienteId;}

    public Long getMedicoId() {return medicoId;}
    public void setMedicoId(Long medicoId) {this.medicoId = medicoId;}

    public LocalDateTime getFechaHora() {return fechaHora;}
    public void setFechaHora(LocalDateTime fechaHora) {this.fechaHora = fechaHora;}

    public String getMotivo() {return motivo;}
    public void setMotivo(String motivo) {this.motivo = motivo;}

    public Long getSedeId() { return sedeId; }
    public void setSedeId(Long sedeId) { this.sedeId = sedeId;}

    public static class ContactoRequest {
        private String nombre;
        private String apellido;
        private String email;
        private String telefono;
        private String mensaje;

        // Getters y setters
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }

        public String getApellido() { return apellido; }
        public void setApellido(String apellido) { this.apellido = apellido; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getTelefono() { return telefono; }
        public void setTelefono(String telefono) { this.telefono = telefono; }

        public String getMensaje() { return mensaje; }
        public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    }
}
