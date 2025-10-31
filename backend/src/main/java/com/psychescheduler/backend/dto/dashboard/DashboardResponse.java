package com.psychescheduler.backend.dto.dashboard;

import com.psychescheduler.backend.domain.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private Role userRole;
    private SimpleBookingResponse upcomingBooking;
    private long totalUpcomingBookings;
    private long totalClientsToday;
}