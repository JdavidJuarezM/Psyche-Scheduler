package com.psychescheduler.backend.controller;


import com.psychescheduler.backend.domain.Booking;
import com.psychescheduler.backend.dto.booking.BookingResponse;
import com.psychescheduler.backend.dto.booking.CreateBookingRequest;
import com.psychescheduler.backend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody CreateBookingRequest request
    ) {
        bookingService.createBooking(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponse>> getMyBookings(){
        List<BookingResponse> bookings = bookingService.getMyBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/professional-schedule")
    public ResponseEntity<List<BookingResponse>> getProfessionalSchedule() {
        List<BookingResponse> bookings = bookingService.getProfessionalSchedule();
        return ResponseEntity.ok(bookings);
    }


    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void>  cancelBooking(
            @PathVariable("id") UUID bookingId
    ){
        bookingService.cancelBooking(bookingId);

        return  ResponseEntity.ok().build();
    }

}
