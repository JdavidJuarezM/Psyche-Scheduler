package com.psychescheduler.backend.controller;


import com.psychescheduler.backend.dto.service.CreateServiceRequest;
import com.psychescheduler.backend.dto.service.ServiceResponse;
import com.psychescheduler.backend.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceService serviceService;


    @GetMapping
    public ResponseEntity<List<ServiceResponse>> getServices(
            @RequestParam(required = false) UUID professionalId
    ) {

        List<ServiceResponse> services = serviceService.getServices(professionalId);
        return ResponseEntity.ok(services);
    }

    @PostMapping
    public ResponseEntity<Void> createService(
            @RequestBody CreateServiceRequest request
    ) {
        serviceService.createService(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
