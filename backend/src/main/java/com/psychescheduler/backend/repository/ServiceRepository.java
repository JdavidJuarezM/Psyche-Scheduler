package com.psychescheduler.backend.repository;

import com.psychescheduler.backend.domain.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ServiceRepository extends JpaRepository<Service, UUID> {

    List<Service> findAllByProfessionalId(UUID professionalId);
}
