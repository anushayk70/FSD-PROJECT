package com.example.fitness_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/* * This Interface is like a "Magic Remote" for your MySQL database.
 * It lets you Save, Find, and Delete users without writing long SQL queries.
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // We use "String" here because your Student ID (a String) is the Primary Key
}