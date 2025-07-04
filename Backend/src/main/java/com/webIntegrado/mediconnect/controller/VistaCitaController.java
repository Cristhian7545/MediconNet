package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.CitaConDetalles;
import com.webIntegrado.mediconnect.model.Usuario;
import com.webIntegrado.mediconnect.service.AuthUtils;
import com.webIntegrado.mediconnect.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class VistaCitaController {

    @Autowired
    private CitaService citaService;

    @Autowired
    private AuthUtils authUtils;

    @GetMapping("/citas")
    public String verCitas(Model model) {
        Usuario usuario = authUtils.getUsuarioAutenticado();
        if (usuario == null) {
            return "redirect:/login";
        }

        List<CitaConDetalles> citas = citaService.obtenerCitasPorUsuarioId(usuario.getId_usuario());
        model.addAttribute("citas", citas);
        return "citas";
    }
}

