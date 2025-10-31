package com.psychescheduler.backend.dto.dashboard;

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
public class SimpleBookingResponse {
    private UUID bookingId;
    private LocalDateTime startTime;
    private String participantName;
}