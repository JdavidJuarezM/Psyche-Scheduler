package com.psychescheduler.backend.service;

import com.psychescheduler.backend.domain.PatientProfile; // <-- Importante
import com.psychescheduler.backend.domain.Professional; // <-- Importante
import com.psychescheduler.backend.domain.User;
import com.psychescheduler.backend.domain.enums.Role;
import com.psychescheduler.backend.dto.auth.AuthResponse;
import com.psychescheduler.backend.dto.auth.LoginRequest;
import com.psychescheduler.backend.dto.auth.RegisterRequest;
import com.psychescheduler.backend.repository.PatientProfileRepository; // <-- Importante
import com.psychescheduler.backend.repository.ProfessionalRepository; // <-- Importante
import com.psychescheduler.backend.repository.UserRepository;
import com.psychescheduler.backend.security.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // --- ¡NUEVAS INYECCIONES PARA CREAR PERFILES! ---
    private final PatientProfileRepository patientProfileRepository;
    private final ProfessionalRepository professionalRepository;


    /**
     * Lógica para registrar un nuevo usuario (ACTUALIZADA)
     */
    @Transactional
    public void register(RegisterRequest request) {

        userRepository.findByEmail(request.getEmail())
            .ifPresent(user -> {
                throw new IllegalStateException("El email ya está registrado");
            });

        // 1. Crear el usuario (Asumimos PATIENT por ahora)
        Role userRole = (request.getRole() != null) ? request.getRole() : Role.PATIENT;

        User newUser = User.builder()
                .id(UUID.randomUUID())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .build();

        // 2. Guardar el usuario
        userRepository.save(newUser);

        // 3. --- ¡PASO CRÍTICO FALTANTE! ---
        //    Crear el perfil asociado a ese usuario.
        if (userRole == Role.PATIENT) {
            PatientProfile newProfile = PatientProfile.builder()
                    .id(UUID.randomUUID())
                    .user(newUser) // ¡Enlazamos el usuario!
                    .build();
            patientProfileRepository.save(newProfile);

        } else if (userRole == Role.PROFESSIONAL) {
            Professional newProfile = Professional.builder()
                    .id(UUID.randomUUID())
                    .user(newUser) // ¡Enlazamos el usuario!
                    .name(newUser.getFirstName() + " " + newUser.getLastName())
                    .specialty("Especialidad pendiente")
                    .build();
            professionalRepository.save(newProfile);
        }
    }

    /**
     * Lógica de Login (Sin cambios, pero ahora funcionará)
     */
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("Usuario no encontrado después de autenticación"));

        String jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }
}
