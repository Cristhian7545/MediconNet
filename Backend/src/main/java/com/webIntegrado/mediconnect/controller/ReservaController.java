package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.CitaRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReservaController {

    @GetMapping("/reserva")
    public String mostrarFormularioReserva(Model model) {
        model.addAttribute("citaRequest", new CitaRequest());
        return "reserva"; // Thymeleaf busca en templates/reserva.html
    }

    @GetMapping("/servicios")
    public String mostrarPaginaServicios() {
        return "servicios"; // Thymeleaf busca templates/servicios.html
    }

    @GetMapping("/red")
    public String mostrarPaginaRed() {
        return "red"; // Thymeleaf busca templates/servicios.html
    }

    @GetMapping("/nosotros")
    public String mostrarPaginaNosotros() {
        return "nosotros"; // Thymeleaf busca templates/servicios.html
    }

    @GetMapping("/contacto")
    public String mostrarPaginaContacto() {
        return "contacto"; // Thymeleaf busca templates/servicios.html
    }

    @GetMapping("/servicio-persona")
    public String mostrarPaginaServicioPersona() {
        return "servicio-persona"; // Thymeleaf busca templates/servicios.html
    }

    @GetMapping("/servicio-evento")
    public String mostrarPaginaServicioEvento() {
        return "servicio-evento"; // Thymeleaf busca templates/servicios.html
    }

    @GetMapping("/medico")
    public String mostrarPaginaMedico() {
        return "medico"; // Thymeleaf busca templates/servicios.html
    }
}

