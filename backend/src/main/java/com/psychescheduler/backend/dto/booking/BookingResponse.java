package com.psychescheduler.backend.dto.booking;


import com.psychescheduler.backend.domain.enums.BookingStatus;
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
public class BookingResponse {

private UUID bookingId;

private UUID professionalId;

private String professionalName;


private UUID serviceId;
private String serviceName;

private LocalDateTime startTime;
private LocalDateTime endTime;
private BookingStatus status;

}
