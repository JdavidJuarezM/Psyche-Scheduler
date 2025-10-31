package com.psychescheduler.backend.service;


import com.psychescheduler.backend.domain.Booking;
import com.psychescheduler.backend.domain.Professional;
import com.psychescheduler.backend.domain.User;
import com.psychescheduler.backend.domain.enums.BookingStatus;
import com.psychescheduler.backend.dto.booking.BookingResponse;
import com.psychescheduler.backend.dto.booking.CreateBookingRequest;
import com.psychescheduler.backend.exception.ResourceNotFoundException;
import com.psychescheduler.backend.repository.BookingRepository;
import com.psychescheduler.backend.repository.ProfessionalRepository;
import com.psychescheduler.backend.repository.ServiceRepository;
import com.psychescheduler.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.psychescheduler.backend.dto.booking.BookingResponse;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ProfessionalRepository professionalRepository;
    private final ServiceRepository serviceRepository;


    public void createBooking(CreateBookingRequest request){
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User patient = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("paciente no encontrado"));


        Professional professional = professionalRepository.findById(request.getProfessionalId())
                .orElseThrow(() -> new ResourceNotFoundException("professional no encontrado"));


        com.psychescheduler.backend.domain.Service service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado"));

        LocalDateTime endTime = request.getStartTime().plusMinutes(service.getDurationInMinutes());


        Booking newBooking = Booking.builder()
                .id(UUID.randomUUID())
                .user(patient)
                .professional(professional)
                .service(service)
                .startTime(request.getStartTime())
                .endTime(endTime)
                .status(BookingStatus.SCHEDULED)
                .createdAt(LocalDateTime.now())
                .build();

        bookingRepository.save(newBooking);

    }

    public List<BookingResponse> getMyBookings() {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User patient = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("paciente no encontrado"));

        List<Booking> bookings = bookingRepository.findAllByUserId(patient.getId());

        return bookings.stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
    }

    public List<BookingResponse> getProfessionalSchedule(){

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));


        Professional professional = professionalRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Perfil de profesional no encontrado"));


        List<Booking> bookings = bookingRepository.findAllByProfessionalId(professional.getId());


        return bookings.stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
    }

    public void cancelBooking(UUID bookingId){
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));


        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(()-> new ResourceNotFoundException("Cita no encontrada"));

        boolean isPatientOwner = booking.getUser().getId().equals(currentUser.getId());


        UUID professionalUserId = booking.getProfessional().getUser().getId();
       boolean isProfessionalOwner = professionalUserId.equals(currentUser.getId());

        if (!isPatientOwner && !isProfessionalOwner) {

            throw new AccessDeniedException("No tiene permiso para cancelar esta cita");
        }

        if(booking.getStatus()== BookingStatus.COMPLETED || booking.getStatus() == BookingStatus.CANCELED){
            throw new IllegalStateException("No se puede cancelar una cita que ya está completada o cancelada.");
        }

        booking.setStatus(BookingStatus.CANCELED);
        bookingRepository.save(booking);

    }



    private BookingResponse mapToBookingResponse(Booking booking) {
        return BookingResponse.builder()
                .bookingId(booking.getId())
                .professionalId(booking.getProfessional().getId())
                .professionalName(booking.getProfessional().getName())
                .serviceId(booking.getService().getId())
                .serviceName(booking.getService().getName())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .status(booking.getStatus())
                .build();
    }

}
