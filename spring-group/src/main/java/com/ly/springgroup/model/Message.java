package com.ly.springgroup.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private LocalDateTime sentAt = LocalDateTime.now();

    @ManyToOne
    private User sender;

    @ManyToOne
    private ChatGroup group;
}
