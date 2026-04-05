package com.example.fitness_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Connects your React Neon UI
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DailyRecordRepository dailyRecordRepository;

    // --- USER PROFILE ENDPOINTS ---

    // 1. Initial Registration (Triggered by Page 0 "INITIALIZE")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if Student ID is already in MySQL
        if (userRepository.existsById(user.getStudentId())) {
            return ResponseEntity.badRequest().body("That ID is already taken, bestie! 🛑");
        }
        
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // 2. Login Check (To see if a returning user exists)
    @GetMapping("/login/{id}")
    public ResponseEntity<?> loginUser(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(404).body("User not found!");
    }

    // --- DAILY RECORD ENDPOINTS ---

    // 3. Save Daily Hustle (Triggered by Page 2 "GET MY VIBE")
    @PostMapping("/log-day")
    public ResponseEntity<?> logDailyActivity(@RequestBody DailyRecord record) {
        // We link this record to the studentId
        DailyRecord savedRecord = dailyRecordRepository.save(record);
        return ResponseEntity.ok(savedRecord);
    }

    // 4. Fetch History (To show the user's progress over time)
    @GetMapping("/history/{studentId}")
    public ResponseEntity<List<DailyRecord>> getUserHistory(@PathVariable String studentId) {
        List<DailyRecord> history = dailyRecordRepository.findByStudentId(studentId);
        return ResponseEntity.ok(history);
    }
}