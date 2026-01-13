package com.ly.day_one_challenge.model;

import jakarta.persistence.*;
import org.springframework.context.annotation.Profile;

@Entity
@Table(name = "nana")
@lombok.Data
public class Nana {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String gender;
}
