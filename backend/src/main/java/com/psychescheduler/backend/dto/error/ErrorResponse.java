package com.psychescheduler.backend.dto.error;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private int statusCode;
    private LocalDateTime timestamp;
    private String message;
    private String path;
}