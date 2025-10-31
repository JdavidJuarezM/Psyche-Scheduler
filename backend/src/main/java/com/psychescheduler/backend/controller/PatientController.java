package com.psychescheduler.backend.controller;


import com.psychescheduler.backend.dto.patient.PatientProfileResponse;
import com.psychescheduler.backend.dto.patient.UpdatePatientProfileRequest;
import com.psychescheduler.backend.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;

    @PutMapping("/my-profile")
    public ResponseEntity<Void> updateMyProfile(
            @RequestBody UpdatePatientProfileRequest request
    ) {
        patientService.updateMyProfile(request);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/my-profile")
    public ResponseEntity<PatientProfileResponse> getMyProfile() {
        return ResponseEntity.ok(patientService.getMyProfile());
    }


}
