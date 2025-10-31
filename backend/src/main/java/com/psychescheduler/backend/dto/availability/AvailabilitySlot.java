package com.psychescheduler.backend.dto.availability;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvailabilitySlot {

    private LocalDateTime startTime;
    private LocalDateTime endTime;

}
