package com.psychescheduler.backend.dto.service;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResponse {

    private UUID id;
    private UUID professionalId;
    private String name;
    private String description;
    private String price;
    private int durationInMinutes;
}
