package com.webIntegrado.mediconnect.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sede")
public class Sede {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_sede;

    private String nombre;
    private String descripcion;
    private String region;
    private String direccion;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "mapa_url", columnDefinition = "TEXT")
    private String mapaUrl;

    // Getters y Setters

    public Long getId_sede() {
        return id_sede;
    }

    public void setId_sede(Long id_sede) {
        this.id_sede = id_sede;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public String getMapaUrl() {
        return mapaUrl;
    }

    public void setMapaUrl(String mapaUrl) {
        this.mapaUrl = mapaUrl;
    }
}
