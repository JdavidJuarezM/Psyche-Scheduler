package com.psychescheduler.backend.repository;


import com.psychescheduler.backend.domain.PatientProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PatientProfileRepository extends JpaRepository<PatientProfile, UUID> {


    Optional<PatientProfile> findByUserId(UUID userId);


}
