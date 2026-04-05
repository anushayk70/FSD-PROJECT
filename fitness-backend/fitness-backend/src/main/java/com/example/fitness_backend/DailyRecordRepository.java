package com.example.fitness_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DailyRecordRepository extends JpaRepository<DailyRecord, Long> {
    List<DailyRecord> findByStudentId(String studentId);
}
