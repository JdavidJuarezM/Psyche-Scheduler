package com.psychescheduler.backend.controller;

import com.psychescheduler.backend.dto.availability.AvailabilitySlot;
import com.psychescheduler.backend.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/availability")
@RequiredArgsConstructor
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @GetMapping("/professional/{professionalId}")
    public ResponseEntity<List<AvailabilitySlot>> getAvailability(


            @PathVariable UUID professionalId,


            @RequestParam UUID serviceId,


            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<AvailabilitySlot> slots = availabilityService.getAvailability(
                professionalId,
                serviceId,
                date
        );

        return ResponseEntity.ok(slots);
    }
}