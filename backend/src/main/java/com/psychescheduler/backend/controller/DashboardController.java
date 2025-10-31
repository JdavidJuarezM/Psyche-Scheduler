package com.psychescheduler.backend.controller;

import com.psychescheduler.backend.dto.dashboard.DashboardResponse;
import com.psychescheduler.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;


    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard() {

        DashboardResponse response = dashboardService.getDashboard();


        return ResponseEntity.ok(response);
    }
}