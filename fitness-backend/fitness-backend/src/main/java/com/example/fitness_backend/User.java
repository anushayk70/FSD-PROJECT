package com.example.fitness_backend;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    private String studentId;
    private String fullName;
    private Double weight;
    private Double height;
    private String goal;
}
