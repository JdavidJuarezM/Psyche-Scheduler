package com.psychescheduler.backend.dto.patient;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePatientProfileRequest {

    private String profilePictureUrl;
    private String mainMedicalCondition;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String emergencyContactRelationship;


    private String firstName;
    private String lastName;
    private String phoneNumber;
    private java.time.LocalDate dateOfBirth;
    private String gender;

}
