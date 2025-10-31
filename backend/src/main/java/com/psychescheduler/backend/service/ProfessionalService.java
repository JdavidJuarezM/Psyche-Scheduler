package com.psychescheduler.backend.service;


import com.psychescheduler.backend.domain.Professional;
import com.psychescheduler.backend.dto.professional.ProfessionalResponse;
import com.psychescheduler.backend.repository.ProfessionalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfessionalService {

    private final ProfessionalRepository professionalRepository;

    public List<ProfessionalResponse> getAllProfessionals() {
        List<Professional> professionals = professionalRepository.findAll();

        return professionals.stream()
                .map(this::mapToProfessionalResponse)
                .collect(Collectors.toList());
    }


    private ProfessionalResponse mapToProfessionalResponse(Professional professional) {

        return ProfessionalResponse.builder()
                .id(professional.getId())
                .name(professional.getName())
                .specialty(professional.getSpecialty())
                .bio(professional.getBio())
                .avatarUrl(professional.getAvatarUrl())
                .build();
    }


}
