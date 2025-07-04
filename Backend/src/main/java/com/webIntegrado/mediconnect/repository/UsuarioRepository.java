package com.webIntegrado.mediconnect.repository;

import com.webIntegrado.mediconnect.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByEmailOrUsername(String email, String username);
    boolean existsByEmail(String email);
}
