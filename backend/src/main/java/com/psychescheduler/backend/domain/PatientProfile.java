// java
package com.psychescheduler.backend.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Builder
@Table(name = "patient_profiles")
public class PatientProfile {

    @Id
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    @Column(name = "main_medical_condition")
    private String mainMedicalCondition;

    @Column(name = "emergency_contact_name")
    private String emergencyContactName;

    @Column(name = "emergency_contact_phone")
    private String emergencyContactPhone;

    @Column(name = "emergency_contact_relationship")
    private String emergencyContactRelationship;
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    private String gender;
    @Builder
    public PatientProfile(
            UUID id,
            User user,
            String profilePictureUrl,
            String mainMedicalCondition,
            String emergencyContactName,
            String emergencyContactPhone,
            String emergencyContactRelationship,
            String phoneNumber,
            LocalDate dateOfBirth,
            String gender
    ) {
        this.id = id;
        this.user = user;
        this.profilePictureUrl = profilePictureUrl;
        this.mainMedicalCondition = mainMedicalCondition;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhone = emergencyContactPhone;
        this.emergencyContactRelationship = emergencyContactRelationship;
        // --- AÑADIR ASIGNACIONES ---
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
    }


    public PatientProfile(UUID id, User user) {
        this.id = id;
        this.user = user;
    }
}
