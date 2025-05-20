package com.vit.marksheet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vit.marksheet.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNumber(String rollNumber);
}