package com.psychescheduler.backend.dto.professional;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalResponse {

    private UUID id;
    private String name;
    private String specialty;
    private String bio;
    private String avatarUrl;


}
