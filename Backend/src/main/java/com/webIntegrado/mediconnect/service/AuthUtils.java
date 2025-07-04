package com.webIntegrado.mediconnect.service;

import com.webIntegrado.mediconnect.model.Usuario;
import com.webIntegrado.mediconnect.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtils {

    private final UsuarioRepository usuarioRepository;

    public AuthUtils(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario getUsuarioAutenticado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName(); // puede ser username o email

        return usuarioRepository.findByUsername(login)
                .or(() -> usuarioRepository.findByEmail(login))
                .orElse(null);
    }
}
