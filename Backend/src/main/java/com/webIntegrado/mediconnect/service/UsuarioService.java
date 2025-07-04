package com.webIntegrado.mediconnect.service;
import com.webIntegrado.mediconnect.config.JwtService;
import com.webIntegrado.mediconnect.model.Paciente;
import com.webIntegrado.mediconnect.model.RegistroForm;
import com.webIntegrado.mediconnect.model.Usuario;
import com.webIntegrado.mediconnect.repository.PacienteRepository;
import com.webIntegrado.mediconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private PacienteRepository pacienteRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    public Usuario register(RegistroForm form) {
        // Verificar email existente
        if (usuarioRepo.existsByEmail(form.getEmail())) {
            throw new RuntimeException("El email ya está en uso");
        }

        // Crear nuevo Usuario
        Usuario usuario = new Usuario();
        usuario.setEmail(form.getEmail());
        usuario.setUsername(form.getUsername());
        usuario.setPasswordHash(passwordEncoder.encode(form.getPassword()));

        // Asignar rol fijo (Paciente = 3)
        usuario.setRolId(3);

        Usuario usuarioGuardado = usuarioRepo.save(usuario);

        // Crear entidad Paciente asociada al usuario
        // Crear entidad Paciente asociada al usuario
        Paciente paciente = new Paciente();
        paciente.setUsuarioId(usuarioGuardado.getId_usuario()); // Aquí el fix
        paciente.setNombres(form.getNombres());
        paciente.setApellidos(form.getApellidos());
        paciente.setTelefono(form.getTelefono());
        paciente.setDireccion(form.getDireccion());

        pacienteRepo.save(paciente);


        return usuarioGuardado;
    }

    public String authenticate(String usernameOrEmail, String password) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(usernameOrEmail);

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Contraseña incorrecta");
        }

        return jwtService.generateToken(userDetails);
    }

    public Usuario findByUsernameOrEmail(String username, String email) {
        return usuarioRepo.findByEmailOrUsername(email, username).orElse(null);
    }
}
