package com.webIntegrado.mediconnect.config;

import com.webIntegrado.mediconnect.model.Paciente;
import com.webIntegrado.mediconnect.model.Usuario;
import com.webIntegrado.mediconnect.repository.PacienteRepository;
import com.webIntegrado.mediconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalControllerAdvice {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @ModelAttribute
    public void agregarNombreUsuario(Model model, Authentication authentication) {
        if (authentication != null && !authentication.getName().equals("anonymousUser")) {
            Usuario usuario = usuarioRepository.findByEmailOrUsername(authentication.getName(), authentication.getName())
                    .orElse(null);

            if (usuario != null) {
                // Buscamos al paciente vinculado al usuario
                Paciente paciente = pacienteRepository.findByUsuarioId(usuario.getId_usuario()).orElse(null);
                if (paciente != null && paciente.getNombres() != null) {
                    String primerNombre = paciente.getNombres().split(" ")[0];
                    model.addAttribute("nombreUsuario", primerNombre);
                } else {
                    model.addAttribute("nombreUsuario", usuario.getUsername()); // fallback
                }
            }
        }
    }
}
