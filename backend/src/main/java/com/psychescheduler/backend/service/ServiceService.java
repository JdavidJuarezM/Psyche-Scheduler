package com.psychescheduler.backend.service;


import com.psychescheduler.backend.domain.Professional;
import com.psychescheduler.backend.domain.User;
import com.psychescheduler.backend.dto.service.CreateServiceRequest;
import com.psychescheduler.backend.dto.service.ServiceResponse;
import com.psychescheduler.backend.repository.ProfessionalRepository;
import com.psychescheduler.backend.repository.ServiceRepository;
import com.psychescheduler.backend.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class ServiceService {


    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;
    private final ProfessionalRepository professionalRepository;

    public List<ServiceResponse> getServices(UUID professionalId) {


        List<com.psychescheduler.backend.domain.Service> services;

        if (professionalId != null) {
            services = serviceRepository.findAllByProfessionalId(professionalId);
        } else {
            services = serviceRepository.findAll();
        }

        return services.stream()
                .map(this::mapToServiceResponse)
                .collect(Collectors.toList());
    }




    public void createService(CreateServiceRequest request) {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));


        Professional professional = professionalRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profesional no encontrado"));


         com.psychescheduler.backend.domain.Service newService = com.psychescheduler.backend.domain.Service.builder()
                .id(UUID.randomUUID())
                .name(request.getName())
                .description(request.getDescription())
                .price(new BigDecimal(request.getPrice()))
                .durationInMinutes(request.getDurationInMinutes())
                .professional(professional)
                .build();
        serviceRepository.save(newService);
    }


    private ServiceResponse mapToServiceResponse(com.psychescheduler.backend.domain.Service service) {
        return ServiceResponse.builder()
                .id(service.getId())
                .name(service.getName())
                .description(service.getDescription())
                .price(service.getPrice().toString())
                .durationInMinutes(service.getDurationInMinutes())
                .professionalId(service.getProfessional().getId())
                .build();
    }

}



