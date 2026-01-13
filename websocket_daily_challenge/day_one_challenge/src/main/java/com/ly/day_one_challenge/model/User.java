package com.ly.day_one_challenge.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.context.annotation.Profile;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String gender;
}
