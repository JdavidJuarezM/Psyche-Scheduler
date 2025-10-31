package com.psychescheduler.backend.controller;


import com.psychescheduler.backend.dto.professional.ProfessionalResponse;
import com.psychescheduler.backend.service.ProfessionalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/professionals")
@RequiredArgsConstructor
public class ProfessionalController {

    private final ProfessionalService professionalService;

    @GetMapping
    public ResponseEntity<List<ProfessionalResponse>> getAllProfessionals(){

        List<ProfessionalResponse> professionals = professionalService.getAllProfessionals();

        return ResponseEntity.ok(professionals);

    }

}
