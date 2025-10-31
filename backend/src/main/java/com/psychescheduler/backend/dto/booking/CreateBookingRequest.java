package com.psychescheduler.backend.dto.booking;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateBookingRequest {

    private UUID professionalId;
    private UUID serviceId;
    private LocalDateTime startTime;

}
