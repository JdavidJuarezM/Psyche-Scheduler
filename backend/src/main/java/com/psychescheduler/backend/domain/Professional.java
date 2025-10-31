package com.psychescheduler.backend.domain;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity




@Table(name = "professionals")
public class Professional {

    @Id
    private UUID id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 200)
    private String specialty;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @OneToOne
    @JoinColumn(name= "user_id", referencedColumnName = "id")
    private User user;
}
