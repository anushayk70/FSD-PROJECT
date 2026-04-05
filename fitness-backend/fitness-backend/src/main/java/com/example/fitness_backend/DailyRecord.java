package com.example.fitness_backend;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "daily_records")
@Data
public class DailyRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId; // Link this to your User
    private LocalDate date = LocalDate.now();
    private Integer steps;
    private Double waterLitres;
    private Boolean ateJunk;
    private Boolean sleptWell;
}