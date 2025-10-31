package com.psychescheduler.backend.service;

import com.psychescheduler.backend.domain.Booking;
// Corregido: Se eliminó el import conflictivo de la entidad Service
import com.psychescheduler.backend.dto.availability.AvailabilitySlot;
import com.psychescheduler.backend.exception.ResourceNotFoundException;
import com.psychescheduler.backend.repository.BookingRepository;
import com.psychescheduler.backend.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service; // Corregido: Se importó la anotación Service correcta

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final BookingRepository bookingRepository;
    private final ServiceRepository serviceRepository;


    private static final LocalTime WORK_START_TIME = LocalTime.of(9, 0); // 9:00 AM
    private static final LocalTime WORK_END_TIME = LocalTime.of(17, 0); // 5:00 PM
    private static final int SLOT_INCREMENT_MINUTES = 30; // Revisaremos cada 30 min


    public List<AvailabilitySlot> getAvailability(UUID professionalId, UUID serviceId, LocalDate date) {


        com.psychescheduler.backend.domain.Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado"));
        int durationInMinutes = service.getDurationInMinutes();


        LocalDateTime dayStart = date.atStartOfDay();
        LocalDateTime dayEnd = date.atTime(LocalTime.MAX);



        List<Booking> existingBookings = bookingRepository
                .findAllByProfessionalIdAndStartTimeBetween(professionalId, dayStart, dayEnd);


        List<AvailabilitySlot> availableSlots = new ArrayList<>();


        LocalDateTime slotStartTime = date.atTime(WORK_START_TIME);

        while (slotStartTime.isBefore(date.atTime(WORK_END_TIME))) {

            LocalDateTime slotEndTime = slotStartTime.plusMinutes(durationInMinutes);


            if (slotEndTime.isAfter(date.atTime(WORK_END_TIME))) {
                break;
            }


            boolean isOverlap = checkOverlap(slotStartTime, slotEndTime, existingBookings);

            if (!isOverlap) {

                availableSlots.add(new AvailabilitySlot(slotStartTime, slotEndTime));
            }


            slotStartTime = slotStartTime.plusMinutes(SLOT_INCREMENT_MINUTES);
        }

        return availableSlots;
    }


    private boolean checkOverlap(LocalDateTime slotStart, LocalDateTime slotEnd, List<Booking> bookings) {
        for (Booking booking : bookings) {
            LocalDateTime bookingStart = booking.getStartTime();
            LocalDateTime bookingEnd = booking.getEndTime();


            if (slotStart.isBefore(bookingEnd) && slotEnd.isAfter(bookingStart)) {
                return true;
            }
        }

        return false;
    }
}
