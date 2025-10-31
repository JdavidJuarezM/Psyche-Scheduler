package com.psychescheduler.backend.dto.patient;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PatientProfileResponse {


    private String firstName;
    private String lastName;
    private String email;


    private String profilePictureUrl;
    private String mainMedicalCondition;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String emergencyContactRelationship;


    private String phoneNumber;
    private java.time.LocalDate dateOfBirth;
    private String gender;

    private String role;

}
