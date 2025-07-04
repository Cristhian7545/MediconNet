package com.webIntegrado.mediconnect.controller;

import com.webIntegrado.mediconnect.model.Contacto;
import com.webIntegrado.mediconnect.model.ContactoRequest;
import com.webIntegrado.mediconnect.model.Paciente;
import com.webIntegrado.mediconnect.model.Usuario;
import com.webIntegrado.mediconnect.repository.ContactoRepository;
import com.webIntegrado.mediconnect.repository.PacienteRepository;
import com.webIntegrado.mediconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contactos")
public class ContactoController {

    @Autowired
    private ContactoRepository contactoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PacienteRepository pacienteRepository;

    @PostMapping
    public String registrarContacto(@RequestBody ContactoRequest request, Authentication auth) {
        Contacto contacto = new Contacto();

        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            Usuario usuario = usuarioRepository.findByEmailOrUsername(auth.getName(), auth.getName()).orElse(null);
            if (usuario != null && usuario.getRolId() == 3) {
                Paciente paciente = pacienteRepository.findByUsuarioId(usuario.getId_usuario()).orElse(null);
                contacto.setPaciente(paciente); // Asocia el paciente, pero los datos son los del form
            }
        }
        // SIEMPRE usa los datos del formulario:
        contacto.setNombre(request.getNombre());
        contacto.setApellido(request.getApellido());
        contacto.setEmail(request.getEmail());
        contacto.setTelefono(request.getTelefono());
        contacto.setMensaje(request.getMensaje());

        contactoRepository.save(contacto);
        return "¡Mensaje recibido!";
    }


}
