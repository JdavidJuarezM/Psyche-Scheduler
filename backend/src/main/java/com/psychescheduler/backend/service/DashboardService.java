package com.psychescheduler.backend.service;

import com.psychescheduler.backend.domain.Booking;
import com.psychescheduler.backend.domain.Professional;
import com.psychescheduler.backend.domain.User;
import com.psychescheduler.backend.domain.enums.BookingStatus;
import com.psychescheduler.backend.domain.enums.Role;
import com.psychescheduler.backend.dto.dashboard.DashboardResponse;
import com.psychescheduler.backend.dto.dashboard.SimpleBookingResponse;
import com.psychescheduler.backend.exception.ResourceNotFoundException;
import com.psychescheduler.backend.repository.BookingRepository;
import com.psychescheduler.backend.repository.ProfessionalRepository;
import com.psychescheduler.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final ProfessionalRepository professionalRepository;
    private final BookingRepository bookingRepository;


    public DashboardResponse getDashboard() {


        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));


        if (user.getRole() == Role.PATIENT) {
            return buildPatientDashboard(user);
        } else if (user.getRole() == Role.PROFESSIONAL) {
            return buildProfessionalDashboard(user);
        } else {

            throw new IllegalStateException("Rol de usuario no soportado para dashboard.");
        }
    }


    private DashboardResponse buildPatientDashboard(User patient) {
        LocalDateTime now = LocalDateTime.now();


        long totalUpcoming = bookingRepository.countByUserIdAndStatus(
                patient.getId(), BookingStatus.SCHEDULED);


        Optional<Booking> nextBooking = bookingRepository
                .findFirstByUserIdAndStatusAndStartTimeAfterOrderByStartTimeAsc(
                        patient.getId(), BookingStatus.SCHEDULED, now);


        SimpleBookingResponse upcomingDto = nextBooking
                .map(this::mapToSimpleResponseForPatient)
                .orElse(null);

        return DashboardResponse.builder()
                .userRole(Role.PATIENT)
                .totalUpcomingBookings(totalUpcoming)
                .upcomingBooking(upcomingDto)
                .totalClientsToday(0)
                .build();
    }


    private DashboardResponse buildProfessionalDashboard(User professionalUser) {

        Professional professional = professionalRepository.findByUserId(professionalUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Perfil de profesional no encontrado"));

        LocalDateTime now = LocalDateTime.now();


        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime todayEnd = LocalDate.now().atTime(LocalTime.MAX);


        long totalUpcoming = bookingRepository.countByProfessionalIdAndStatus(
                professional.getId(), BookingStatus.SCHEDULED);


        long totalToday = bookingRepository.countByProfessionalIdAndStatusAndStartTimeBetween(
                professional.getId(), BookingStatus.SCHEDULED, todayStart, todayEnd);


        Optional<Booking> nextBooking = bookingRepository
                .findFirstByProfessionalIdAndStatusAndStartTimeAfterOrderByStartTimeAsc(
                        professional.getId(), BookingStatus.SCHEDULED, now);


        SimpleBookingResponse upcomingDto = nextBooking
                .map(this::mapToSimpleResponseForProfessional)
                .orElse(null);

        return DashboardResponse.builder()
                .userRole(Role.PROFESSIONAL)
                .totalUpcomingBookings(totalUpcoming)
                .upcomingBooking(upcomingDto)
                .totalClientsToday(totalToday)
                .build();
    }



    private SimpleBookingResponse mapToSimpleResponseForPatient(Booking booking) {
        return SimpleBookingResponse.builder()
                .bookingId(booking.getId())
                .startTime(booking.getStartTime())
                .participantName(booking.getProfessional().getName())
                .build();
    }


    private SimpleBookingResponse mapToSimpleResponseForProfessional(Booking booking) {
        String patientName = booking.getUser().getFirstName() + " " + booking.getUser().getLastName();
        return SimpleBookingResponse.builder()
                .bookingId(booking.getId())
                .startTime(booking.getStartTime())
                .participantName(patientName)
                .build();
    }
}