package com.psychescheduler.backend.service;

import com.psychescheduler.backend.domain.PatientProfile;
import com.psychescheduler.backend.domain.User;
import com.psychescheduler.backend.dto.patient.PatientProfileResponse;
import com.psychescheduler.backend.dto.patient.UpdatePatientProfileRequest;
import com.psychescheduler.backend.exception.ResourceNotFoundException;
import com.psychescheduler.backend.repository.PatientProfileRepository;
import com.psychescheduler.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final UserRepository userRepository;
    private final PatientProfileRepository patientProfileRepository;


public void updateMyProfile(UpdatePatientProfileRequest request) {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User patient = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        PatientProfile profile = patientProfileRepository.findByUserId(patient.getId())
                .orElse(new PatientProfile(UUID.randomUUID(), patient));

        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());


        profile.setProfilePictureUrl(request.getProfilePictureUrl());
        profile.setMainMedicalCondition(request.getMainMedicalCondition());
        profile.setEmergencyContactName(request.getEmergencyContactName());
        profile.setEmergencyContactPhone(request.getEmergencyContactPhone());
        profile.setEmergencyContactRelationship(request.getEmergencyContactRelationship());


        profile.setPhoneNumber(request.getPhoneNumber());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setGender(request.getGender());



        userRepository.save(patient);
        patientProfileRepository.save(profile);
    }

public PatientProfileResponse getMyProfile() {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User patientUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado"));

        PatientProfile profile = patientProfileRepository.findByUserId(patientUser.getId())
                .orElse(null);

        // Este bloque 'return' ahora compilará correctamente
        return PatientProfileResponse.builder()
                .firstName(patientUser.getFirstName())
                .lastName(patientUser.getLastName())
                .email(patientUser.getEmail())
                .profilePictureUrl(profile != null ? profile.getProfilePictureUrl() : null)
                .mainMedicalCondition(profile != null ? profile.getMainMedicalCondition() : null)
                .emergencyContactName(profile != null ? profile.getEmergencyContactName() : null)
                .emergencyContactPhone(profile != null ? profile.getEmergencyContactPhone() : null)
                .emergencyContactRelationship(profile != null ? profile.getEmergencyContactRelationship() : null)

                // Estos métodos AHORA SÍ EXISTEN en la entidad 'profile'
                .phoneNumber(profile != null ? profile.getPhoneNumber() : null)
                .dateOfBirth(profile != null ? profile.getDateOfBirth() : null)
                .gender(profile != null ? profile.getGender() : null)
                .build();
    }

}