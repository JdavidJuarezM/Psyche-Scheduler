package com.psychescheduler.backend.repository;


import com.psychescheduler.backend.domain.Professional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProfessionalRepository extends JpaRepository<Professional, UUID> {
    Optional<Professional> findByUserId(UUID userId);
    List<Professional> findAllBySpecialty(String specialty);
}
