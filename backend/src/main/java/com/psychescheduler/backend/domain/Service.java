package com.psychescheduler.backend.domain;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "services")
public class Service {

    @Id
    private UUID id;

    @Column(nullable = false, length = 200)
    private String name;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;


    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "duration_minutes", nullable = false)
    private int durationInMinutes;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professional_id", nullable = false)
    private Professional professional;

}
