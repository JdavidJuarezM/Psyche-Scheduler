package com.psychescheduler.backend.repository;


import com.psychescheduler.backend.domain.Booking;
import com.psychescheduler.backend.domain.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findAllByUserId(UUID userId);

    List<Booking> findAllByProfessionalId(UUID professionalId);

    List<Booking> findAllByProfessionalIdAndStartTimeBetween(
            UUID professionalId,
            LocalDateTime startTime,
            LocalDateTime endTime
    );

    long countByUserIdAndStatus(UUID userId, BookingStatus status);
    Optional<Booking> findFirstByUserIdAndStatusAndStartTimeAfterOrderByStartTimeAsc(
            UUID userId,
            BookingStatus status,
            LocalDateTime now
    );


    long countByProfessionalIdAndStatus(UUID professionalId, BookingStatus status);


    Optional<Booking> findFirstByProfessionalIdAndStatusAndStartTimeAfterOrderByStartTimeAsc(
            UUID professionalId,
            BookingStatus status,
            LocalDateTime now
    );


    long countByProfessionalIdAndStatusAndStartTimeBetween(
            UUID professionalId,
            BookingStatus status,
            LocalDateTime start,
            LocalDateTime end
    );

}
