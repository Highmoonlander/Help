package com.vit.marksheet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vit.marksheet.dto.StudentDTO;
import com.vit.marksheet.model.Student;
import com.vit.marksheet.service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/result")
    public ResponseEntity<Student> saveStudentResult(@RequestBody StudentDTO studentDTO) {
        Student savedStudent = studentService.saveStudentResult(studentDTO);
        return ResponseEntity.ok(savedStudent);
    }

    @GetMapping("/result/{rollNumber}")
    public ResponseEntity<Student> getStudentResult(@PathVariable String rollNumber) {
        Student student = studentService.getStudentByRollNumber(rollNumber);
        return ResponseEntity.ok(student);
    }
}